"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardPathForRole } from "../../../lib/auth";
import {
  User,
  Activity,
  FileText,
} from "lucide-react";

import RecordCard from "../../patient/components/RecordCard";
import PatientChatbot from "./components/PatientChatbot";

export default function PatientDashboard() {
  const [patient, setPatient] = useState<any | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const stored = localStorage.getItem("user");

        if (!stored) {
          router.replace("/auth/login");
          return;
        }

        const user = JSON.parse(stored);

        if (user.role !== "PATIENT") {
          const target = getDashboardPathForRole(user.role);
          router.replace(target);
          return;
        }

        const profileRes = await fetch(
          `http://localhost:5000/api/patient/${user.patientId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const profileData = await profileRes.json();
        setPatient(profileData);

        const historyRes = await fetch(
          `http://localhost:5000/api/patient/${user.patientId}/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const historyData = await historyRes.json();
        setRecords(historyData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <User className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Patient Dashboard</h1>
        </div>

        <p className="text-sm text-gray-400">
          Manage your profile and medical history
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-400 mt-10">
          Loading dashboard...
        </div>
      )}

      {!loading && (
        <>
          {/* Profile + Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Profile Card */}
            {patient && (
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center text-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-500/20 mb-4">
                  <User className="w-8 h-8 text-indigo-400" />
                </div>

                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-gray-400 mb-2">
                  ID: {patient.patientId}
                </p>

                <div className="text-sm text-gray-300 space-y-1">
                  <p>Age: {patient.age}</p>
                  <p>Gender: {patient.gender}</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Records</p>
                <h2 className="text-2xl font-bold">{records.length}</h2>
              </div>
              <FileText className="text-indigo-400" />
            </div>

            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Cases</p>
                <h2 className="text-2xl font-bold">{records.length}</h2>
              </div>
              <Activity className="text-indigo-400" />
            </div>
          </div>

          {/* Medical History */}
          <div>
            <h2 className="text-lg font-semibold mb-4">My Medical History</h2>

            {records.length === 0 ? (
              <p className="text-gray-400">No records found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {records.map((record, index) => (
                  <RecordCard key={index} record={record} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <PatientChatbot />
    </div>
  );
}
