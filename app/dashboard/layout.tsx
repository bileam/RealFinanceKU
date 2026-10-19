
import Sidebar from "@/components/Layout/Sidebar";
import Topbar from "@/components/Layout/Topbar";


export default function dashboarLayout({children,}:{children: React.ReactNode}){
    return(
     <div className="flex h-screen w-full font-heading overflow-hidden">
        <aside className="bg-primary md:block hidden w-80 md:px-4 md:py-5 text-white rounded-r-4xl"><Sidebar/></aside>
        <div className="flex flex-col  w-full">
            <nav className=" w-full px-8 py-5 bg-primary-light"><Topbar/></nav>
            <main className=" w-full px-8 py-5 bg-primary-light h-full overflow-hidden overflow-y-auto">{children}</main>
        </div>
     </div>
    )
}