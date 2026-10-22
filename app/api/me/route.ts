import { getAuthenticatedUser } from "@/lib/Auth";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        // memerikasa apakah token valid
        const user = await getAuthenticatedUser()
        // jika login tidak valid atau belum login kembalikan
        if(!user){
            return NextResponse.json({
                success:false,
                message:"anda belum login atau session anda telah berakhir"
            },{status:401})
        }
        // jika valid kirim informasi kepada frontend
        return NextResponse.json({
            success: true,
            message:"Berhasil mengambil data user",
            data:user
        },{status:200})
    } catch (error) {
        console.error("terjadi kesalah pada sisi server")
        return NextResponse.json({
            success:false,
            message:"terjadi kesalahan pada server"
        },{status:500})
        
    }
}