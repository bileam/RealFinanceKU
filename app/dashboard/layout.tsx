
import Sidebar from "@/components/Layout/Sidebar";
import Topbar from "@/components/Layout/Topbar";


export default function dashboarLayout({children,}:{children: React.ReactNode}){
    return(
     <div className="flex h-screen w-full overflow-hidden font-heading transition-colors duration-200">
        <aside className="hidden w-80 rounded-r-4xl bg-primary text-white transition-colors duration-200 dark:bg-slate-950 md:block md:px-4 md:py-5"><Sidebar/></aside>
        <div className="flex flex-col  w-full">
            <nav className="w-full bg-primary-light px-8 py-5 transition-colors duration-200 dark:bg-background"><Topbar/></nav>
            <main className="h-full w-full overflow-hidden overflow-y-auto bg-primary-light px-8 py-5 transition-colors duration-200 dark:bg-background">{children}</main>
        </div>
     </div>
    )
}