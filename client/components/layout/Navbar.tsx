"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import ThemeToggle from "../theme/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-500/20">
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">
            HealthChain
          </h1>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">

          <ThemeToggle />
          
          <Link
            href="/auth/login"
            className="text-sm text-slate-700 hover:text-slate-900 transition dark:text-gray-300 dark:hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="px-4 py-2 rounded-lg bg-linear-to-r from-indigo-500 to-sky-500 text-sm font-medium hover:scale-[1.03] transition"
          >
            Get Started
          </Link>

        </div>
      </div>
    </header>
  );
}