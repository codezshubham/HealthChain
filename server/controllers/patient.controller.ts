import { Request, Response } from "express";
import User from "../models/User";
import MedicalRecord from "../models/MedicalRecord";
import { config } from "../config/env";

const normalize = (value: string) => value.trim().toLowerCase();

type LlmGuidance = {
  summary: string;
  domesticRemedies: string[];
  precautions: string[];
  whenToSeekDoctor: string;
};

const extractJsonObject = (text: string) => {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  return text.slice(firstBrace, lastBrace + 1);
};

const getLlmDomesticRemedies = async ({
  disease,
  patientName,
  patientAge,
  patientGender,
  prescription,
  symptoms,
}: {
  disease: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  prescription?: string;
  symptoms?: string[];
}): Promise<LlmGuidance> => {
  const prompt = [
    "You are a careful healthcare assistant.",
    "Give supportive domestic remedies only, not diagnosis.",
    "Use simple language for Indian households.",
    "Return ONLY valid JSON matching this exact schema:",
    '{"summary":"string","domesticRemedies":["string"],"precautions":["string"],"whenToSeekDoctor":"string"}',
    `Disease: ${disease}`,
    `Patient name: ${patientName}`,
    `Patient age: ${patientAge ?? "unknown"}`,
    `Patient gender: ${patientGender ?? "unknown"}`,
    `Latest prescription from records: ${prescription || "not available"}`,
    `Recent symptoms from records: ${
      symptoms && symptoms.length ? symptoms.join(", ") : "not available"
    }`,
    "Include 4 to 6 practical home remedies and 3 to 5 precautions.",
    "If disease is serious, still provide safe supportive care and clearly state when to seek urgent care.",
    "Do not include markdown, headings, or extra keys.",
  ].join("\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${config.googleLlmModel}:generateContent?key=${config.googleApiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google LLM request failed: ${errorText}`);
  }

  const payload = await response.json();
  const modelText =
    payload?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  const candidateJson = extractJsonObject(modelText) || modelText;
  const parsed = JSON.parse(candidateJson) as LlmGuidance;

  if (
    !parsed.summary ||
    !Array.isArray(parsed.domesticRemedies) ||
    !Array.isArray(parsed.precautions) ||
    !parsed.whenToSeekDoctor
  ) {
    throw new Error("Invalid LLM response format");
  }

  return parsed;
};

// GET PATIENT PROFILE
export const getPatientProfile = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    const patient = await User.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// GET PATIENT HISTORY
export const getPatientHistory = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;

    const records = await MedicalRecord.find({ patientId }).sort({
      createdAt: -1,
    });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
};

// CHATBOT: PRESCRIPTION + DOMESTIC REMEDY FOR PATIENT
export const getPatientDiseaseGuidance = async (
  req: Request,
  res: Response
) => {
  try {
    const { patientId } = req.params;
    const { disease } = req.body as { disease?: string };

    if (!disease || !disease.trim()) {
      return res
        .status(400)
        .json({ message: "Disease name is required" });
    }

    const patient = await User.findOne({ patientId }).select(
      "name age gender patientId"
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const normalizedDisease = normalize(disease);

    const matchedRecords = await MedicalRecord.find({
      patientId,
      disease: { $regex: normalizedDisease, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const latestMatch = matchedRecords[0];
    const llmGuidance = await getLlmDomesticRemedies({
      disease: disease.trim(),
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      prescription: latestMatch?.prescription,
      symptoms: latestMatch?.symptoms,
    });

    const response = {
      disease: disease.trim(),
      prescription: latestMatch
        ? latestMatch.prescription
        : "No previous prescription found in your records for this disease. Please consult your doctor for a confirmed treatment plan.",
      llmGuidance,
      disclaimer:
        "This chatbot provides supportive guidance only and is not a substitute for medical diagnosis. Seek urgent care for severe symptoms.",
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: "Error generating chatbot guidance",
      error,
    });
  }
};