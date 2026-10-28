"use client";

import { useCallback, useEffect, useState } from "react";
import { MoveDown, MoveUp, Wallet } from "lucide-react";

type TransactionSummary = {
  name: string;
  total: number;
};

type ApiResponse = {
  success: boolean;
  data: TransactionSummary[];
};

export default function Spesifik() {
  const [dataTransaction, setDataTransaction] = useState<
    TransactionSummary[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi mengambil data dari API
  const getTransaction = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(
        "/api/allday",
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Data tidak berhasil diambil");
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error("API gagal mengambil data");
      }

      setDataTransaction(result.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan"
      );
    }
  }, []);

  // Fetch pertama kali ketika komponen dibuka
  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);

      try {
        await getTransaction();
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [getTransaction]);

  // Cari total berdasarkan nama
  function getTotal(name: string): number {
    const result = dataTransaction.find(
      (item) => item.name === name
    );

    return result?.total ?? 0;
  }

  // Format angka menjadi Rupiah
  function formatRupiah(total: number): string {
    return total.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    });
  }

  const items = [
    {
      id: "1",
      name: "pemasukan",
      judul: "Total Pemasukan",
      icon: <MoveUp className="text-green-600 dark:text-emerald-300" />,
      color: "bg-green-600/20",
      colortext: "text-green-600",
      darkColorText: "dark:text-emerald-300",
      persen: "20%",
    },
    {
      id: "2",
      name: "pengeluaran",
      judul: "Total Pengeluaran",
      icon: <MoveDown className="text-red-600 dark:text-rose-300" />,
      color: "bg-red-600/20",
      colortext: "text-red-600",
      darkColorText: "dark:text-rose-300",
      persen: "10%",
    },
    {
      id: "3",
      name: "jumlah_saldo",
      judul: "Saldo Saat Ini",
      icon: <Wallet className="text-sky-600 dark:text-sky-300" />,
      color: "bg-sky-600/20",
      colortext: "text-sky-600",
      darkColorText: "dark:text-sky-300",
      persen: "13%",
    },
  ];
const loadingTrue = "bg-gray-200 dark:bg-slate-700"

  if (loading) {
    return   <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3 h-50">
    {items.map((item) => (
      <div
        key={item.id}
        className="items-center rounded-xl bg-primary-light px-5 py-2 shadow shadow-primary/15 transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/5 dark:bg-gradient-to-br dark:from-[#252741] dark:via-[#202238] dark:to-[#191b2a] dark:shadow-black/20"
      >
        <div className="flex items-center gap-3 py-2">
          <div className={`h-10 w-12 rounded-full p-2 ${loadingTrue}`}> 
          </div>
          <div className="flex w-full flex-col gap-2">
            {item.id === "1" ? (
              <div className="flex w-full justify-between">
                <p className={`${loadingTrue} rounded-full w-50 `}></p>

                <select className={`  w-20 rounded-full p-2 ${loadingTrue} px-2 text-primary-light  outline-none`}>
                  {/* <option value="bulanan">Bulanan</option>
                  <option value="all">Semua</option> */}
                </select>
              </div>
            ) : (
              <p className={`${loadingTrue} rounded-full w-50 `}></p>
            )}

            <h2 className={`text-2xl font-bold ${loadingTrue} rounded-full w-50`}>
             
            </h2>
            <p className={`text-gray-400 ${loadingTrue} rounded-full h-10 w-10  `}>
              <span className={ `${item.colortext} ${loadingTrue} rounded-full h-10 w-10`}>
                {/* {item.persen} */}
              </span>{" "}
              {/* dari tahun lalu */}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
  }

  if (error) {
    return (
      <div className="py-6 text-slate-800 dark:text-slate-100">
        <p className="text-red-600">{error}</p>
        <button
          onClick={getTransaction}
          className="mt-2 rounded-lg bg-primary-dark px-3 py-2 text-primary-light dark:bg-indigo-500"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="items-center rounded-xl bg-primary-light px-5 py-2 shadow shadow-primary/15 transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/5 dark:bg-gradient-to-br dark:from-[#252741] dark:via-[#202238] dark:to-[#191b2a] dark:shadow-black/20"
        >
          <div className="flex items-center gap-3 py-2">
            <div className={`h-10 rounded-full p-2 ${item.color}`}>
              {item.icon}
            </div>
            <div className="flex w-full flex-col gap-2">
              {item.id === "1" ? (
                <div className="flex w-full justify-between">
                  <p className="text-gray-500 dark:text-slate-400">{item.judul}</p>

                  <select className="rounded-xl bg-primary-dark px-2 text-primary-light outline-none dark:border dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200">
                    <option value="bulanan">Bulanan</option>
                    <option value="all">Semua</option>
                  </select>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-slate-400">{item.judul}</p>
              )}

              <h2 className="text-2xl font-bold text-primary-dark dark:text-white">
                {formatRupiah(getTotal(item.name))}
              </h2>
              {/* <p className="text-gray-400 dark:text-slate-400">
                <span className={`${item.colortext} ${item.darkColorText}`}>
                  {item.persen}
                </span>{" "}
                dari tahun lalu
              </p> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
