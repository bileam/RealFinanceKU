
"use client";

import {
  ArrowLeftRight,
  BadgeDollarSign,
  ChartColumnStacked,
  LayoutDashboard,
  LogOut,
  Settings,
  SquareChartGantt,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    {
      icon: <LayoutDashboard />,
      namaPath: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <ArrowLeftRight />,
      namaPath: "Transaction",
      path: "/dashboard/transaction",
    },
    {
      icon: <ChartColumnStacked />,
      namaPath: "Categories",
      path: "/dashboard/categories",
    },
    {
      icon: <SquareChartGantt />,
      namaPath: "Plan",
      path: "/dashboard/plan",
    },
    {
      icon: <Settings />,
      namaPath: "Pengaturan",
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="relative flex h-full flex-col justify-between px-4">
      <div className="flex flex-col gap-20 z-20 relative">
        <div className="flex gap-1 items-center justify-center mt-2">
            <BadgeDollarSign className="w-10 text-sky-400"/>
            <div className="">
                <h2 className="-mb-3 text-2xl" >Finance<span className="font-sans text-2xl">Ku</span></h2>
                <span className="inline-block text-[10px] text-gray-300 dark:text-slate-400">personal finance manajement</span>
            </div>
        </div>
        <div className="flex flex-col gap-6 relative">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
             className={`flex gap-6 rounded-lg px-6 py-3 transition-colors duration-300 ${
        isActive
          ? "bg-[#F0EEFF]/20 text-white shadow-sm shadow-indigo-950/10 dark:bg-indigo-400/15 dark:text-indigo-100"
          : "text-white/80 hover:bg-[#F0EEFF]/10 hover:text-white dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
      }`}
              >
                {item.icon}
                <span>{item.namaPath}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <button className="z-20 mb-5 flex cursor-pointer gap-5 rounded-lg px-6 py-3 text-gray-200 transition-all duration-200 hover:bg-[#F0EEFF]/20 hover:text-white dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white">
        <LogOut />
        <span>Logout</span>
      </button>

{/* glo */}
      <div className="absolute z-0 h-50 w-50 rounded-full bg-primary-light/5 -top-15 -left-30"></div>
      <div className="absolute z-0 h-10 w-10 rounded-full bg-primary-light/5 top-15 left-30"></div>
      <div className="absolute z-0 h-10 w-10 rounded-full bg-primary-light/5 top-20 left-30"></div>
  <div className="absolute z-0 h-50 w-50 rounded-full bg-primary-light/10 -bottom-10 -right-25"></div>
  <div className="absolute z-0 h-50 w-50 rounded-full border border-primary-light/10 -bottom-10 -right-10 "></div>
  <div className="absolute z-0 h-20 w-20 rounded-full bg-primary-light/10 bottom-50 -left-15"></div>
  <div className="absolute z-0 h-20 w-20 rounded-full border border-primary-light/10 bottom-40 -left-15"></div>
    </div>
  );
}
