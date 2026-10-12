import { Bell, ChevronDown, MoonStar, Search, UserPen } from "lucide-react"

const Topbar =()=>{
    return(
        <div className="flex justify-between w-full">
            <div className="relative items-center">
                <input type="search" className="w-100 outline-none text-primary-dark placeholder:text-primary-dark bg-primary-dark/10 rounded-lg py-2 px-14" placeholder="searching..." />
                <Search className="absolute inline-block top-2 left-4 text-primary-dark"/>
            </div>
            <div className="flex items-center justify-center gap-8">
                <Bell className="text-primary cursor-pointer"/>
                <MoonStar className="text-primary cursor-pointer"/>
                <div className="flex items-center gap-4">
                    <UserPen className="p-2 w-10 h-10 border rounded-full bg-primary text-white"/>
                    <button className="flex  text-primary cursor-pointer"><span>Bileam mangalla</span> <ChevronDown className="text-primary"/></button>

                </div>
            </div>
        </div>
    )
}
export default Topbar