import { BadgeDollarSign } from "lucide-react";
import Link from "next/link";

export default function login(){
    return(
        <div className="w-full h-screen md:flex">
  
    <div  className="md:w-[40%] relative bg-primary justify-center p-6 text-white flex flex-col items-center ">
      <div className="flex gap-2 items-center  w-135 mt-5">
           <BadgeDollarSign className="w-20 h-20 text-sky-400"/>
            <div className="">
                <h2 className="-mb-1 text-5xl" >Finance<span className="font-sans text-5xl">Ku</span></h2>
                <span className="inline-block text-[15px] text-gray-300 dark:text-slate-400">personal finance manajement</span>
            </div>
      </div>
      <div className=" mt-5 text-5xl w-130 text-white font-bold">    
          <h2>Mulai Mengelola Keuangan Pribadi anda</h2>
      </div>
      <p className="w-130 mt-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo placeat nulla corrupti sapiente eveniet excepturi consectetur, voluptas esse molestiae eligendi?</p>
     {/* glow */}
      <div className="h-50 w-50 bg-primary-light/10  rounded-full absolute -bottom-10 -right-10 "></div>
      <div className="h-50 w-50 bg-primary-light/10  rounded-full absolute -top-10 -left-10 "></div>
      <div className="h-40 w-40 bg-primary-light/5  rounded-full absolute top-15 left-15 "></div>
     
    </div>
    <div className="flex-1 flex flex-col space-y-10 bg-primary-light  p-6 justify-center items-center ">
<div className="w-120   gap-6 flex flex-col px-6 py-6 rounded-xl  shadow-primary">
<div className="flex flex-col items-center ">
        <BadgeDollarSign className="w-20 h-20 bg-primary/90 rounded-xl p-4 text-sky-400"/>
        <h1 className="text-[30px] font-semibold">Selamat Datang Kembali</h1>
        <p>Masuk ke akun financeku</p>
        </div>
        <form className="flex flex-col gap-5" action="">
            <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="font-semibold text-[16px]">Email</label>
                <input className="w-full rounded-2xl   py-3 px-4" type="text" name="" id="" placeholder="Masukkan email anda" />
            </div>
            <div className="flex flex-col gap-2  w-full ">
                <label className="font-semibold text-[16px]" htmlFor="">Password</label>
                <input className="w-full rounded-2xl   py-3 px-4" type="Password" name="" id="" placeholder="Masukkan password anda" />
            </div>
            <div className="flex justify-center">
<button className="px-4 py-3 bg-primary w-full rounded-xl text-white hover:cursor-pointer hover:brightness-120">Masuk</button>
            </div>
        </form>
        <div className="flex flex-col items-center">

            <span className="text-[15px]">belum punya akun <Link href="#" className="text-primary">Daftar sekarang</Link></span>
       
        </div>
</div>
        
    </div>
  </div>
    )
}