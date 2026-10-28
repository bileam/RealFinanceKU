"use client"
import { useEffect, useState } from "react";
import Cart from "../Cart";
import { MoveDown, MoveUp } from "lucide-react";



type categories = {
    id:string,
    name:string,
    type: "income" | "expense",
    createdAt: string;
    updatedAt: string;

}

type categoriResponse = {
    success: boolean,
    countData : number,
    countIncome:number,
    countexpense:number,
    data:categories[]
}

type typeCategories = "all" | "income" | "expense"



export default function Categories(){

    const [filterType,setFilterType] = useState<typeCategories>("all")
    const [dataCategori,setDataCategori] = useState<categories[]>([])
    const [summary,setsummary] = useState(
        {
            countData: 0,
            countIncome:0,
            countExpense: 0 
        }
    )

const [loading,setLoading] = useState(true)
const [error,setError] = useState("")

const [currentTime, setCurrentTime] = useState<number | null>(null);

useEffect(() => {
    // Menghitung waktu hanya di sisi client
    // setCurrentTime(Date.now());
  }, []);

    useEffect(()=>{
            const controller = new AbortController();
        async function fetchDataCategory(){
            try {
                setLoading(true)
                setError("")
                const params = new URLSearchParams({ type: filterType })
                
                const response = await fetch(`/api/categories?${params.toString()}`)

                const result :categoriResponse= await response.json()

                setDataCategori(result.data)  
                setsummary({
                     countData: result.countData,
                     countIncome: result.countIncome,
                     countExpense: result.countexpense,
                })   
          
               
            } catch (error) {
                 if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan"
        );
                
            }finally{
if (!controller.signal.aborted) {
          setLoading(false);
        }
            }
        }
        fetchDataCategory()
    },[filterType])
    

    // console.log(dataCategori)
    const categori = [
        {id:1,namaKategori:"gaji",type:"pemasukan",jumlahTransaksi:1},
        {id:2,namaKategori:"investasi",type:"pemasukan",jumlahTransaksi:3},
        {id:3,namaKategori:"makananan",type:"pengeluaran",jumlahTransaksi:6},
        {id:4,namaKategori:"transfortasi",type:"pengeluaran",jumlahTransaksi:1},
        {id:5,namaKategori:"transfortasi",type:"pengeluaran",jumlahTransaksi:4},
    ]

    const filterPemasukan = categori.filter((item)=>item.type === "pemasukan").length
    const filterPengeluaran = categori.filter((item)=>item.type==="pengeluaran").length

    return(
        <div className="flex flex-col gap-5">
                
        <div className="flex gap-4">
          <div  className="items-center py-5 dark:text-white text-primary/80  flex gap-6 rounded-xl bg-primary-light px-5  shadow shadow-primary/15 transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/5 dark:bg-gradient-to-br dark:from-[#252741] dark:via-[#202238] dark:to-[#191b2a] dark:shadow-black/20">
           <MoveUp className="w-15 h-15 text-green-300 font-bold bg-green-900/80  dark:bg-green-500/20 rounded-full p-4"/>
           <div>
            <p className=" text-[20px]">Ketegori pemasukan</p>
            <h3 className="text-gray-600 dark:text-white font-semibold">{filterPemasukan} kategori</h3>
           </div>
        </div>
        {/* pengeluaran */}
                <div  className="items-center py-5 dark:text-white text-primary/80  flex gap-6 rounded-xl bg-primary-light px-5  shadow shadow-primary/15 transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/5 dark:bg-gradient-to-br dark:from-[#252741] dark:via-[#202238] dark:to-[#191b2a] dark:shadow-black/20">
           <MoveDown className="w-15 h-15 text-red-300 font-bold bg-red-900/80  dark:bg-red-500/20 rounded-full p-4"/>
           <div>
            <p className=" text-[20px]">Ketegori Peneluaran</p>
            <h3 className="text-gray-600 dark:text-white font-semibold">{filterPengeluaran} kategori</h3>
           </div>
        </div>
        {/* end pengeluaran */}
                
            </div>
            <div>
            <h2 className="text-primary-dark text-2xl mb-5 font-bold dark:text-indigo-300">Daftar Kategori</h2>
            <div  className="flex justify-between gap-4">
                    <Cart/>
                    <Cart/>
                    <Cart/>
                    <Cart/>
                </div>
            </div >
        </div>
    )
}