"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import RecordCard from "../components/RecordCard";

export default function PatientHistory() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await fetch(
          `http://localhost:5000/api/patient/${user.patientId}/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await res.json();
        setRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <History className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Medical History</h1>
        </div>

        <p className="text-sm text-gray-400">
          View all your past medical records and reports
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        
        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400 mt-10">
            Loading records...
          </div>
        )}

        {/* Empty State */}
        {!loading && records.length === 0 && (
          <div className="text-center text-gray-400 mt-10">
            <History className="mx-auto mb-3 w-10 h-10 opacity-50" />
            <p>No medical records found</p>
          </div>
        )}

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {records.map((record, index) => (
            <RecordCard key={index} record={record} />
          ))}
        </div>
      </div>
    </div>
  );
}