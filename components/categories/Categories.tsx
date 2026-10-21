"use client"
import { useEffect, useState } from "react";
import Cart from "../Cart";



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

    const idUser = "de2ce9d4-a628-46a2-9784-48710c51f46f"
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


    useEffect(()=>{
            const controller = new AbortController();
        async function fetchDataCategory(){
            try {
                setLoading(true)
                setError("")

                
                const params = new URLSearchParams({
                    idUser,type:filterType
                })
                
                const response = await fetch(`http://localhost:3000/api/categories?${params.toString()}`)

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
    },[idUser,filterType])
    

    console.log(dataCategori)
    return(
        <div className="flex flex-col gap-5">
            <div className="flex gap-4">
                <Cart/>
                <Cart/>
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