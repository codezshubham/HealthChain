"use client";

import { User, Stethoscope } from "lucide-react";

interface Props {
  value: string;
  onChange: (role: string) => void;
}

export default function RoleSelector({ value, onChange }: Props) {
  return (
    <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-md">
      
      {/* Patient */}
      <button
        onClick={() => onChange("PATIENT")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-300
        ${
          value === "PATIENT"
            ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <User className="w-4 h-4" />
        Patient
      </button>

      {/* Doctor */}
      <button
        onClick={() => onChange("DOCTOR")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-300
        ${
          value === "DOCTOR"
            ? "bg-gradient-to-r from-indigo-500 to-sky-500 text-white shadow-md"
            : "text-gray-400 hover:text-white"
        }`}
      >
        <Stethoscope className="w-4 h-4" />
        Doctor
      </button>
    </div>
  );
}