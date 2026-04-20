"use client";

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthForm({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        
        {/* Branding */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-semibold text-indigo-400 mb-1">
            HealthCare+
          </h1>

          <h2 className="text-2xl font-bold text-white">{title}</h2>

          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}