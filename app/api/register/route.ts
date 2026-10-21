import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const body:unknown = await request.json()
        console.log(body)
    } catch (error) {
     console.error("terjadi kesalahan pada server",error)
return NextResponse.json({
    success:false,
    massage: "terjadi kesalahan saat mengambil data"
    
     },{status:500})
    }
}