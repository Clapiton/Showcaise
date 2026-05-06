"use client"

import { useActionState } from "react";
import { authenticate } from "@/app/auth/actions";
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b98110,transparent_50%)] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md space-y-8 relative"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            Welcome back to Showcaise
          </div>
          <h1 className="text-4xl font-black tracking-tight">Login to your <span className="text-emerald-500">Studio.</span></h1>
          <p className="text-slate-400 font-medium">Enter your credentials to manage your masterpieces.</p>
        </div>

        <form action={dispatch} className="space-y-4">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                minLength={6}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl p-3 text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full group bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all duration-300 disabled:opacity-50"
          >
            {isPending ? "Authenticating..." : "Login to Studio"}
            {!isPending && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="text-center space-y-4">
          <p className="text-slate-500 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
              Create one for free
            </Link>
          </p>
          
          <div className="pt-4 text-[10px] uppercase tracking-widest text-slate-700 font-bold">
            Demo: user@example.com / password123
          </div>
        </div>
      </motion.div>
    </main>
  );
}
