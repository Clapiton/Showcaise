import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Sparkles, LogOut, User, Folder } from "lucide-react";

export default async function Header() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-900 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="font-black text-xl tracking-tight uppercase">Showcaise</span>
        </Link>

        <nav className="flex items-center gap-6">
          {session ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Folder className="w-4 h-4" />
                My Portfolios
              </Link>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-full pl-3 pr-1 py-1">
                <div className="flex items-center gap-2">
                  <User className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-300">{session.user?.name || "User"}</span>
                </div>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    type="submit"
                    className="p-1.5 rounded-full hover:bg-red-500/10 hover:text-red-400 transition-colors group"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
