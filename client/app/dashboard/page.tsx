"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHome() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.replace("/auth/login");
      return;
    }

    const user = JSON.parse(stored);

    if (user.role === "PATIENT") {
      router.replace("/dashboard/patient");
    } else if (user.role === "DOCTOR") {
      router.replace("/dashboard/doctor");
    } else if (user.role === "GOVERNMENT") {
      router.replace("/dashboard/government");
    } else {
      router.replace("/auth/login");
    }
  }, []);

  return <p>Redirecting...</p>;
}