import { MoveRight, Plus } from "lucide-react";

export default function Welcome(){
    return(
        <div className="border  rounded-2xl px-6 py-6 bg-primary text-white space-y-2 relative overflow-hidden">
  
                   <h2 className="text-5xl z-10 brightness-125">Hallo, Bileam</h2>
           <p className="text-lg text-gray-300 z-10">Kelola Kuanganmu dengan lebih baik di sini</p>
            <button className="flex gap-2 z-10 items-center py-2 px-4 hover:gap-4 transition-all duration-500 hover:translate-y-2 cursor-pointer hover:brightness-110 bg-primary-light rounded-full text-primary">
            <Plus/>
            <span>Lihat ringkasan</span> 
            </button>
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