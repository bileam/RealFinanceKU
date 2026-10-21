import { Expand } from "lucide-react"

export default function Cart(){

   
    return(
        <div  className="items-center flex gap-2 rounded-xl bg-primary-light px-5 py-2 shadow shadow-primary/15 transition-all duration-300 hover:-translate-y-1 dark:border dark:border-white/5 dark:bg-gradient-to-br dark:from-[#252741] dark:via-[#202238] dark:to-[#191b2a] dark:shadow-black/20">
           <Expand/>
           <div>
            <p>Ketegori pemasukan</p>
            <h3>3</h3>
           </div>
        </div>
    )
}