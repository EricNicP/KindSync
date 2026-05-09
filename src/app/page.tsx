"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, Heart, ShieldCheck, Truck, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section - Deep Indigo Background */}
      <section className="relative pt-64 pb-32 lg:pt-80 lg:pb-64 bg-[hsl(var(--bg-hero))]">
        {/* Subtle Background Mesh */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-lg bg-white/5 border border-white/10 mb-12">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[hsl(var(--primary))]">Network Active // MMXXVI</span>
            </div>
            
            <h1 className="text-6xl lg:text-9xl font-black mb-12 leading-[0.9] tracking-tighter uppercase">
              Impact <br />
              <span className="text-[hsl(var(--primary))] italic">Synchronized.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-[hsl(var(--text-dim))] mb-16 leading-relaxed max-w-4xl mx-auto font-medium">
              The unified distribution network for clothes and household essentials. <br />
              Connecting surplus directly to human need with zero friction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/register" className="btn-main btn-main-primary py-6 px-16 text-xl">
                Start Syncing <Zap size={24} />
              </Link>
              <Link href="#about" className="btn-main btn-main-outline py-6 px-16 text-xl">
                Documentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Protocol Section - Midnight Slate Background */}
      <section id="about" className="py-48 bg-[hsl(var(--bg-services))] border-y border-white/5">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
            <div className="max-w-2xl">
              <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-8 leading-none">The <span className="text-[hsl(var(--primary))]">Core</span> <br />Infrastructure</h2>
              <p className="text-xl text-[hsl(var(--text-dim))]">Engineered for high-throughput resource allocation with absolute transparency.</p>
            </div>
            <Link href="/register" className="nav-button !py-4 !px-10">Initialize_Registry</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                desc: "Real-time ledger tracking for every donation unit. 100% auditable lifecycle from origination to distribution.",
                icon: RefreshCw,
                color: "text-[hsl(var(--primary))]"
              },
              {
                title: "Verification",
                desc: "24-point professional audit for all participating NGO nodes. Ensuring maximum social throughput.",
                icon: ShieldCheck,
                color: "text-blue-400"
              },
              {
                title: "Logistics",
                desc: "Advanced route architecture for the efficient collection of high-value inventory from your doorstep.",
                icon: Truck,
                color: "text-purple-400"
              }
            ].map((f, i) => (
              <div key={i} className="feature-card group flex flex-col gap-10">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${f.color} group-hover:bg-[hsl(var(--primary))] group-hover:text-black transition-all duration-500`}>
                  <f.icon size={32} />
                </div>
                <div className="space-y-6">
                  <h3 className="text-3xl font-black uppercase tracking-tight">{f.title}</h3>
                  <p className="text-[hsl(var(--text-dim))] leading-relaxed text-lg font-medium">
                    {f.desc}
                  </p>
                  <button className="nav-button !text-[10px] !py-2 !px-4">Learn_More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Deep Background */}
      <footer className="py-32 bg-[hsl(var(--bg-footer))] border-t border-white/5">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-20">
            <div className="flex flex-col items-center lg:items-start gap-8">
              <Link href="/" className="flex items-center gap-4">
                <div className="bg-[hsl(var(--primary))] p-3 rounded-2xl">
                  <RefreshCw className="text-black" size={32} />
                </div>
                <span className="text-4xl font-black tracking-tighter">KindSync</span>
              </Link>
              <p className="text-[hsl(var(--text-dim))] text-sm font-medium tracking-wide max-w-sm text-center lg:text-left">
                Accelerating the global transition to efficient and decentralized resource distribution.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="#" className="nav-button">Global Registry</Link>
              <Link href="#" className="nav-button">Node Security</Link>
              <Link href="#" className="nav-button">Privacy Protocol</Link>
              <Link href="#" className="nav-button">Network Terms</Link>
            </div>
          </div>
          <div className="mt-24 pt-12 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">
              © 2026 KindSync Technology Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
