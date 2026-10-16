import { Filter } from "lucide-react";


export default function Content(){
    return(
        <div className="flex flex-col gap-2 ">
            

            {/* filtering */}
            <div className="flex gap-2 w-full  py-3">
               
<select
  name="type"
  id="type"
  className="
    w-full
    sm:w-48
    px-4
    py-2.5
    rounded-xl
    bg-white
    border border-gray-200
    text-sm text-gray-700
    shadow-sm
ring ring-primary
    transition-all
    cursor-pointer
    hover:border-gray-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-100
  "
>
  <option value="">Semua Tipe</option>
  <option value="income">Pemasukan</option>
  <option value="expense">Pengeluaran</option>
</select>
               
<select
  name="type"
  id="type"
  className="
    w-full
    sm:w-48
    px-4
    py-2.5
    rounded-xl
    bg-white
    border border-gray-200
    text-sm text-gray-700
    shadow-sm
ring ring-primary
    transition-all
    cursor-pointer
    hover:border-gray-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-100
  "
>
  <option value="">Semua Kategori</option>
  <option value="income">Pemasukan</option>
  <option value="expense">Pengeluaran</option>
</select>

<select
  name="type"
  id="type"
  className="
    w-full
    sm:w-100
    px-4
    py-2.5
    rounded-xl
    bg-white
    border border-gray-200
    text-sm text-gray-700
    shadow-sm
ring ring-primary
    transition-all
    cursor-pointer
    hover:border-gray-300
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-100
  "
>
  <option value="">05 Desember 2002 - 09 January 2003 </option>
  <option value="income">Pemasukan</option>
  <option value="expense">Pengeluaran</option>
</select>
<button className="px-2 py-2 shadow rounded-2xl bg-white"><Filter className="text-primary"/></button>

               
            </div>
            {/* transaction list */}
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
  {/* Header */}
  <div className="mb-5 flex items-center justify-between">
    <h2 className="text-base font-bold text-slate-800">
      Daftar Transaksi
    </h2>

    <button className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800">
      Lihat Semua
      <span>›</span>
    </button>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-[800px] text-left text-sm">
      <thead>
        <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <th className="rounded-l-xl px-4 py-4">Tanggal</th>
          <th className="px-4 py-4">Deskripsi</th>
          <th className="px-4 py-4">Kategori</th>
          <th className="px-4 py-4">Tipe</th>
          <th className="px-4 py-4 text-right">Jumlah</th>
          <th className="px-4 py-4 text-center">Status</th>
          <th className="rounded-r-xl px-4 py-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {[
          {
            date: "03 Okt 2026",
            name: "Gaji Bulanan",
            category: "Gaji",
            type: "Pemasukan",
            amount: 5000000,
          },
          {
            date: "02 Okt 2026",
            name: "Belanja di Indomaret",
            category: "Makanan",
            type: "Pengeluaran",
            amount: 85000,
          },
          {
            date: "01 Okt 2026",
            name: "Top Up E-wallet",
            category: "Transfer",
            type: "Transfer",
            amount: 300000,
          },
          {
            date: "30 Sep 2026",
            name: "Tagihan Listrik",
            category: "Tagihan",
            type: "Pengeluaran",
            amount: 250000,
          },
          {
            date: "29 Sep 2026",
            name: "Investasi Reksa Dana",
            category: "Investasi",
            type: "Pengeluaran",
            amount: 500000,
          },
        ].map((item, index) => (
          <tr
            key={index}
            className="transition-colors hover:bg-slate-50/80"
          >
            <td className="whitespace-nowrap px-4 py-5 text-slate-500">
              {item.date}
            </td>

            <td className="whitespace-nowrap px-4 py-5 font-semibold text-slate-700">
              {item.name}
            </td>

            <td className="px-4 py-5 text-slate-600">
              {item.category}
            </td>

            <td className="px-4 py-5">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  item.type === "Pemasukan"
                    ? "bg-emerald-50 text-emerald-600"
                    : item.type === "Pengeluaran"
                    ? "bg-rose-50 text-rose-600"
                    : "bg-indigo-50 text-indigo-600"
                }`}
              >
                {item.type}
              </span>
            </td>

            <td className="whitespace-nowrap px-4 py-5 text-right font-semibold tabular-nums text-slate-700">
              Rp {item.amount.toLocaleString("id-ID")}
            </td>

            <td className="px-4 py-5 text-center">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                Berhasil
              </span>
            </td>

            <td className="px-4 py-5 text-center">
              <button
                aria-label={`Aksi ${item.name}`}
                className="rounded-lg px-3 py-1 font-bold text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                ···
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Footer & Pagination — tampilan saja */}
  <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
    <p className="text-xs font-medium text-slate-500">
      Menampilkan <span className="font-semibold text-slate-700">1 - 5</span> dari{" "}
      <span className="font-semibold text-slate-700">12</span> data
    </p>

    <div className="flex items-center justify-end gap-2">
      <button
        disabled
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        ‹
      </button>

      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`h-9 w-9 rounded-lg text-sm font-semibold transition ${
            page === 1
              ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
              : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
        >
          {page}
        </button>
      ))}

      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50">
        ›
      </button>
    </div>
  </div>
</div>    
</div>
    )
} 