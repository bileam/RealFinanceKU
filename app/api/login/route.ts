
import { NextRequest, NextResponse } from "next/server";
import { success, z } from "zod";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";


const COOKIE_NAME = "finance_session";

// Menentukan berapa lama session berlaku, yaitu 7 hari.
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// Membuat aturan validasi untuk data login. zod
const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1, "Password wajib diisi"),
});

// function untuk hashedToken, membuat bash sha-256 dari token session
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request:NextRequest){
    try {
         let body :unknown
         try {
            body = await request.json()
         } catch {
            return NextResponse.json({
                success: false,
                message:"format json tidak valid"
            },{status:400})
         }

        // validasi  body menggunakan zod
        const validation =  loginSchema.safeParse(body)


        // hentikan jika tidak valid
        if(!validation.success){
        return NextResponse.json({
        success: false,
        message: "Login tidak valid",
        errors: validation.error.flatten().fieldErrors,  
        },{status:400})
        }


        // mengambil password dan email yang sudah lolos validasi
        const {email,password} = validation.data
        

        // mencari user yang sesuai dengan email di database
        const User = await prisma.user.findUnique({
            where:{
                email
            }
        })

        // menolak email jika tidak ditemukan
        if(!User){
            return NextResponse.json({
                success:false,
                message: "email anda tidak ditemukan"
            },{status:401})
        }

        // membandingkan password yang dikrim dengan yang ada di database

        const passwordValid  = await bcrypt.compare(
            password,
            User.password
        )

        // jika passwordnya tidak sesuai maka kembali
        if(!passwordValid){
            return NextResponse.json({
                success:false,
                message:"password anda salah"
            },{status:401})
        }


        // membuat token session  acak sepanjang 32 byte, nnti token asly akan kita hash
        const sessionToken =  randomBytes(31).toString("hex")

        // menghitung kadaluarsa session
          const expiresAt = new Date(
      Date.now() + SESSION_DURATION_MS
    ); 

    await prisma.session.create({
        data:{
            tokenHash:hashToken(sessionToken),
            userId:User.id,
            expiresAt
        }
    })


    // Membuat respons sukses yang hanya berisi informasi user aman.
    // Password dan token session tidak dimasukkan ke dalam JSON.
    const response = NextResponse.json(
      {
        success: true,
        message: "Login berhasil",
        data: {
          id: User.id,
          name: User.name,
          email: User.email,
          avatar: User.avatar,
        },
      },
      { status: 200 }
    );


       // Mengirim token session melalui cookie.
    // HttpOnly mencegah JavaScript browser membaca cookie langsung.
    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,

      // Cookie hanya dikirim melalui HTTPS di production.
      secure: process.env.NODE_ENV === "production",

      // Mengurangi risiko cookie dikirim pada navigasi lintas situs.
      sameSite: "lax",

      // Cookie berlaku untuk seluruh path aplikasi.
      path: "/",

      // Browser menghapus cookie saat waktu kedaluwarsa tercapai.
      expires: expiresAt,
    });

    // Mengembalikan respons beserta Set-Cookie kepada browser.
    return response;


        } catch (error) {
         // Mencatat error di terminal server untuk keperluan debugging.
    console.error("Login API error:", error);

    // Tidak mengirim detail error internal kepada client.
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
    }
