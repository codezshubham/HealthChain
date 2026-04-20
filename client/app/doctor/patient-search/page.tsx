"use client";

import { useState } from "react";
import { Search, UserSearch } from "lucide-react";
import PatientInfoCard from "../components/PatientInfoCard";

export default function PatientSearchPage() {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const searchPatient = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/doctor/search?patientId=${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();
      setPatient(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <UserSearch className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Search Patient</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Find patient details quickly using their unique ID.
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              placeholder="Enter Patient ID..."
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={searchPatient}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-medium shadow-md hover:scale-[1.02] transition-all disabled:opacity-70"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto">
        {patient ? (
          <PatientInfoCard patient={patient} />
        ) : (
          <div className="text-center text-gray-400 mt-10">
            <UserSearch className="mx-auto mb-3 w-10 h-10 opacity-50" />
            <p>No patient searched yet</p>
          </div>
        )}
      </div>
    </div>
  );
}