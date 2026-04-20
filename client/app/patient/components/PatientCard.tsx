"use client";

import { User, Phone, IdCard, ArrowRight } from "lucide-react";

interface Props {
  patient: any;
  onClick?: () => void;
}

export default function PatientCard({ patient, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl text-white cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-indigo-500/20">
          <User className="w-5 h-5 text-indigo-400" />
        </div>

        <div>
          <h2 className="font-semibold text-base">{patient.name}</h2>
          <p className="text-xs text-gray-400">Patient</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-300">
        
        <div className="flex items-center gap-2">
          <IdCard className="w-4 h-4 text-indigo-400" />
          <span>{patient.patientId}</span>
        </div>

        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-indigo-400" />
          <span>{patient.phone}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-4">
        <span className="flex items-center gap-1 text-sm text-indigo-400">
          View Details
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}