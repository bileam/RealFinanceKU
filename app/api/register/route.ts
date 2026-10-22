import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request:NextRequest){
    try {
        const body: unknown = await request.json()
        // validasi body
        if(  typeof body !== "object" ||
      body === null ||
      !("name" in body) ||
      !("email" in body) ||
      !("password" in body) ||
      !("confirmPassword" in body) ||
       !("avatar" in body )
    ){
            return NextResponse.json({
                success:false,
                message:"data register tidak lengkap"
            },{status:400})
        }

const {name,email,password,confirmPassword,avatar} = body
// validasi type data
if(typeof name !== 'string' || typeof email !== "string" || typeof password !=='string'
    || typeof confirmPassword !== 'string' ||(typeof avatar !== 'string' && avatar !== null)
){
    return NextResponse.json({
        success: false,
        message:"data yang anda masukan tidak sesuai dengan type data"
    },{status:400})
}

// menghapus space
const cleanName = name.trim()
const cleanEmail = email.trim()
 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validasi nama
if(cleanName.length < 2 || cleanName.length >100){
    return NextResponse.json({
        success:false,
        message:"nama harus terdiri dari 2-100 karakter"
    },{status:400})
}
       
if(cleanEmail.length  > 100 || !emailPattern.test(cleanEmail)){
    return NextResponse.json({
        succes:false,
        message:"email anda tidak valid"
    },{status:400})
}


// validasi password
if(password.length < 8 || password.length > 72){
    return NextResponse.json({
        message:"password harus terdiri dari 8-72 karakter"
    },{status:400})
}

if(password !== confirmPassword){
    return NextResponse.json({
        success:false,
        message:"konfirmasi password tidak cocok"
    },{status:400})
}

// memeriksa email apakah sudah ada atau belum
const existingUser = await prisma.user.findUnique({
    where:{
        email:cleanEmail
    },select:{id:true}
})

if(existingUser){
    return NextResponse.json({
        success:false,
        message:"email yang anda gunakan sudah terdaftar"
    },{status:409})
}

// hash password
const hashedpassword =  await bcrypt.hash(password,12)
// masukan data kedalam database
const User = await prisma.user.create({
    data:{
        name:cleanName,
        email:cleanEmail,
        password:hashedpassword,
        avatar:avatar
    },select:{
        id:true,
        name:true,
        email:true,
        avatar:true
    }
})
        return NextResponse.json({
            success: true,
            message:"Registrasi berhasil",
            data: User
        },{status:201})

    } catch (error:unknown) {
         if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email sudah terdaftar",
        },
        { status: 409 }
      );
    }

    console.error("Register error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}
