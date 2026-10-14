import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const idUser = request.nextUrl.searchParams.get("idUser")
      
        if(!idUser){
            return NextResponse.json({
                success: false,
                message: "anda tidak memiliki user id"
            },
        {
            status:400
        })

        }
        const transactions = await prisma.transaction.findMany({
         where:{
            userId:idUser
         },orderBy:{
           transactionDate:"asc"}
        })
        return NextResponse.json({
            success:true,
            count:transactions.length,
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

export async function POST(request:NextRequest){
try {
    const body = await request.json()
    const {userId,categoryId,type,amount,description,transactionDate,status} = body
    // console.log(userId)

    // validasi inputan
    if (!amount) {
  return NextResponse.json({
    success: false,
    message: "amount anda kosong"
  }, {
    status: 400
  });
}
if (
  amount === undefined ||
  amount === null ||
  amount === "" ||
  Number(amount) <= 0
) {
  return NextResponse.json(
    {
      success: false,
      message: "Amount harus lebih besar dari 0"
    },
    { status: 400 }
  );
}

    if(!["income","expense"].includes(type)){
        return NextResponse.json({
            success : false,message:"tipe anda kurang tepat"
        },{
            status:400
        })
    }

const DataTransaction = await prisma.transaction.create({
    data:{
        userId,
        categoryId,
        type,amount,
        description,

        transactionDate:new Date(transactionDate),
        status
    }
})
    return NextResponse.json({
        success:true,
        message: "data berhasil di tambahkan",
        data: DataTransaction
    })
} catch (error) {
    console.error("terjadi kesalah pada server",error)
    return NextResponse.json({
        success: false
        ,message: "terjadi kesalah pada server"
    },{
        status:501
    })
    
}
}