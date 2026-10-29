
"use client";

import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  CalendarDays,
  LayoutGrid,
  MoveDown,
  MoveUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";



type AddTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


type categorie = {
   id:string,
    name:string,
    type: "income" | "expense",
    createdAt: string;
    updatedAt: string;
}

type responseCategories = {
  success: boolean,
    countData : number,
    countIncome:number,
    countexpense:number,
    data:categorie[]
}

export default function AddTransactionModal({
  isOpen,
  onClose,
}: AddTransactionModalProps) {
    const [datacategories,serDatacategories] = useState<categorie[]>([])
    const [loading,setLoading] = useState(true)
  // Jika modal tidak terbuka, jangan tampilkan modal.
  useEffect(()=>{
async function GetCategory(){
  try {
    setLoading(true)
    const response = await fetch(".api")
    // const result: responseCategories = response.json()
    // console.log(result)

  } catch (error) {
    
  }finally{
setLoading(false)
  }
}
GetCategory()
  },[])
  if (!isOpen) return null;





  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-modal-title"
        className="max-h-[90vh] w-250 max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-2xl dark:border-white/10 dark:bg-slate-900 dark:text-white sm:p-8"
      >
        {/* Header modal */}
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary dark:text-white dark:bg-indigo-500 dark:text-indigo-300">
              <ArrowLeftRight  />
            </div>

            <div>
              <h2
                id="transaction-modal-title"
                className="text-xl dark:text-white text-primary font-semibold"
              >
                Tambah Transaksi
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                Catat pemasukan atau pengeluaranmu.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Pilihan jenis transaksi */}
        <div className="mb-4  grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500 bg-emerald-500/10 px-3 py-2 font-medium text-emerald-700 transition-colors dark:bg-emerald-500/10 dark:text-emerald-400"
          >
            <MoveUp size={19} />
            Pemasukan
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2 font-medium text-gray-500 transition-colors cursor-pointer bg-red-500/20 text-red-500 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
          >
            <MoveDown size={19} />
            Pengeluaran
          </button>
        </div>

        {/* Nominal */}
        <div className="mb-4 flex  gap-2">
          <div>   <label
            htmlFor="transaction-amount"
            className="mb-2 block text-sm font-medium"
          >
            Nominal
          </label>
          <div className="flex items-center rounded-xl border border-gray-200 transition-colors focus-within:border-primary dark:border-white/10 dark:focus-within:border-indigo-400">
            <span className="border-r border-gray-200 px-4 py-2 text-gray-500 dark:border-white/10 dark:text-slate-400">
              Rp
            </span>
            <input
              id="transaction-amount"
              type="number"
              min="1"
              step="1"
              placeholder="exp: 200000"
              className="w-full bg-transparent rounded-r-2xl px-4 py-2 outline-none border-none ring-0 placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
          </div>
          </div>
          {/* status */}
       <div className="">
          <label
            htmlFor="transaction-category"
            className="mb-2 block text-sm font-medium"
          >
            Status
          </label>
          <div className="relative">
            <span  className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-slate-400 bg-green-500 h-2 w-2 rounded-full"></span>

            <select
              id="transaction-category"
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2 pr-10 pl-10 outline-none transition-colors focus:border-primary dark:border-white/10 dark:bg-slate-900"
            >
              <option value="" className="flex gap-2 space-x-2" >
                Berhasil
              </option>
            </select>
          </div>
        </div>
        </div>

        {/* Kategori */}
        <div className="mb-4">
          <label
            htmlFor="transaction-category"
            className="mb-2 block text-sm font-medium"
          >
            Kategori
          </label>

          <div className="relative">
            <LayoutGrid
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-slate-400"
            />

            <select
              id="transaction-category"
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2 pr-10 pl-10 outline-none transition-colors focus:border-primary dark:border-white/10 dark:bg-slate-900"
            >
              <option value="" disabled>
                Pilih kategori
              </option>
            </select>
          </div>

          <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
            Daftar kategori akan diambil dari database FinanceKu.
          </p>
        </div>

        {/* Tanggal transaksi */}
        <div className="mb-4">
          <label
            htmlFor="transaction-date"
            className="mb-2 block text-sm font-medium"
          >
            Tanggal Transaksi
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-slate-400"
            />

            <input
              id="transaction-date"
              type="date"
              defaultValue={new Date().toLocaleDateString("en-CA")}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-10 outline-none transition-colors focus:border-primary dark:border-white/10 dark:bg-slate-900"
            />
          </div>
        </div>

        {/* Deskripsi */}
        <div className="mb-4">
          <label
            htmlFor="transaction-description"
            className="mb-2 block text-sm font-medium"
          >
            Deskripsi{" "}
            <span className="font-normal text-gray-400">(Opsional)</span>
          </label>

          <textarea
            id="transaction-description"
            rows={3}
            placeholder="Masukkan keterangan transaksi..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-colors focus:border-primary dark:border-white/10 dark:bg-slate-900 dark:placeholder:text-slate-500"
          />
        </div>

        {/* Tombol aksi */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-200 px-4 py-2 font-medium transition-colors hover:bg-gray-100 dark:border-white/10 dark:hover:bg-white/5"
          >
            Batal
          </button>

          <button
            type="button"
            className="flex-1 rounded-xl bg-primary px-4 py-2 font-medium text-primary-light transition-all hover:brightness-110"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>
    </div>
  );
}

// Ikon untuk header modal
function ArrowLeftRightIcon() {
  return <ArrowDownLeft size={23} />;
}
