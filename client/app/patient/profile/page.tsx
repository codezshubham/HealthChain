"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import PatientInfoCard from "../components/PatientInfoCard";

export default function PatientProfile() {
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const res = await fetch(
          `http://localhost:5000/api/patient/${user.patientId}`,
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

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <User className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Patient Profile</h1>
        </div>
        <p className="text-sm text-gray-400">
          View and manage your personal details
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        
        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400 mt-10">
            Loading profile...
          </div>
        )}

        {/* Profile */}
        {!loading && patient && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Left - Profile Card */}
            <div className="md:col-span-1">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center text-center">
                
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-500/20 mb-4">
                  <User className="w-8 h-8 text-indigo-400" />
                </div>

                <h2 className="text-lg font-semibold">{patient.name}</h2>
                <p className="text-sm text-gray-400">
                  ID: {patient.patientId}
                </p>
              </div>
            </div>

            {/* Right - Info */}
            <div className="md:col-span-2">
              <PatientInfoCard patient={patient} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}