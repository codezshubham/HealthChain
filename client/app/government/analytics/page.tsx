"use client";

import { useState } from "react";
import FilterPanel from "../components/FilterPanel";
import StatsCard from "../components/StatsCard";
import DataTable from "../components/DataTable";
import AnalyticsCharts from "../components/AnalyticsCharts";

export default function GovernmentAnalytics() {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});

  const fetchAnalytics = async () => {
    const query = new URLSearchParams(filters).toString();

    const res = await fetch(
      `http://localhost:5000/api/government/analytics?${query}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const result = await res.json();
    setData(result);
  };

  const uniqueDiseases = new Set(data.map((d: any) => d._id.disease));
  const uniqueLocations = new Set(data.map((d: any) => d._id.location));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Government Dashboard</h1>

      <FilterPanel filters={filters} setFilters={setFilters} />

      <button
        onClick={fetchAnalytics}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>


      <div className="grid grid-cols-3 gap-4">
        <StatsCard title="Total Cases" value={data.length} />
        <StatsCard title="Unique Diseases" value={uniqueDiseases.size} />
        <StatsCard title="Locations" value={uniqueLocations.size} />
      </div>

      <AnalyticsCharts data={data} />

      <DataTable data={data} />
    </div>
  );
}