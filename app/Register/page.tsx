import AuthScreen from "@/components/auth/AuthScreen";
import { BadgeDollarSign } from "lucide-react";

export default function RegisterPage() {
  // return <AuthScreen mode="register" />;
return(
  <div className="w-full h-screen md:flex">
  
    <div className="md:w-[40%] bg-primary justify-center p-6 text-white flex flex-col items-center ">
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

    </div>
    <div className="flex-1  p-6">ini adalah content</div>
  </div>
)
}
