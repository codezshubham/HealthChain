"use client";

import {
  Activity,
  FileText,
  Hospital,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";

interface Props {
  record: any;
}

const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export default function RecordCard({ record }: Props) {
  const fileUrl = `${IPFS_GATEWAY}${record.ipfsHash}`;

  return (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl text-white hover:shadow-2xl transition-all">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-400" />
          <h2 className="font-semibold text-lg">{record.disease}</h2>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(record.date).toDateString()}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 text-sm text-gray-300">
        
        {/* Symptoms */}
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-indigo-400 mt-0.5" />
          <span>
            <strong className="text-white">Symptoms:</strong>{" "}
            {record.symptoms.join(", ")}
          </span>
        </div>

        {/* Prescription */}
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-indigo-400 mt-0.5" />
          <span>
            <strong className="text-white">Prescription:</strong>{" "}
            {record.prescription}
          </span>
        </div>

        {/* Hospital */}
        <div className="flex items-center gap-2">
          <Hospital className="w-4 h-4 text-indigo-400" />
          <span>{record.hospitalName}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between items-center">
        
        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Calendar className="w-3 h-3" />
          {new Date(record.date).toLocaleDateString()}
        </div>

        {/* IPFS Link */}
        <a
          href={fileUrl}
          target="_blank"
          className="flex items-center gap-1 text-sm text-indigo-400 hover:underline"
        >
          <LinkIcon className="w-4 h-4" />
          View Report
        </a>
      </div>
    </div>
  );
}