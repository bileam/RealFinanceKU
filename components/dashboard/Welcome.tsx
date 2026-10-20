import {  MoveRight, Plus } from "lucide-react";

export default function Welcome(){
    return(
        <div className="relative space-y-2 overflow-hidden rounded-2xl border border-primary-dark/10 bg-primary px-6 py-6 text-white shadow-sm shadow-primary/20 transition-colors duration-300 dark:border-indigo-300/10 dark:bg-gradient-to-br dark:from-indigo-950 dark:via-[#242044] dark:to-slate-900 dark:shadow-black/20">
     <div className="flex justify-between items-center">
        <div><h2 className="text-5xl z-10 brightness-125">Hallo, Bileam</h2>
           <p className="z-10 text-lg text-gray-300 dark:text-slate-300">Kelola Kuanganmu dengan lebih baik di sini</p></div>
    <button className="z-10 flex cursor-pointer items-center gap-2 rounded-full bg-primary-light/60 px-4 py-2 text-primary transition-all duration-500 hover:translate-y-2 hover:gap-4 hover:brightness-110 dark:bg-white/10 dark:text-indigo-100 dark:hover:bg-white/15">
            <span>Lihat ringkasan</span> 
            <MoveRight/>
            </button>
     </div>     
          {/*glow  */}
       <div className="w-30 rounded-full h-30 bg-primary-light/20 absolute -bottom-5 -left-10"></div>
       <div className="w-30 rounded-full h-30 bg-primary-light/20 absolute z-10 -bottom-12 left-40"></div>
       <div className="w-50 rounded-full z-2  h-50 bg-primary-light/20 absolute -bottom-12 left-50"></div>
       <div className="w-50 rounded-full h-50 border   border-primary-light/20 absolute -bottom-12 left-70"></div>
        <div className="w-50 rounded-full z-4  h-50 bg-primary-light/10 absolute -bottom-7 -right-6 "></div>
        <div className="w-50 rounded-full z-2  h-50 border border-primary-light/20 absolute -bottom-10 right-12"></div>
        <div className="w-30 rounded-full z-0  h-30  bg-primary-light/20 absolute -bottom-10 right-22"></div>
        <div className="w-30 rounded-full z-0  h-30  bg-primary-light/5 absolute -top-10 right-[40%]"></div>
        <div className="w-30 rounded-full z-0  h-30  bg-primary-light/5 absolute top-10 right-[30%]"></div>
        </div>
    )
}