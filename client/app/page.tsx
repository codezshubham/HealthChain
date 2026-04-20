"use client";
import { Navbar } from "../components";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, ArrowRight, Shield, Stethoscope,BarChart3,
  FileText,
  Lock,
  CloudUpload, } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  
    useEffect(() => {
      const id = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(id);
    }, []);

  const services = [
    {
      title: "Blockchain Integrity",
      description:
        "Record references are anchored on-chain to support tamper-evident history.",
      icon: Shield,
    },
    {
      title: "IPFS Report Storage",
      description:
        "Upload medical reports off-chain and store only the IPFS hash for verification.",
      icon: CloudUpload,
    },
    {
      title: "Role-Based Access",
      description:
        "Patients, doctors, and government each get scoped access to what they need.",
      icon: Lock,
    },
    {
      title: "Doctor Record Creation",
      description:
        "Doctors can add records securely and finalize them after the on-chain transaction.",
      icon: Stethoscope,
    },
    {
      title: "Patient History",
      description:
        "Patients can view their history and share records safely with authorized doctors.",
      icon: FileText,
    },
    {
      title: "Analytics & Insights",
      description:
        "Anonymized insights help with planning and reporting while keeping privacy intact.",
      icon: BarChart3,
    },
  ] as const;

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white">
      
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

      <Navbar />

      <main className="relative z-10 flex-1">
        
        {/* HERO SECTION */}
        <section className="mx-auto w-full max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            
            {/* LEFT SIDE */}
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <div className="mb-5 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/20 px-4 py-1 text-xs text-indigo-400">
                🚀 Blockchain Healthcare Platform
              </div>

              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Secure & Decentralized
                <span className="block bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  Healthcare Records
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base text-gray-400">
                A next-generation platform to securely manage healthcare data
                using blockchain. Role-based access for patients, doctors, and
                government ensuring privacy, transparency, and trust.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/auth/login">
                  <button className="rounded-xl bg-linear-to-r from-indigo-500 to-sky-500 px-7 py-3 font-medium shadow-lg transition hover:scale-105">
                    Get Started
                  </button>
                </Link>

                <Link href="/auth/register">
                  <button className="rounded-xl border border-white/10 px-7 py-3 text-gray-300 transition hover:bg-white/10">
                    Create Account
                  </button>
                </Link>
              </div>

              {/* TRUST METRICS */}
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-400">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">10K+</p>
                  Users
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">5K+</p>
                  Records
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">99.9%</p>
                  Secure
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="mx-auto grid w-full max-w-md gap-5">
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/30">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-500/20 p-2">
                    <Shield className="text-indigo-400" />
                  </div>
                  <h2 className="text-lg font-semibold">Patients</h2>
                </div>
                <p className="text-sm text-gray-400">
                  View your history, manage records, and share securely with doctors.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/30">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-500/20 p-2">
                    <Stethoscope className="text-indigo-400" />
                  </div>
                  <h2 className="text-lg font-semibold">Doctors</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Access patient data, create records, and collaborate effectively.
                </p>
              </div>

              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03] hover:border-indigo-500/30">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-500/20 p-2">
                    <BarChart3 className="text-indigo-400" />
                  </div>
                  <h2 className="text-lg font-semibold">Government</h2>
                </div>
                <p className="text-sm text-gray-400">
                  Gain insights from anonymized data for better healthcare planning.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="relative mx-auto w-full max-w-6xl px-6 pb-20 lg:px-8">
  {/* Background Glow */}
  <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-r from-indigo-500/10 via-transparent to-sky-500/10 blur-3xl" />

  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-2xl shadow-2xl md:p-10">
    
    {/* Header */}
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1 text-xs font-medium text-indigo-300">
          ✨ Core Platform Features
        </div>

        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Services Offered
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-400 md:text-base">
          Everything you need to securely store, verify, and access
          healthcare records with privacy-first controls and blockchain-backed trust.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Link href="/auth/register">
          <button className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/20">
            Create Account
          </button>
        </Link>

        <Link href="/auth/login">
          <button className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-gray-200 transition-all duration-300 hover:bg-white/10">
            Login
          </button>
        </Link>
      </div>
    </div>

    {/* Service Cards */}
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <div
            key={service.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-2xl"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-transparent to-sky-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-indigo-500/10 group-hover:to-sky-500/10" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex rounded-xl bg-indigo-500/20 p-3">
                <Icon className="h-6 w-6 text-indigo-300" />
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-white">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {service.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

        <footer
      className={
        "relative mt-16 overflow-hidden border-t border-slate-200 dark:border-white/10 bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-white" +
        " transition-all duration-700 ease-out" +
        (isVisible ? " opacity-100 translate-y-0" : " opacity-0 translate-y-2")
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-indigo-500/10 via-transparent to-sky-500/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Top CTA */}
        <div className="mb-14 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                <Activity className="h-3.5 w-3.5" />
                HealthChain
              </p>
              <h2 className="mt-4 text-2xl font-semibold md:text-3xl">
                Secure records. Clear access. Real trust.
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-gray-400">
                Manage healthcare data with role-based access and blockchain-backed integrity.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/auth/register" className="inline-flex">
                <span className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]">
                  Get Started
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex rounded-xl border border-slate-200 dark:border-white/10 px-6 py-3 text-sm font-medium text-slate-700 dark:text-gray-200 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-indigo-500/20 p-2">
                <Activity className="h-5 w-5 text-indigo-300" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">HealthChain</h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-gray-400">
              A decentralized healthcare record system designed for privacy, integrity, and accountability.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-700 dark:text-gray-300">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-indigo-300" />
                  Secure
                </div>
                <p className="mt-2 text-[11px] text-slate-600 dark:text-gray-400">Immutable audit trail</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-sky-300" />
                  Clinical
                </div>
                <p className="mt-2 text-[11px] text-slate-600 dark:text-gray-400">Doctor workflows</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-300" />
                  Access
                </div>
                <p className="mt-2 text-[11px] text-slate-600 dark:text-gray-400">Role-based sharing</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold">Quick Links</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 dark:text-gray-400">
                <Link href="/" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Home
                </Link>
                <Link href="/auth/login" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Login
                </Link>
                <Link href="/auth/register" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Register
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Roles</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 dark:text-gray-400">
                <Link href="/dashboard/patient" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Patient
                </Link>
                <Link href="/dashboard/doctor" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Doctor
                </Link>
                <Link href="/dashboard/government" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                  Government
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h4 className="text-sm font-semibold">On-chain footprint</h4>
            <p className="mt-3 text-sm text-slate-600 dark:text-gray-400">
              Only references (like an IPFS hash) are stored on-chain. Medical reports remain off-chain.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              © {new Date().getFullYear()} HealthChain. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
      </main>

      
    </div>
  );
}