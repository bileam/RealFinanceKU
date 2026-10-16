"use client"
import { transactions } from "@/dataset/transaksi";
import { useEffect, useState } from "react";

type transaksi = {
    id : number,
    name : string,
    type : string,
    amount: number
}


export default function Testing() {
    const [data,setData] = useState<transaksi[]>([])
    const [loading,setLoading] = useState(true)
    const [currentPage,setCurrentPage] = useState(1)


   const countperPage = 5

   const startPage = (currentPage-1) * countperPage //[0]
//    start = 0 *5 = 0

   const endPage = startPage + countperPage
// 0+5 = 5

const mathceil = Math.ceil(data.length / countperPage)

    useEffect(()=>{
async function DataDammy (){
    try {
        setLoading(true)
         await new Promise((resolve)=>setTimeout(resolve,1000))
    setData(transactions)
    } catch (error) {

        console.log("terjadi eror")
        console.error(error)
        
    }finally{
        setLoading(false)

    }
}
DataDammy()
    },[])
    if(loading) {
        return <div className="h-screen w-full bg-black/10 flex transition-all duration-500 items-center justify-center">
            <div className="p-6 bg-white rounded-2xl">
loading data....
            </div>
        </div>
    }
    console.log(currentPage)
  return (
    <div className="mx-auto my-10 w-full max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Riwayat Transaksi
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Daftar pemasukan dan pengeluaran Anda.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
          + Tambah Transaksi
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
            <tr>
              <th className="w-16 px-5 py-4 font-semibold">No</th>
              <th className="px-5 py-4 font-semibold">
                Nama Transaksi
              </th>
              <th className="px-5 py-4 font-semibold">
                Tipe
              </th>
              <th className="px-5 py-4 text-right font-semibold">
                Nominal
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {
                data.slice(startPage,endPage).map((item,index)=>(
 <tr key={item.id} className="transition hover:bg-gray-50/80">
              <td className="px-5 py-4 text-gray-400">{startPage+index+1}</td>
              <td className="px-5 py-4 font-medium text-gray-900">
                {item.name}
              </td>
              <td className="px-5 py-4">
                <span className={`inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium ${item.type === "Pemasukan"?"text-emerald-600":"text-red-600"} `}>
                  {item.type}
                </span>
              </td>
              <td className={`px-5 py-4 text-right font-semibold tabular-nums ${item.type === "Pemasukan"?"text-emerald-600":"text-red-600"} `}>
                <span>{item.type === "Pemasukan"?"+":"-"}</span> Rp5.000.000
              </td>
            </tr>
                ))
            }
          </tbody>
        </table>
      </div>
      {/* Pagination statis */}
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-medium text-gray-900">{startPage+1}–{endPage}</span> dari{" "}
          <span className="font-medium text-gray-900">{data.length}</span> transaksi
        </p>

        <div className="flex items-center gap-2">
          <button
          onClick={()=>setCurrentPage(prev=>prev-1)}
            disabled = {currentPage === 1}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-400 disabled:cursor-not-allowed"
          >
            Prev
          </button>

        <div className="flex items-center gap-2">
  {Array.from({ length: mathceil }, (_, index) => {
    const page = index + 1;

    return (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
          currentPage === page
            ? "bg-blue-600 text-white"
            : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
        }`}
      >
        {page}
      </button>
    );
  })}
</div>

          <button
           onClick={()=>setCurrentPage(prev=>prev+1)}
           disabled = {currentPage >= mathceil}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
