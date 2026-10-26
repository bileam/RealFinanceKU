import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";


const   COOKIE_NAME = "finance_session"

// mengubah token menjadi hash agar cocok dengan hash di database
function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

//memeriksa apakah user login dengan token yang valid
export async function getAuthenticatedUser(){
//Mengambil cookie dari request yang sedang diproses.
  const cookieStore = await cookies();
//Membaca token session dari cookie.
  const token = cookieStore.get(COOKIE_NAME)?.value;
//jika cookie tidak ada
  if(!token){
    return null
  }
//hash token yang telah diambil dari cookie
const tokenHash = hashToken(token)
//mencari session berdasarkan token 
const session = await prisma.session.findUnique({
    where:{
        tokenHash 
    },include:{
        user:true
    }
})
// jika session tidak ada kembalikan 
if(!session){
    return null
}
// jika session sudah kadaluarsa, hapus dari database
if(session.expiresAt.getTime() <= Date.now()){
await prisma.session.delete({
    where:{
        id:session.id
    }
})
return null
}
return {
    id:session.user.id,
    name:session.user.name,
    email:session.user.email,
    avatar:session.user.avatar
}
}