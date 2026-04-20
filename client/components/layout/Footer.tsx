import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold">HealthChain</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-gray-400">
            Decentralized healthcare records with role-based access.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition"
          >
            Home
          </Link>
          <Link
            href="/auth/login"
            className="text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition"
          >
            Register
          </Link>
        </div>

        <p className="text-xs text-slate-500 dark:text-gray-500">
          © {new Date().getFullYear()} HealthChain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
