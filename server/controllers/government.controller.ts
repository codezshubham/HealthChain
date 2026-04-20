import { Request, Response } from "express";
import MedicalRecord from "../models/MedicalRecord";

// GET FILTERED DATA (ANONYMIZED)
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { disease, location, startDate, endDate, ageGroup } = req.query;
    const match: any = {};

    if (disease) match.disease = disease;

    // Date filters: support start only, end only, or both
    if (startDate || endDate) {
      match.date = {};

      if (startDate) {
        (match.date as any).$gte = new Date(startDate as string);
      }

      if (endDate) {
        (match.date as any).$lte = new Date(endDate as string);
      }
    }

    const pipeline: any[] = [];

    // Base record filters (disease, date range, etc.)
    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }

    // Always join patient to access patient-based fields (address, age, etc.)
    pipeline.push(
      {
        $lookup: {
          from: "users",
          localField: "patientId",
          foreignField: "patientId",
          as: "patient",
        },
      },
      { $unwind: "$patient" }
    );

    // Optional age group filter (e.g. "20-30") based on patient age
    if (ageGroup) {
      const [minStr, maxStr] = (ageGroup as string)
        .split("-")
        .map((s) => s.trim());
      const minAge = minStr ? parseInt(minStr, 10) : undefined;
      const maxAge = maxStr ? parseInt(maxStr, 10) : undefined;

      if (!Number.isNaN(minAge ?? 0) || !Number.isNaN(maxAge ?? 0)) {
        const ageMatch: any = {};
        if (minAge !== undefined && !Number.isNaN(minAge)) {
          ageMatch.$gte = minAge;
        }
        if (maxAge !== undefined && !Number.isNaN(maxAge)) {
          ageMatch.$lte = maxAge;
        }

        if (Object.keys(ageMatch).length > 0) {
          pipeline.push({ $match: { "patient.age": ageMatch } });
        }
      }
    }

    // Location filter based on patient address (partial, case-insensitive)
    if (location) {
      pipeline.push({
        $match: {
          "patient.address": {
            $regex: location,
            $options: "i",
          },
        },
      });
    }

    // Final aggregation (group by disease + patient address as location)
    pipeline.push({
      $group: {
        _id: {
          disease: "$disease",
          location: "$patient.address",
        },
        count: { $sum: 1 },
      },
    });

    const data = await MedicalRecord.aggregate(pipeline);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Analytics failed", error });
  }
};