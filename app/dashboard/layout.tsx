
import Sidebar from "@/components/Layout/Sidebar";
import Topbar from "@/components/Layout/Topbar";


export default function dashboarLayout({children,}:{children: React.ReactNode}){
    return(
     <div className="flex h-screen w-full font-heading">
        <aside className="bg-primary w-80 px-4 py-5 text-white rounded-r-4xl"><Sidebar/></aside>
        <div className="flex flex-col  w-full">
            <nav className=" w-full px-8 py-5 bg-primary-light"><Topbar/></nav>
            <main className=" w-full px-8 py-5 bg-primary-light h-full">{children}</main>
        </div>
     </div>
    )
}