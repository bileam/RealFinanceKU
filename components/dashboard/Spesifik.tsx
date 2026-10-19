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
        "/api/allday?idUser=de2ce9d4-a628-46a2-9784-48710c51f46f",
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
      icon: <MoveUp className="text-green-600" />,
      color: "bg-green-600/20",
      colortext: "text-green-600",
      persen: "20%",
    },
    {
      id: "2",
      name: "pengeluaran",
      judul: "Total Pengeluaran",
      icon: <MoveDown className="text-red-600" />,
      color: "bg-red-600/20",
      colortext: "text-red-600",
      persen: "10%",
    },
    {
      id: "3",
      name: "jumlah_saldo",
      judul: "Saldo Saat Ini",
      icon: <Wallet className="text-sky-600" />,
      color: "bg-sky-600/20",
      colortext: "text-sky-600",
      persen: "13%",
    },
  ];
const loadingTrue = "bg-gray-200"

  if (loading) {
    return   <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-3 h-50">
    {items.map((item) => (
      <div
        key={item.id}
        className="items-center rounded-lg bg-primary-light px-5 py-2 shadow shadow-primary/15 transition-all duration-500 hover:-translate-y-2"
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
      <div className="py-6">
        <p className="text-red-600">Error: {error}</p>
        <button
          onClick={getTransaction}
          className="mt-2 rounded-lg bg-primary-dark px-3 py-2 text-primary-light"
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
          className="items-center rounded-lg bg-primary-light px-5 py-2 shadow shadow-primary/15 transition-all duration-500 hover:-translate-y-2"
        >
          <div className="flex items-center gap-3 py-2">
            <div className={`h-10 rounded-full p-2 ${item.color}`}>
              {item.icon}
            </div>
            <div className="flex w-full flex-col gap-2">
              {item.id === "1" ? (
                <div className="flex w-full justify-between">
                  <p className="text-gray-400">{item.judul}</p>

                  <select className="rounded-xl bg-primary-dark px-2 text-primary-light outline-none">
                    <option value="bulanan">Bulanan</option>
                    <option value="all">Semua</option>
                  </select>
                </div>
              ) : (
                <p className="text-gray-400">{item.judul}</p>
              )}

              <h2 className="text-2xl font-bold text-primary-dark">
                {formatRupiah(getTotal(item.name))}
              </h2>
              <p className="text-gray-400">
                <span className={item.colortext}>
                  {item.persen}
                </span>{" "}
                dari tahun lalu
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
