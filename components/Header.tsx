'use client'
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation";


import { ReactNode } from "react"
type HeaderProps = {
  children : ReactNode;
  keterangan:string,
  // path:string,
  onClick?: () => void;
}

export default function Header({children,keterangan,onClick}:HeaderProps){

    return(
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-primary-dark text-4xl font-semibold dark:text-indigo-300">{children}</h2>
            <p className="text-gray-600 text-md dark:text-slate-300">{keterangan}</p>
          </div>
          <button onClick={onClick}  className="flex active:scale-110 shadow items-center py-2 px-4 cursor-pointer hover:brightness-125 transition-all duration-500 bg-primary text-primary-light gap-2  text-sm rounded-full"><Plus className="w-4 h-4"/><span>{children}</span></button>
          
        </div>
    )
}  