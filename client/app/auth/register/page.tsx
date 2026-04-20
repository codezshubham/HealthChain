"use client";
import RoleSelector from "../components/RoleSelector";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  User,
  Phone,
  Shield,
  Calendar,
  MapPin,
  VenusAndMars,
} from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    role: "PATIENT",
    age: "",
    gender: "",
    address: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      }

      alert("Registration successful. Please log in to continue.");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      {/* Card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-sm text-gray-400 mt-1">
            Join and manage your health easily
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">

          {/* Role */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Select Role</label>
            <RoleSelector
              value={form.role}
              onChange={(role) => setForm({ ...form, role })}
            />
          </div>
          
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Conditional Fields */}
          {form.role === "PATIENT" && (
            <>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <VenusAndMars className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="gender"
                  placeholder="Gender"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full mt-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-medium shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
