import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Folder, Plus } from "lucide-react";
import Link from "next/link";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 font-bold tracking-widest text-xs uppercase">
              <Folder className="w-4 h-4" />
              Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              My Portfolios
            </h1>
            <p className="text-slate-400 font-medium">
              Manage and export your generated case studies.
            </p>
          </div>
          
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-full font-bold hover:bg-emerald-400 transition-all group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Create New
          </Link>
        </div>

        <DashboardClient />
      </div>
    </main>
  );
}
