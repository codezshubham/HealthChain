"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardPathForRole } from "../../../lib/auth";
import {
  UserSearch,
  Stethoscope,
} from "lucide-react";

import AddRecordForm from "../../doctor/components/AddRecordForm";
import PatientCard from "../../patient/components/PatientCard";

export default function DoctorDashboard() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.replace("/auth/login");
      return;
    }

    const user = JSON.parse(stored);

    if (user.role !== "DOCTOR") {
      const target = getDashboardPathForRole(user.role);
      router.replace(target);
    }
  }, []);

  const searchPatient = async () => {
    try {
      setLoading(true);
      setPatient(null);
      setOtpRequested(false);
      setOtpError(null);

      const res = await fetch(
        `http://localhost:5000/api/doctor/request-access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ patientId }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.message || "Failed to request OTP");
        return;
      }

      setOtpRequested(true);
      setOtpError(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setVerifying(true);
      setOtpError(null);

      const res = await fetch(
        `http://localhost:5000/api/doctor/verify-access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ patientId, otp: otpCode }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setOtpError(data.message || "Invalid OTP");
        return;
      }

      setPatient(data.patient);
      setOtpRequested(false);
      setOtpCode("");
      setOtpError(null);
    } catch (err) {
      console.error(err);
      setOtpError("Something went wrong while verifying OTP");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <Stethoscope className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Search patients and manage medical records efficiently
        </p>
      </div>

      {/* Search Section */}
      <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserSearch className="w-5 h-5 text-indigo-400" />
          Search Patient
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          
          <input
            placeholder="Enter Patient ID..."
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={searchPatient}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-medium hover:scale-[1.02] transition disabled:opacity-70"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* OTP Step */}
      {otpRequested && !patient && (
        <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl space-y-3 max-w-md">
          <h2 className="text-lg font-semibold">Patient Consent Required</h2>
          <p className="text-sm text-gray-300">
            An OTP has been sent to the patient's registered phone number.
            Ask the patient for the OTP and enter it below to view their
            details with their permission.
          </p>

          <input
            placeholder="Enter 6-digit OTP"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {otpError && (
            <p className="text-sm text-red-400">{otpError}</p>
          )}

          <button
            onClick={verifyOtp}
            disabled={verifying || !otpCode}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-medium hover:scale-[1.02] transition disabled:opacity-70"
          >
            {verifying ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      {/* Patient Result */}
      {patient && (
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Patient Details
          </h2>

          <div className="max-w-md">
            <PatientCard
              patient={patient}
              onClick={() =>
                router.push(`/doctor/patient/${patient.patientId}`)
              }
            />
          </div>
        </div>
      )}

      {/* Add Record Section */}
      <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
        <h2 className="text-lg font-semibold mb-4">
          Add Medical Record
        </h2>

        <AddRecordForm />
      </div>
    </div>
  );
}