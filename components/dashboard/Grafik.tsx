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
            <div className="w-[60%] shadow shadow-primary/15 bg-primary-light px-4 py-2">
                <div className="flex justify-between w-full">
                    <h3 className="text-primary-dark text-lg font-bold">Ringkasa Kuangan</h3>
                </div>
                 <DashedLineChart/>
            </div>
            {/* <div className="flex-1 shadow shadow-primary/15 bg-primary-light flex flex-col gap-3 px-4 py-2">
                <h2 className="text-primary-dark text-lg font-bold">Kategori Pengeluaran</h2>
                    <div className="mt-8"><PieChartWithCenterLabel/></div>
            </div> */}
            <div className="flex-1 shadow shadow-primary/15 bg-primary-light ">
                <div className="flex justify-between items-center">
                    <span className="text-primary-dark px-2 py-2 text-lg font-bold">Aktivitas Terbaru</span>
                    <button className="text-primary-dark hover:text-right hover:brightness-125 px-2 flex gap-2 items-center cursor-pointer "><span>view all</span><ChevronRight className="w-5 h-5"/></button>
                </div>
                <div className="px-2 pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                        <ClosedCaption className="w-10 h-10 p-2 rounded-full bg-green-600/20 text-green-500"/>
                        <div>
                            <p className="text-md font-semibold ">gaji Bulanan</p>
                            <span className="text-[12px]">Lorem ipsum</span>
                        </div>
                        <p className="text-green-600">Rp.4,000,000</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <ClosedCaption className="w-10 h-10 p-2 rounded-full bg-red-600/20 text-red-500"/>
                        <div>
                            <p className="text-md font-semibold ">Belanja Bulanan</p>
                            <span className="text-[12px]">Lorem ipsum</span>
                        </div>
                        <p className="text-red-600">Rp.4,000,000</p>
                    </div>
                </div>
            </div>
        </div>
    )
}