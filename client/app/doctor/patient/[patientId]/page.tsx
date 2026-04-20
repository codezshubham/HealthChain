"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  History,
  User as UserIcon,
  FileText,
  Activity,
} from "lucide-react";

import PatientInfoCard from "../../components/PatientInfoCard";
import RecordCard from "../../../patient/components/RecordCard";

export default function DoctorPatientDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const patientId = (params?.patientId || "") as string;

  const [patient, setPatient] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!patientId) return;

      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");

        const [profileRes, historyRes] = await Promise.all([
          fetch(`http://localhost:5000/api/doctor/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(
            `http://localhost:5000/api/doctor/patient/${patientId}/history`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        if (!profileRes.ok) throw new Error("Failed to load profile");
        if (!historyRes.ok) throw new Error("Failed to load history");

        const profileData = await profileRes.json();
        const historyData = await historyRes.json();

        setPatient(profileData);
        setRecords(historyData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  return (
  <div className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8">
  <div className="max-w-5xl mx-auto space-y-8">

    {/* HEADER */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <UserIcon className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Patient Overview</h1>
            <p className="text-gray-400 text-sm">
              Profile & medical records
            </p>
          </div>
        </div>
      </div>

      <span className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10">
        ID: {patientId}
      </span>
    </div>

    {/* PROFILE (TOP) */}
    {patient && (
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
        <PatientInfoCard patient={patient} />
      </div>
    )}

    {/* STATS (MIDDLE) */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      
      <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Total Records</p>
          <h2 className="text-2xl font-semibold">{records.length}</h2>
        </div>
        <FileText className="text-indigo-400" />
      </div>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Last Visit</p>
          <h2 className="text-sm font-medium">
            {records[0]
              ? new Date(records[0].date).toDateString()
              : "N/A"}
          </h2>
        </div>
        <Activity className="text-indigo-400" />
      </div>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-400">Age</p>
          <h2 className="text-2xl font-semibold">
            {patient?.age || "--"}
          </h2>
        </div>
        <UserIcon className="text-indigo-400" />
      </div>
    </div>

    {/* MEDICAL HISTORY (BOTTOM) */}
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-indigo-500/20">
          <History className="w-5 h-5 text-indigo-400" />
        </div>
        <h2 className="text-lg font-semibold">Medical History</h2>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl text-gray-400">
          No records found
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {records.map((record, index) => (
            <RecordCard key={index} record={record} />
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  );
}