"use client";

import { Bell, ChevronDown, MoonStar, Search, Sun, UserPen } from "lucide-react";
import { useEffect } from "react";

const THEME_STORAGE_KEY = "financeku-theme";

export default function Topbar() {
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
        <input
          type="search"
          className="w-100 rounded-lg bg-primary-dark/10 px-14 py-2 text-primary-dark outline-none placeholder:text-primary-dark dark:bg-white/10 dark:text-slate-100 dark:placeholder:text-slate-300"
          placeholder="searching..."
        />
        <Search className="absolute left-4 top-2 inline-block text-primary-dark dark:text-slate-200" />
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
          <UserPen className="h-10 w-10 rounded-full border bg-primary p-2 text-white" />
          <button className="flex cursor-pointer text-primary dark:text-indigo-300">
            <span>Bileam mangalla</span>
            <ChevronDown className="text-primary dark:text-indigo-300" />
          </button>
        </div>
      </div>
    </div>
  );
}