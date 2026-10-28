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


export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Silakan login terlebih dahulu",
        },
        { status: 401 },
      );
    }
    const body = await req.json();
    const { name, type, icon, color } = body;
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof type !== "string" ||
      !["income", "expense"].includes(type)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama atau jenis kategori tidak valid",
        },
        { status: 400 },
      );
    }
    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        type,
        icon,
        color,
        userId: user.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Kategori berhasil ditambahkan",
        category,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Gagal menambahkan kategori:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 },
    );
  }
}