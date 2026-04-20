"use client";

import { Search, MapPin, Calendar, SlidersHorizontal } from "lucide-react";

interface Props {
  filters: any;
  setFilters: (f: any) => void;
}

export default function FilterPanel({ filters, setFilters }: Props) {
  const handleChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-6 text-white">

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
  {/* Disease */}
  <div className="space-y-1">
    <label className="text-xs text-gray-400">Disease</label>
    <div className="relative">
      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input
        name="disease"
        placeholder="Enter disease"
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* Location */}
  <div className="space-y-1">
    <label className="text-xs text-gray-400">Location</label>
    <div className="relative">
      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input
        name="location"
        placeholder="Enter location"
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* Start Date */}
  <div className="space-y-1">
    <label className="text-xs text-gray-400">Start Date</label>
    <div className="relative">
      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input
        name="startDate"
        type="date"
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* End Date */}
  <div className="space-y-1">
    <label className="text-xs text-gray-400">End Date</label>
    <div className="relative">
      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
      <input
        name="endDate"
        type="date"
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>

  {/* Age Group */}
  <div className="space-y-1 md:col-span-2">
    <label className="text-xs text-gray-400">Age Group</label>
    <input
      name="ageGroup"
      placeholder="e.g. 20-30"
      onChange={handleChange}
      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
</div>
    </div>
  );
}