"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDashboardPathForRole } from "../../../lib/auth";
import { BarChart3, Filter } from "lucide-react";

import FilterPanel from "../../government/components/FilterPanel";
import StatsCard from "../../government/components/StatsCard";
import DataTable from "../../government/components/DataTable";
import AnalyticsCharts from "../../government/components/AnalyticsCharts";

export default function GovernmentDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.replace("/auth/login");
      return;
    }

    const user = JSON.parse(stored);

    if (user.role !== "GOVERNMENT") {
      const target = getDashboardPathForRole(user.role);
      router.replace(target);
    }
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const uniqueDiseases = new Set(data.map((d: any) => d._id.disease));
  const uniqueLocations = new Set(data.map((d: any) => d._id.location));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white px-6 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold">Government Dashboard</h1>
        </div>

        <p className="text-sm text-gray-400">
          Monitor disease trends and healthcare analytics
        </p>
      </div>

      {/* Filters Section */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Filter className="w-5 h-5 text-indigo-400" />
            Filters
          </h2>

          <button
            onClick={fetchAnalytics}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-medium hover:scale-[1.02] transition"
          >
            {loading ? "Applying..." : "Apply Filters"}
          </button>
        </div>

        <FilterPanel filters={filters} setFilters={setFilters} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Cases" value={data.length} />
        <StatsCard
          title="Unique Diseases"
          value={uniqueDiseases.size}
        />
        <StatsCard
          title="Locations"
          value={uniqueLocations.size}
        />
      </div>

      {/* Charts */}
      <AnalyticsCharts data={data} />

      {/* Table */}
      <DataTable data={data} />
    </div>
  );
}