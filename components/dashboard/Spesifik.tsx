import { MoveDown, MoveUp, Wallet } from "lucide-react"

export default function Spesifik(){
    const items = [
        {
            judul:"Total Pemasukan",icon:<MoveUp className="text-green-600"/>,color:"bg-green-600/20", colortext:"green-600",total:"Rp. 5.200.000",persen:"20%"
        
        },
        {    judul:"Total Pengeluaran",icon:<MoveDown className="text-red-600"/>,color:"bg-red-600/20",colortext:"red-600",total:"Rp. 3.180.000",persen:"10%"},
        {   
            judul:"Saldo Saat ini",icon:<Wallet className="text-sky-600"/>,color:"bg-sky-600/20",colortext:"sky-600",total:"Rp. 2.060.000",persen:"13%"}
    ]
return(
    <div className="py-6 gap-6 grid grid-cols-3">
        {
            items.map((item,index)=>(
 <div key={index} className={`py-2 flex gap-3  shadow  shadow-${item.colortext} rounded-lg items-center px-5`}>
 
  <div className={`p-2 h-10 rounded-full  ${item.color}`}>{item.icon}</div>
 <div className="flex flex-col gap-2">
    <p className="text-gray-400">{item.judul}</p>
    <h2 className="text-2xl font-bold">{item.total}</h2>
    <div className="flex gap-2">
        <p className="text-gray-400"><span className={`text-${item.colortext}`}>{item.persen}</span>  dari tahun lalu</p>
    </div>
</div>
        </div>
            ))
        }
       
       
      
    </div>
)
}