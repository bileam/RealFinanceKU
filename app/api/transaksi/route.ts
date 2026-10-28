import { getAuthenticatedUser } from "@/lib/Auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
        const idUser = await getAuthenticatedUser()
        const type = request.nextUrl.searchParams.get("type")
        const categoryId = request.nextUrl.searchParams.get("categoryId")
        const startDate = request.nextUrl.searchParams.get("startDate")
        const endDate = request.nextUrl.searchParams.get("endDate")
        const page = Number(
            request.nextUrl.searchParams.get("page") ?? 1
        )
        const limit = Number(
            request.nextUrl.searchParams.get("limit")
        )
        if(!idUser){
            return NextResponse.json({
                success: false,
                message: "anda tidak memiliki user id"
            },
        {
            status:400
        })}

          if(!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1){
            return NextResponse.json({
                success: false,
                message:"page dan limit harus berupa bilangan bulat positif"
            },{
                status:400
            })}

            if(limit> 100){
                return NextResponse.json({
                    success: false,
                    message:"limit maksimal adalah 100"
                },{
                    status:400
                })
            }
            if(type && !["income", "expense"].includes(type)){
                return NextResponse.json({
                    success: false,
                    message:"tipe harus income atau expense"
                },{
                    status:400
                })
            }

            if(categoryId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryId)){
                return NextResponse.json({
                    success: false,
                    message:"categoryId tidak valid"
                },{
                    status:400
                })
            }

            const isValidDate = (value: string) =>
                /^\d{4}-\d{2}-\d{2}$/.test(value) &&
                !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
                new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value

            if((startDate && !isValidDate(startDate)) || (endDate && !isValidDate(endDate))){
                return NextResponse.json({
                    success: false,
                    message:"format tanggal harus YYYY-MM-DD"
                },{
                    status:400
                })
            }

            if(startDate && endDate && startDate > endDate){
                return NextResponse.json({
                    success: false,
                    message:"tanggal mulai tidak boleh melewati tanggal akhir"
                },{
                    status:400
                })
            }

            const where = {
                userId: idUser.id,
                ...(type ? { type } : {}),
                ...(categoryId ? { categoryId } : {}),
                ...(startDate || endDate
                    ? {
                        transactionDate: {
                            ...(startDate ? { gte: new Date(`${startDate}T00:00:00.000Z`) } : {}),
                            ...(endDate ? { lte: new Date(`${endDate}T00:00:00.000Z`) } : {}),
                        },
                    }
                    : {}),
            }
     // TAMBAHAN 4: Menghitung jumlah data yang dilewati.
    // Halaman 1: skip = 0
    // Halaman 2: skip = 5 jika limit = 5
    // Halaman 3: skip = 10 jika limit = 5
    const skip  = (page - 1) * limit

    const transactions = await prisma.transaction.findMany({
            where,
         select:{
            id:true,
            userId : true,
            type:true,
            amount:true,
            description:true,
            transactionDate:true,
            status:true,
            createdAt:true,
            updatedAt:true,
            user:{
    select:{
        name:true
    }
            },
            category:{
                select:{
                    id:true,
                    name:true,
                    type:true
                }
            }
         },
         orderBy: [
            { transactionDate: "desc" },
            { createdAt: "desc" },
         ],
         skip,
         take: limit
        })

 // TAMBAHAN 7: Menghitung total seluruh transaksi milik user.
    // Count tidak terpengaruh oleh skip dan take.
      const totalData = await prisma.transaction.count({
        where
      })

     const totalPages = Math.ceil(totalData / limit);

        return NextResponse.json({
            success:true,
            count:transactions.length,
            data:transactions,
            pagination:{
                currentpage : page,
                limit :  limit,
                totalData : totalData,
                totalPage : totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            }
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
   const authUser = await getAuthenticatedUser()
    const body = await request.json()
    const {categoryId,type,amount,description,transactionDate,status} = body
    // console.log(userId)

    if(!authUser){
        return NextResponse.json({
            success:false,
            messega:"silakan login terlebih dahulu"
        },{status:401})
    }

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
        userId:authUser.id,
        categoryId,
        type,amount,
        description,
        transactionDate:new Date(transactionDate),
        status:
            typeof status === "string" &&
            status.trim() &&
            status.trim().toLowerCase() !== "berhasil"
                ? status.trim().toLowerCase()
                : "success"
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