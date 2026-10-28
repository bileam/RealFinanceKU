"use client";

import { Bell, ChevronDown, MoonStar, Search, Sun, UserPen } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Clock from "./Clock";

const THEME_STORAGE_KEY = "financeku-theme";

type profile = {
  id: string,
  name: string,
email:string,
avatar:string | null

}

type responseProfile = {
  success:boolean,
  message:string,
  data?:profile
}

export default function Topbar() {

  const [dataprofile,setProfile] = useState<profile | null>(null)
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
async function fetchProfile(){
  try {
    setLoading(true)
    const response = await fetch("/api/me")
    const result :responseProfile = await response.json()
    if(!response.ok || !result.success || !result.data){
      toast.error(result.message || "gagal mengambil data profile")
      return
    }
    setProfile(result.data)
  } catch (error) {
    console.error("gagal mengambil data profile",error)
    toast.error("Terjadi kesalahan saat mengambil data profile")
    
  }finally{
setLoading(false)
  }
}
fetchProfile()
  },[])
  useEffect(() => {
    const dark = localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? "dark" : "light");
  }

  

  return (
    <div className="flex w-full justify-between">
      <div className="relative items-center">
        {/* <input
          type="search"
          className="w-100 rounded-lg bg-primary-dark/10 px-14 py-2 text-primary-dark outline-none placeholder:text-primary-dark dark:bg-white/10 dark:text-slate-100 dark:placeholder:text-slate-300"
          placeholder="searching..."
        />
        <Search className="absolute left-4 top-2 inline-block text-primary-dark dark:text-slate-200" /> */}
        <Clock/>
      </div>
      <div className="flex items-center justify-center gap-8">
        <Bell className="cursor-pointer text-primary dark:text-indigo-300" />
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Ganti tema"
          className="rounded-full p-2 text-primary transition-colors hover:bg-primary/10 dark:text-indigo-300 dark:hover:bg-white/10"
        >
          <MoonStar className="dark:hidden" aria-hidden="true" />
          <Sun className="hidden dark:block" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-4">
          <UserPen className="h-10 w-10 rounded-full cursor-pointer bg-primary p-2 text-white" />
          <button className="flex cursor-pointer text-primary dark:text-indigo-300">
            <span>{dataprofile?.name.toUpperCase()}</span>
            <ChevronDown className="text-primary dark:text-indigo-300" />
          </button>
        </div>
      </div>
    </div>
  );
}