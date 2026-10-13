import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const transactions = await prisma.transaction.findMany({
         orderBy:{
           transactionDate:"asc"}
        })
        return NextResponse.json({
            success:true,
            data:transactions
        })
    } catch (error) {
        console.error("server sedang bermasalah",error)
        return NextResponse.json({
            success:false,
            message:"gagal mengambil data"
        },{
            status:500
        })
    }
}