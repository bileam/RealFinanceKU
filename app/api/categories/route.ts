
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(){
  try {
    const response = await prisma.category.findMany({
    select:{
      id:true,
      name:true,
      type:true,
      icon:true,
      color:true,
      createdAt:true,
      updatedAt:true
    }
    })

    return NextResponse.json({
      success: true,
      count: response.length,
      data : response
    })
  } catch (error) {
    console.error("terjadi eror pada server",error)
    NextResponse.json({
      success:false,
      message:"tidak tidak berhasil diambil"
    },{status:400})
  }
}




export async function POST(request:NextRequest){
try {
    const body = await request.json()
    const {name,type,icon,color} = body
    
    if(!name || !type){
        return NextResponse.json({
            success : false,
            message:"nama dan tipe categori wajib di isi"
        },{status:400})
    }
    
    if(!["income","expense"].includes(type)){
        return NextResponse.json(
            { success: false, message: "Tipe harus income atau expense" },
            { status: 400 }
          );
    }
    
    const  categories = await prisma.category.create(
        {
            data:{
                name,
                type,
                icon: icon || null,
                color: color || null
            }
        }
    )
    return NextResponse.json(
        { success: true, data: categories },
        { status: 201 }
      );

} catch (error) {
    console.error("Gagal menambahkan kategori:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menambahkan kategori" },
      { status: 500 }
    );   
}
}