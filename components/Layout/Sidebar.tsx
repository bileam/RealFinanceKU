
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
    <div className="flex h-full flex-col justify-between px-4">
      <div className="flex flex-col gap-20">
        <div className="flex gap-1 items-center justify-center mt-2">
            <BadgeDollarSign className="w-10 text-sky-400"/>
            <div className="">
                <h2 className="-mb-3">Finance<span className="font-sans text-2xl">Ku</span></h2>
                <span className="text-[10px] text-gray-300  inline-block">personal finance manajement</span>
            </div>
        </div>

        <div className="flex flex-col gap-6">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
             className={`flex gap-6 duration-300 rounded-lg px-6 py-3 transition-colors ${
        isActive
          ? " bg-[#F0EEFF]/20"
          : "hover:bg-[#F0EEFF]/10 hover:text-white"
      }`}
              >
                {item.icon}
                <span>{item.namaPath}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <button className="mb-5 flex gap-5 px-6 py-3 hover:bg-[#F0EEFF]/20 rounded-lg transition-all duration-200 cursor-pointer text-gray-200 hover:text-white hover:">
        <LogOut />
        <span>Logout</span>
      </button>
    </div>
  );
}
