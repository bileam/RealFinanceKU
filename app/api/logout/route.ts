import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// analisiasi nama cookie yang sama digunakan login
const COOKIE_NAME = "finance_session";

// mengubah token asli menjadi hash-256
function hashToken(token:string):string{
    return createHash("sha256").update(token).digest("hex")
}


export async function POST(){
    try {
        // mengambil cookie dari request
        const cookie = await cookies()

       // membaca token session dari cookie
       const token =  cookie.get(COOKIE_NAME)?.value

    const response = NextResponse.json({
        success: true,
        message:"cookie berhasil di hapus"
    },{status:200})
    
       //    menghapus cookie agar tidak digunakan lagi
    response.cookies.set({
name:COOKIE_NAME,
value:"",
httpOnly:true,
secure:process.env.NODE_ENV == "production",
sameSite:"lax",
path:"/",
expires:new Date(0)
    })

    // jika tidak ada cookie
    if(!token){
        return response
    }


    // hash token untuk mencocokannya di database
    const tokenHash = await hashToken(token)

    // hapus token yang sesuai dengan yang ada didatabase
    await prisma.session.deleteMany({
        where:{tokenHash}
    })
    return response
    } catch (error) {
        console.error("logout api eror",error)
        return NextResponse.json({
            success:false,
            message:"terjadi kesalahan pada server"
        },{status:500})
        
    }
}
