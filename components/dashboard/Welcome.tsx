"use client";

import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Profile = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

type ResponseAPI = {
  success: boolean;
  message: string;
  data?: Profile;
};

export default function Welcome() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchDataProfile() {
      try {
        const response = await fetch("/api/me");

        const result: ResponseAPI = await response.json();

        if (!response.ok || !result.success || !result.data) {
          toast.error(result.message || "Gagal mengambil data profil");
          return;
        }

        setProfile(result.data);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
        toast.error("Terjadi kesalahan saat mengambil profil");
      }
    }

    fetchDataProfile();
  }, []);

  return (
    <div className="relative space-y-2 overflow-hidden rounded-2xl border border-primary-dark/10 bg-primary px-6 py-6 text-white shadow-sm shadow-primary/20 transition-colors duration-300 dark:border-indigo-300/10 dark:bg-gradient-to-br dark:from-indigo-950 dark:via-[#242044] dark:to-slate-900 dark:shadow-black/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="z-10 text-5xl brightness-125">
            Hallo, {profile?.name ?? "Pengguna"}!
          </h2>

          <p className="z-10 text-lg text-gray-300 dark:text-slate-300">
            Kelola keuanganmu dengan lebih baik di sini.
          </p>
        </div>

        <button
          type="button"
          className="z-10 flex cursor-pointer items-center gap-2 rounded-full bg-primary-light/60 px-4 py-2 text-primary transition-all duration-500 hover:translate-y-2 hover:gap-4 hover:brightness-110 dark:bg-white/10 dark:text-indigo-100 dark:hover:bg-white/15"
        >
          <span>Lihat ringkasan</span>
          <MoveRight />
        </button>
      </div>

      {/* Dekorasi glow */}
      <div className="absolute -bottom-5 -left-10 h-30 w-30 rounded-full bg-primary-light/20" />
      <div className="absolute -bottom-12 left-40 z-10 h-30 w-30 rounded-full bg-primary-light/20" />
      <div className="absolute -bottom-12 left-50 z-2 h-50 w-50 rounded-full bg-primary-light/20" />
      <div className="absolute -bottom-12 left-70 h-50 w-50 rounded-full border border-primary-light/20" />
      <div className="absolute -right-6 -bottom-7 z-4 h-50 w-50 rounded-full bg-primary-light/10" />
      <div className="absolute right-12 -bottom-10 z-2 h-50 w-50 rounded-full border border-primary-light/20" />
      <div className="absolute right-22 -bottom-10 z-0 h-30 w-30 rounded-full bg-primary-light/20" />
      <div className="absolute top-[-2.5rem] right-[40%] z-0 h-30 w-30 rounded-full bg-primary-light/5" />
      <div className="absolute top-10 right-[30%] z-0 h-30 w-30 rounded-full bg-primary-light/5" />
    </div>
  );
}