
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/Auth";

export async function GET(request:NextRequest){
  try {
    //  const iduser = await request.nextUrl.searchParams.get("idUser")
    const type = await request.nextUrl.searchParams.get("type") ?? "all"

    const AuthUser = await getAuthenticatedUser()


    if(!AuthUser){
      return NextResponse.json({
        success:false,
        message:"silakan anda login terlebih dahulu"
      },{
        status:400
      })
    }

    if(!["all","income","expense"].includes(type)){
      return NextResponse.json({
        success: false,
        message:"filter categori tidak sesuai"
      },{status:400})
    }
    const response = await prisma.category.findMany({
      where:{
      userId : AuthUser.id
      },
      select:{
        id:true,
        name:true,
        type:true,
        createdAt:true,
        updatedAt:true
      }
    })


const totalIncome = response.filter((item)=>item.type === "income").length
const totalexpense = response.filter((item)=>item.type === "expense").length


const filterData = type === 'all'?response:response.filter((item)=>item.type === type)


   return NextResponse.json({
      success:true,
      countData : response.length,
      countIncome: totalIncome,
      countexpense : totalexpense,
      data:filterData
    }) 
  } catch (error) {
    console.error("terjadi masalah pada server",error)
   return NextResponse.json({
      success:false,
      message:"gagal mengambil data"
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