"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface AnalyticsChartsProps {
  data: any[];
}

const buildDiseaseSeries = (data: any[]) => {
  const map = new Map<string, number>();

  data.forEach((item) => {
    const disease = item._id?.disease ?? "Unknown";
    const count = item.count ?? 0;

    map.set(disease, (map.get(disease) || 0) + count);
  });

  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
  }));
};

const buildLocationSeries = (data: any[]) => {
  const map = new Map<string, number>();

  data.forEach((item) => {
    const location = item._id?.location ?? "Unknown";
    const count = item.count ?? 0;

    map.set(location, (map.get(location) || 0) + count);
  });

  return Array.from(map.entries()).map(([name, value]) => ({
    name,
    value,
  }));
};

const chartColors = {
  disease: "#6366F1", // indigo-500
  location: "#22C55E", // emerald-500
};

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ data }) => {
  const diseaseSeries = buildDiseaseSeries(data);
  const locationSeries = buildLocationSeries(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Disease distribution */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-2 text-slate-100">
          Cases by Disease
        </h3>
        {diseaseSeries.length === 0 ? (
          <p className="text-xs text-slate-400">No data to display yet.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diseaseSeries} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderColor: "#1e293b",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ color: "#e5e7eb", fontSize: 12 }} />
                <Bar dataKey="value" name="Cases" fill={chartColors.disease} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Location distribution */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold mb-2 text-slate-100">
          Cases by Location
        </h3>
        {locationSeries.length === 0 ? (
          <p className="text-xs text-slate-400">No data to display yet.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationSeries} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderColor: "#1e293b",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ color: "#e5e7eb", fontSize: 12 }} />
                <Bar dataKey="value" name="Cases" fill={chartColors.location} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsCharts;
