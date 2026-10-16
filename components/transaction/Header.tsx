import { Plus } from "lucide-react"

export default function Header(){
    return(
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h2 className="text-primary-dark text-4xl font-semibold">Transaksi</h2>
            <p className="text-gray-600 text-md">Kelola semua transaksi keuanganmu di sini</p>
          </div>
          <button className="flex active:scale-110 shadow items-center py-2 px-4 cursor-pointer hover:brightness-125 transition-all duration-500 bg-primary text-primary-light gap-2  text-sm rounded-full"><Plus className="w-4 h-4"/><span>Tambahkan Transaksi</span></button>
          
        </div>
    )
}  