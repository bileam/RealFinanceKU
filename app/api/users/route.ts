import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response = await prisma.user.findMany({
            select:{
                name:true,
                email:true
            },orderBy:{
                name:"desc"
            }
        })

        return NextResponse.json({
            success:true,
            count:response.length,
            data:response
        })
    } catch (error) {
        console.error("terjadi kesalahan pada server",error)
        NextResponse.json({
            success:false,
            message:"data tidak dapat diambil"
        },{status:400})
    }
}


export async function POST(request:NextResponse){
try {
    const body = await request.json()
    const {name,email,password,avatar} = body
    console.log("data anda adalah")
    
    if(!name || !email || !password ){
        return NextResponse.json({
            success:false,
            message: "semua data harus diisi"

        },{status:400})
    } 


   const  UserBody = await prisma.user.create(
        {
            data:{
                name,
                email,
                password,
                avatar: avatar  || null
            }
        }
    )
   return NextResponse.json({
    success:true,
    data:UserBody
   })
} catch (error) {
 console.error("terjadi kesalahan pada sisi server",error)
 return NextResponse.json({
    success: false,
    message:"terjadi kesalahan saat mengambil data anda"
 },{status:500})   
}
}
