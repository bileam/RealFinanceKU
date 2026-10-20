'use client'
import { ChevronRight, ClosedCaption } from "lucide-react";
import DashedLineChart from "../MUI/DashedLineChart";
import PieChartWithCenterLabel from "../MUI/PieChartWithCenterLabel";
import { useEffect, useState } from "react";


type Transaction = {
    id: string,
    type:string,
    amount:string,
    description:string,
    transactionDate:string,
    status:string,
    createdAt:string,
    updatedAt:string
}

type transactionApiResponse = {
    success: boolean,
    count: number,
    data: Transaction[]
} 

export default function Grafik(){
    const [transactions,setTransaction] = useState<Transaction[]>([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState<string | null>(null)

    useEffect(()=>{
        async function fetchTransection(){
        try {
                const response = await fetch("http://localhost:3000/api/transaksi?idUser=de2ce9d4-a628-46a2-9784-48710c51f46f")
                if(!response.ok){
                    throw new Error("gagal mengambil data")
                }
                const result : transactionApiResponse = await response.json()
                // console.log(result.data)
                setTransaction(result.data)
        } catch (error) {
                console.log("terjadi kesalahan")
        }finally{
                setLoading(false)
        }
    }
    fetchTransection()
    },[])

    return(
        <div className="flex gap-4">
            <div className="w-[60%] rounded-2xl border border-primary-dark/5 bg-primary-light px-4 py-3 shadow shadow-primary/15 transition-colors duration-300 dark:border-white/5 dark:bg-gradient-to-br dark:from-[#202238] dark:to-[#191b2a] dark:shadow-black/20">
                <div className="flex justify-between w-full">
                    <h3 className="text-primary-dark text-lg font-bold dark:text-slate-100">Ringkasa Kuangan</h3>
                </div>
                 <DashedLineChart/>
            </div>
            {/* <div className="flex-1 shadow shadow-primary/15 bg-primary-light flex flex-col gap-3 px-4 py-2">
                <h2 className="text-primary-dark text-lg font-bold">Kategori Pengeluaran</h2>
                    <div className="mt-8"><PieChartWithCenterLabel/></div>
            </div> */}
            <div className="flex-1 rounded-2xl border border-primary-dark/5 bg-primary-light p-2 shadow shadow-primary/15 transition-colors duration-300 dark:border-white/5 dark:bg-gradient-to-br dark:from-[#202238] dark:to-[#191b2a] dark:shadow-black/20">
                <div className="flex justify-between items-center">
                    <span className="text-primary-dark px-2 py-2 text-lg font-bold dark:text-slate-100">Aktivitas Terbaru</span>
                    <button className="text-primary-dark hover:text-right hover:brightness-125 px-2 flex gap-2 items-center cursor-pointer dark:text-indigo-300"><span>view all</span><ChevronRight className="w-5 h-5"/></button>
                </div>
                <div className="space-y-2 px-2 pb-2 pt-4">
                    <div className="flex items-center justify-between rounded-xl px-2 py-3 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]">
                        <ClosedCaption className="w-10 h-10 rounded-full bg-green-600/20 p-2 text-green-500 dark:bg-emerald-400/10 dark:text-emerald-300"/>
                        <div>
                            <p className="text-md font-semibold text-slate-800 dark:text-slate-100">gaji Bulanan</p>
                            <span className="text-[12px] text-slate-500 dark:text-slate-400">Lorem ipsum</span>
                        </div>
                        <p className="font-semibold text-green-600 dark:text-emerald-300">Rp.4,000,000</p>
                    </div>
                    <div className="flex items-center justify-between rounded-xl px-2 py-3 transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]">
                        <ClosedCaption className="w-10 h-10 rounded-full bg-red-600/20 p-2 text-red-500 dark:bg-rose-400/10 dark:text-rose-300"/>
                        <div>
                            <p className="text-md font-semibold text-slate-800 dark:text-slate-100">Belanja Bulanan</p>
                            <span className="text-[12px] text-slate-500 dark:text-slate-400">Lorem ipsum</span>
                        </div>
                        <p className="font-semibold text-red-600 dark:text-rose-300">Rp.4,000,000</p>
                    </div>
                </div>
            </div>
        </div>
    )
}