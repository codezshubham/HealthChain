"use client";

import { LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "../../../components/theme/ThemeToggle";

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    } catch {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 dark:bg-white/5 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 text-slate-900 dark:text-white">
      
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-indigo-500/20">
          <span className="text-indigo-400 font-bold">H+</span>
        </div>
        <h1 className="font-semibold text-lg">Healthcare System</h1>
      </div>

      {/* Right - User + Logout */}
      <div className="flex items-center gap-4">

        <ThemeToggle />
        
        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-500/20">
            <User className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-sm hidden sm:block">
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-slate-600 dark:text-gray-400 text-xs">{user?.role}</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}