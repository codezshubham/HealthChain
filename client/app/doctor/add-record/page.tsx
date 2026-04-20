"use client";

import AddRecordForm from "../components/AddRecordForm";
import { FilePlus } from "lucide-react";

export default function AddRecordPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <FilePlus className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Add Medical Record</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Fill in the details to securely store a new patient record.
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <AddRecordForm />
        </div>
      </div>
    </div>
  );
}