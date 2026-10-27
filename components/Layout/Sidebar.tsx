
"use client";

import {
  ArrowLeftRight,
  BadgeDollarSign,
  ChartColumnStacked,
  LayoutDashboard,
  LogOut,
  Settings,
  SquareChartGantt,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Mengatur apakah modal konfirmasi logout ditampilkan
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Mencegah tombol logout ditekan berkali-kali
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menu = [
    {
      icon: <LayoutDashboard />,
      namaPath: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <ArrowLeftRight />,
      namaPath: "Transaction",
      path: "/dashboard/transaction",
    },
    {
      icon: <ChartColumnStacked />,
      namaPath: "Categories",
      path: "/dashboard/categories",
    },
    {
      icon: <SquareChartGantt />,
      namaPath: "Plan",
      path: "/dashboard/plan",
    },
    {
      icon: <Settings />,
      namaPath: "Pengaturan",
      path: "/dashboard/settings",
    },
  ];

  // Memanggil API logout setelah pengguna mengonfirmasi
  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Gagal keluar dari akun");
        return;
      }

      setShowLogoutModal(false);

      toast.success(result.message || "Berhasil logout");

      router.replace("/Login");
      router.refresh();
    } catch (error) {
      console.error("Terjadi kesalahan saat logout:", error);
      toast.error("Terjadi kesalahan pada server");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative flex h-full flex-col justify-between px-4">
      <div className="relative z-20 flex flex-col gap-20">
        <div className="mt-2 flex items-center justify-center gap-1">
          <BadgeDollarSign className="w-10 text-sky-400" />
          <div>
            <h2 className="-mb-3 text-2xl">
              Finance<span className="font-sans text-2xl">Ku</span>
            </h2>

            <span className="inline-block text-[10px] text-gray-300 dark:text-slate-400">
              personal finance manajement
            </span>
          </div>
        </div>

        <div className="relative flex flex-col gap-6">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex gap-6 rounded-lg px-6 py-3 transition-colors duration-300 ${
                  isActive
                    ? "bg-[#F0EEFF]/20 text-white shadow-sm shadow-indigo-950/10 dark:bg-indigo-400/15 dark:text-indigo-100"
                    : "text-white/80 hover:bg-[#F0EEFF]/10 hover:text-white dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.namaPath}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Tombol Logout: desain asli tetap dipertahankan */}
      <button
        type="button"
        onClick={() => setShowLogoutModal(true)}
        className="z-20 mb-5 flex cursor-pointer gap-5 rounded-lg px-6 py-3 text-gray-200 transition-all duration-200 hover:bg-[#F0EEFF]/20 hover:text-white dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
      >
        <LogOut />
        <span>Logout</span>
      </button>

      {/* Dekorasi Sidebar: tetap dipertahankan */}
      <div className="absolute -top-15 -left-30 z-0 h-50 w-50 rounded-full bg-primary-light/5" />
      <div className="absolute top-15 left-30 z-0 h-10 w-10 rounded-full bg-primary-light/5" />
      <div className="absolute top-20 left-30 z-0 h-10 w-10 rounded-full bg-primary-light/5" />
      <div className="absolute -right-25 -bottom-10 z-0 h-50 w-50 rounded-full bg-primary-light/10" />
      <div className="absolute -right-10 -bottom-10 z-0 h-50 w-50 rounded-full border border-primary-light/10" />
      <div className="absolute bottom-50 -left-15 z-0 h-20 w-20 rounded-full bg-primary-light/10" />
      <div className="absolute bottom-40 -left-15 z-0 h-20 w-20 rounded-full border border-primary-light/10" />

      {/* Modal Konfirmasi Logout: tampil di tengah layar */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={() => {
            if (!isLoggingOut) setShowLogoutModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-white"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Ikon dan tombol tutup */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                <LogOut size={24} />
              </div>

              <button
                type="button"
                aria-label="Tutup konfirmasi logout"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Pesan konfirmasi */}
            <h2
              id="logout-title"
              className="mb-2 text-xl font-semibold"
            >
              Apakah Anda ingin keluar?
            </h2>

            <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
              Anda akan keluar dari akun FinanceKu. Silakan login kembali
              untuk mengakses dashboard.
            </p>

            {/* Tombol Batal dan Ya, Keluar */}
            <div className="flex gap-3">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5 font-medium transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:hover:bg-white/10"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Memproses..." : "Ya, Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}