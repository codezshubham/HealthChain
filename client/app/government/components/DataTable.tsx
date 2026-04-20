"use client";

interface Props {
  data: any[];
}

export default function DataTable({ data }: Props) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden text-white">
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Disease Analytics</h2>
        <p className="text-sm text-gray-400">
          Overview of reported cases by location
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          
          {/* Head */}
          <thead className="bg-white/5 text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Disease</th>
              <th className="px-6 py-3 text-left font-medium">Location</th>
              <th className="px-6 py-3 text-left font-medium">Cases</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((item, i) => (
                <tr
                  key={i}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {item._id.disease}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {item._id.location}
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium">
                      {item.count}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-10 text-gray-400"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}