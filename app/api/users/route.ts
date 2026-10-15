import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function Get(request:NextRequest){
    try {
        const UserId = request.nextUrl.searchParams.get("UserId")
        if(!UserId){
            return NextResponse.json({
              success: false,
               message: "anda tidak memiliki user id"
            },{
                status:400
            })
        }
        const users = await prisma.user.findMany({
            where:{
                id:UserId
            },orderBy:{
                name:"asc"
            }
        })
        console.log(users)
        // return NextResponse.json({
        //     success : true,
        //     jumlahData : users.length,
        //     data : users
        // })
    } catch (error) {
        console.error("kesalahan dari pihak server",error)
        return NextResponse.json({
            success: false,
            message:"data tidak dapat diambil"
        },
        {status:500}
    )
    }
}