"use client";

import Navbar from "@/components/Navbar";
import DonationForm from "@/components/DonationForm";
import { motion } from "framer-motion";
import { 
  History, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  Package, 
  Heart, 
  ShieldCheck, 
  Activity,
  ChevronRight,
  Database,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-deep))] pt-32 pb-10">
      <Navbar />
      
      <div className="container-tech">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Unified Pro Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="tech-card p-6 sticky top-32 space-y-10">
              <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--accent-primary))] to-[hsl(var(--accent-secondary))] text-black flex items-center justify-center font-black">
                  JD
                </div>
                <div className="overflow-hidden">
                  <div className="font-black text-sm truncate">NODE_USER_01</div>
                  <div className="text-[10px] font-mono text-[hsl(var(--accent-primary))] uppercase tracking-widest">Authorized</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-[hsl(var(--text-muted))] uppercase tracking-[0.2em] px-4 mb-4">Core Navigation</div>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all group ${activeTab === 'dashboard' ? 'bg-[hsla(var(--accent-primary)/0.1)] text-[hsl(var(--accent-primary))] border border-[hsla(var(--accent-primary)/0.2)]' : 'text-[hsl(var(--text-secondary))] hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase">
                    <LayoutDashboard size={16} /> Dashboard
                  </div>
                  <ChevronRight size={14} className={activeTab === 'dashboard' ? 'opacity-100' : 'opacity-0'} />
                </button>

                <Link 
                  href="/dashboard/donor/history"
                  className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-[hsl(var(--text-secondary))] hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase">
                    <Database size={16} /> Registry
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                </Link>

                <Link 
                  href="/ngos"
                  className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-[hsl(var(--text-secondary))] hover:bg-white/5 transition-all group"
                >
                  <div className="flex items-center gap-3 font-mono text-[11px] font-bold tracking-widest uppercase">
                    <ShieldCheck size={16} /> Verified Nodes
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                </Link>
              </div>

              <div className="space-y-1 pt-6 border-t border-[hsl(var(--border-subtle))]">
                <div className="text-[10px] font-mono font-bold text-[hsl(var(--text-muted))] uppercase tracking-[0.2em] px-4 mb-4">System Settings</div>
                <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-[hsl(var(--text-secondary))] hover:bg-white/5 font-mono text-[11px] font-bold tracking-widest uppercase">
                  <UserCircle size={16} /> Profile_Config
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 font-mono text-[11px] font-bold tracking-widest uppercase">
                  <LogOut size={16} /> Disconnect
                </button>
              </div>
            </div>
          </aside>

          {/* Clean Module Area */}
          <section className="flex-1 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase">Operations</h1>
                <p className="text-[10px] font-mono text-[hsl(var(--text-muted))] tracking-[0.5em] mt-2 uppercase">Core // Resource Allocation</p>
              </div>
              <div className="flex gap-4">
                 <div className="h-12 w-12 rounded-full border border-[hsl(var(--border-subtle))] flex items-center justify-center text-[hsl(var(--accent-primary))]">
                    <Activity size={20} className="animate-pulse" />
                 </div>
              </div>
            </div>

            {/* Content Switcher */}
            <div className="grid grid-cols-1 gap-8">
              {activeTab === 'dashboard' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Status Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: "Total_Entries", val: "12", color: "var(--accent-primary)" },
                      { label: "Network_Impact", val: "45.2kg", color: "var(--accent-secondary)" },
                      { label: "Active_Pickups", val: "02", color: "var(--accent-tertiary)" },
                    ].map((s, i) => (
                      <div key={i} className="tech-card border-t-2" style={{ borderColor: `hsl(${s.color})` }}>
                         <div className="text-[10px] font-mono text-[hsl(var(--text-muted))] mb-2 uppercase tracking-widest">{s.label}</div>
                         <div className="text-4xl font-black font-mono tracking-tighter">{s.val}</div>
                      </div>
                    ))}
                  </div>

                  {/* Main Action Area */}
                  <div className="tech-card bg-[hsl(var(--bg-surface))] p-10">
                    <DonationForm />
                  </div>
                </motion.div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
