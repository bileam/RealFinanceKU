"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Mengambil waktu saat ini.
    const updateTime = () => {
      setTime(new Date());
    };

    updateTime();

    // Memperbarui waktu setiap detik.
    const interval = setInterval(updateTime, 1000);

    // Membersihkan interval ketika komponen dilepas.
    return () => clearInterval(interval);
  }, []);

  const timeZone = "Asia/Jakarta";

  const formattedTime = time
    ? time.toLocaleTimeString("id-ID", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";

  const formattedDate = time
    ? time.toLocaleDateString("id-ID", {
        timeZone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Memuat tanggal...";

  return (
    <div
      className="
        group flex w-fit items-center gap-4
        rounded-2xl  
  
        px-4 py-3
      
        transition-all duration-300
       
        dark:border-slate-700

      "
    >
      {/* Ikon jam */}
      <div
        className="
          flex h-12 w-12 shrink-0 items-center justify-center
          rounded-xl text-indigo-600
          transition-transform duration-300
          group-hover:scale-105
          dark:bg-indigo-500/15 dark:text-indigo-300
        "
      >
        <Clock3 size={27} strokeWidth={1.8} />
      </div>

      {/* Jam dan tanggal */}
      <div className="min-w-0">
        <p
          className="
            font-mono text-2xl font-bold leading-tight
            tracking-tight text-indigo-700
            tabular-nums dark:text-indigo-300
          "
          aria-label={`Waktu sekarang ${formattedTime}`}
        >
          {formattedTime}
        </p>

        <p className="mt-1 whitespace-nowrap text-xs font-medium capitalize text-slate-500 dark:text-slate-400 sm:text-sm">
          {formattedDate}
        </p>
      </div>
    </div>
  );
}