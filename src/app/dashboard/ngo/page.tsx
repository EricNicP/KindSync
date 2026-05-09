"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Package, 
  LogOut, 
  LayoutDashboard, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  UserCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NGODashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        setRequests(Array.isArray(data) ? data.filter((d: any) => d.status === 'PENDING') : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const res = await fetch(`/api/donations/${id}/accept`, { method: 'POST' });
      if (res.ok) {
        alert(`Request claimed.`);
        setRequests(requests.filter(r => r._id !== id));
      }
    } catch (err) {
      alert('Network error during claim.');
    }
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-deep))] pt-32 pb-10">
      <Navbar />
      
      <div className="container-tech">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Pro Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="tech-card p-6 sticky top-32 space-y-10">
              <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[hsl(var(--accent-secondary))] to-[hsl(var(--accent-tertiary))] text-black flex items-center justify-center font-black">
                  NGO
                </div>
                <div className="overflow-hidden">
                  <div className="font-black text-sm truncate">NODE_NGO_ALPHA</div>
                  <div className="text-[10px] font-mono text-[hsl(var(--accent-primary))] uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={10} /> Verified
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-[hsl(var(--text-muted))] uppercase tracking-[0.2em] px-4 mb-4">Operations</div>
                <button className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-[hsla(var(--accent-secondary)/0.1)] text-[hsl(var(--accent-secondary))] border border-[hsla(var(--accent-secondary)/0.2)] font-mono text-[11px] font-bold tracking-widest uppercase">
                  <div className="flex items-center gap-3">
                    <Zap size={16} /> Incoming
                  </div>
                  <ChevronRight size={14} />
                </button>

                <Link 
                  href="/dashboard/ngo/active"
                  className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-[hsl(var(--text-secondary))] hover:bg-white/5 transition-all group font-mono text-[11px] font-bold tracking-widest uppercase"
                >
                  <div className="flex items-center gap-3">
                    <Package size={16} /> Active Pickups
                  </div>
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100" />
                </Link>
              </div>

              <div className="space-y-1 pt-6 border-t border-[hsl(var(--border-subtle))]">
                <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-[hsl(var(--text-secondary))] hover:bg-white/5 font-mono text-[11px] font-bold tracking-widest uppercase">
                  <UserCircle size={16} /> NGO_Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/10 font-mono text-[11px] font-bold tracking-widest uppercase">
                  <LogOut size={16} /> Shutdown
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1 space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase">Distribution</h1>
                <p className="text-[10px] font-mono text-[hsl(var(--text-muted))] tracking-[0.5em] mt-2 uppercase">Core // Allocation Buffer</p>
              </div>
              <span className="bg-[hsl(var(--accent-secondary))] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {requests.length} New Buffers
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {Array.isArray(requests) && requests.map((req) => (
                <motion.div
                  key={req._id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="tech-card border-l-4 border-[hsl(var(--accent-secondary))]"
                >
                  <div className="flex flex-col xl:flex-row justify-between gap-10">
                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-3 text-2xl font-black tracking-tight">
                        <Package className="text-[hsl(var(--accent-secondary))]" size={28} />
                        {req.items.map((i: any) => i.type).join(', ')}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[10px] font-mono uppercase tracking-widest text-[hsl(var(--text-secondary))]">
                        <div className="flex items-center gap-3"><User size={16} className="text-[hsl(var(--accent-secondary))]" /> {req.donor?.name || 'GENERIC_USER'}</div>
                        <div className="flex items-center gap-3"><Calendar size={16} className="text-[hsl(var(--accent-secondary))]" /> {new Date(req.pickupDetails.scheduledTime).toLocaleString()}</div>
                        <div className="flex items-center gap-3 sm:col-span-2"><MapPin size={16} className="text-[hsl(var(--accent-secondary))]" /> {req.pickupDetails.address}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 min-w-[200px]">
                      <button 
                        onClick={() => handleAccept(req._id)}
                        className="btn-tech btn-tech-primary bg-[hsl(var(--accent-secondary))] w-full justify-center"
                      >
                        Claim Node
                      </button>
                      <button className="btn-tech btn-tech-outline w-full justify-center opacity-50 hover:opacity-100">
                        Ignore
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {requests.length === 0 && !loading && (
                <div className="text-center py-24 tech-card">
                  <Activity size={48} className="mx-auto mb-6 text-[hsl(var(--text-muted))] opacity-20" />
                  <h3 className="text-2xl font-black uppercase tracking-tight">Buffer Empty</h3>
                  <p className="text-sm font-mono text-[hsl(var(--text-muted))] mt-2">All network resources have been allocated.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
