"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  change?: string; // e.g. "+12%"
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  change,
}: Props) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl text-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      
      {/* Top */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">{title}</p>

        {icon && (
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold">{value}</h2>

        {/* Trend */}
        {trend && change && (
          <div
            className={`flex items-center gap-1 text-sm ${
              trend === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {change}
          </div>
        )}
      </div>
    </div>
  );
}