"use client";

import { User, Phone, IdCard, Calendar, VenusAndMars } from "lucide-react";

interface Props {
  patient: any;
}

export default function PatientInfoCard({ patient }: Props) {
  return (
    <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-xl p-6 text-slate-900 dark:text-white">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-500/20">
          <User className="w-6 h-6 text-indigo-400" />
        </div>

        <div>
          <h2 className="text-lg font-semibold">{patient.name}</h2>
          <p className="text-sm text-slate-600 dark:text-gray-400">Patient Profile</p>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        
        {/* Patient ID */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
          <IdCard className="w-4 h-4 text-indigo-400" />
          <span>{patient.patientId}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
          <Phone className="w-4 h-4 text-indigo-400" />
          <span>{patient.phone}</span>
        </div>

        {/* Age */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <span>{patient.age} years</span>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
          <VenusAndMars className="w-4 h-4 text-indigo-400" />
          <span>{patient.gender}</span>
        </div>
      </div>
    </div>
  );
}