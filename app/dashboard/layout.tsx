import { Suspense } from "react";
import { redirect } from "next/navigation";
// import { getAuthenticatedUser } from "@/lib/auth";

import Sidebar from "@/components/Layout/Sidebar";
import Topbar from "@/components/Layout/Topbar";
import { getAuthenticatedUser } from "@/lib/Auth";
import { connection } from "next/server";

// Komponen ini memeriksa autentikasi di server.
async function ProtectedContent({
  children,
}: {
  children: React.ReactNode;
}) {
      await connection();
      const user = await getAuthenticatedUser();

     if (!user) {
       redirect("/Login");
     }
 
  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          Memeriksa sesi...
        </div>
      }
    >
      <ProtectedContent>
        <div className="flex h-screen w-full overflow-hidden font-heading transition-colors duration-200">
          <aside className="hidden w-80 rounded-r-4xl bg-primary overflow-hidden text-white transition-colors duration-200 dark:bg-slate-950 md:block md:px-4 md:py-5">
            <Sidebar />
          </aside>

          <div className="flex flex-col w-full">
            <nav className="w-full bg-primary-light px-8 py-5 transition-colors duration-200 dark:bg-background">
              <Topbar />
            </nav>

            <main className="h-full w-full overflow-hidden overflow-y-auto bg-primary-light px-8 py-5 transition-colors duration-200 dark:bg-background">
              {children}
            </main>
          </div>
        </div>
      </ProtectedContent>
    </Suspense>
  );
}