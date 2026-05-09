"use client";

import Navbar from "@/components/Navbar";
import DonationForm from "@/components/DonationForm";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Database, 
  ShieldCheck, 
  UserCircle, 
  LogOut, 
  ChevronRight,
  Activity,
  Zap,
  Package
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DonorDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  const handleLogout = async () => {
    // Basic logout logic
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-hero))] pt-40 pb-20">
      <Navbar />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Dashboard Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="dash-card p-8 sticky top-40 space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--primary))] text-black flex items-center justify-center text-xl font-black">
                  JD
                </div>
                <div className="overflow-hidden">
                  <div className="text-lg font-black tracking-tight truncate">DONOR_NODE_01</div>
                  <div className="text-[10px] font-black text-[hsl(var(--primary))] uppercase tracking-[0.2em]">Authorized_Session</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-2 mb-4">Core_Navigation</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`dash-sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                >
                  <LayoutDashboard size={18} /> Dashboard <ChevronRight size={14} className="ml-auto" />
                </button>

                <Link href="/dashboard/donor/history" className="dash-sidebar-btn">
                  <Database size={18} /> Resource_History <ChevronRight size={14} className="ml-auto" />
                </Link>

                <Link href="/ngos" className="dash-sidebar-btn">
                  <ShieldCheck size={18} /> Verified_Nodes <ChevronRight size={14} className="ml-auto" />
                </Link>
              </div>

              <div className="space-y-2 pt-8 border-t border-white/5">
                <button className="dash-sidebar-btn">
                  <UserCircle size={18} /> Profile_Config
                </button>
                <button onClick={handleLogout} className="dash-sidebar-btn !text-red-400 hover:!bg-red-500/10">
                  <LogOut size={18} /> Disconnect_Node
                </button>
              </div>
            </div>
          </aside>

          {/* Main Dashboard Area */}
          <section className="flex-1 space-y-10">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Protocol <span className="text-[hsl(var(--primary))]">Dashboard</span></h1>
                <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em]">System // Resource_Allocation_Matrix</p>
              </div>
              <div className="flex gap-4">
                 <div className="h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[hsl(var(--primary))]">
                    <Activity size={24} className="animate-pulse" />
                 </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Sync_Count", val: "12", icon: Zap },
                { label: "Impact_Mass", val: "45.2kg", icon: Package },
                { label: "Active_Nodes", val: "02", icon: ShieldCheck },
              ].map((s, i) => (
                <div key={i} className="dash-card p-8 group hover:border-[hsl(var(--primary))]/30 transition-all">
                   <div className="flex justify-between items-start mb-6">
                      <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">{s.label}</div>
                      <s.icon size={18} className="text-[hsl(var(--primary))] opacity-40 group-hover:opacity-100" />
                   </div>
                   <div className="text-5xl font-black tracking-tighter">{s.val}</div>
                </div>
              ))}
            </div>

            {/* Main Interaction Module */}
            <div className="dash-card p-1 bg-white/5 border-white/10 overflow-hidden">
               <div className="p-10 border-b border-white/10 bg-white/[0.02]">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Initiate <span className="text-[hsl(var(--primary))]">New_Donation</span></h3>
                  <p className="text-sm font-medium text-white/40">Enter item details for protocol verification and pickup scheduling.</p>
               </div>
               <div className="p-10">
                  <DonationForm />
               </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
