"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { 
  Package, 
  MapPin, 
  Calendar, 
  User, 
  ShieldCheck, 
  LogOut, 
  LayoutDashboard, 
  Zap, 
  Activity,
  UserCircle,
  ChevronRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NGODashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/donations');
        const data = await res.json();
        setRequests(Array.isArray(data) ? data.filter((d: any) => d.status === 'PENDING') : []);
      } catch (err) {
        console.error('Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const res = await fetch(`/api/donations/${id}/accept`, { method: 'POST' });
      if (res.ok) {
        setRequests(requests.filter(r => r.id !== id));
        alert('Node synchronized successfully. Check Active Pickups.');
      }
    } catch (err) {
      alert('Sync failed.');
    }
  };

  const handleLogout = async () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-hero))] pt-40 pb-20">
      <Navbar />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* NGO Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="dash-card p-8 sticky top-40 space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--primary))] text-black flex items-center justify-center text-xl font-black">
                  NG
                </div>
                <div className="overflow-hidden">
                  <div className="text-lg font-black tracking-tight truncate">NODE_NGO_ALPHA</div>
                  <div className="text-[10px] font-black text-[hsl(var(--primary))] uppercase tracking-[0.2em] flex items-center gap-2">
                    <ShieldCheck size={12} /> Verified_Node
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-2 mb-4">Operations_Matrix</p>
                <button className="dash-sidebar-btn active">
                  <Zap size={18} /> Incoming_Buffer <ChevronRight size={14} className="ml-auto" />
                </button>

                <Link href="/dashboard/ngo/active" className="dash-sidebar-btn">
                  <Package size={18} /> Active_Pipelines <ChevronRight size={14} className="ml-auto" />
                </Link>
              </div>

              <div className="space-y-2 pt-8 border-t border-white/5">
                <button className="dash-sidebar-btn">
                  <UserCircle size={18} /> Node_Profile
                </button>
                <button onClick={handleLogout} className="dash-sidebar-btn !text-red-400 hover:!bg-red-500/10">
                  <LogOut size={18} /> Emergency_Shutdown
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="flex-1 space-y-10">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Resource <span className="text-[hsl(var(--primary))]">Distribution</span></h1>
                <p className="text-sm font-bold text-white/40 uppercase tracking-[0.3em]">Network // Live_Inbound_Requests</p>
              </div>
              <div className="flex gap-4">
                 <div className="bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_20px_hsla(var(--primary)/0.1)]">
                    <Activity size={14} className="animate-pulse" /> {requests.length} Nodes_Detected
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {loading ? (
                <div className="text-center py-40">
                  <Activity size={48} className="mx-auto text-[hsl(var(--primary))] animate-spin" />
                </div>
              ) : (
                requests.map((req) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="dash-card group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[hsl(var(--primary))] opacity-50"></div>
                    <div className="p-10 flex flex-col xl:flex-row justify-between items-center gap-10">
                      <div className="space-y-8 flex-1">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl bg-white/5 text-[hsl(var(--primary))]">
                            <Package size={32} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-black uppercase tracking-tight">
                              {JSON.parse(req.items).map((i: any) => i.type).join(' + ')}
                            </h3>
                            <div className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mt-1">Origin_Node: {req.donorId.slice(0, 8)}...</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                          <div className="flex items-center gap-4 group/item">
                            <div className="p-2 rounded-lg bg-white/5 text-[hsl(var(--primary))] group-hover/item:bg-[hsl(var(--primary))] group-hover/item:text-black transition-all">
                              <Calendar size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Scheduled_Time</span>
                              <span className="text-sm font-bold">{new Date(req.pickupTime).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 group/item">
                            <div className="p-2 rounded-lg bg-white/5 text-[hsl(var(--primary))] group-hover/item:bg-[hsl(var(--primary))] group-hover/item:text-black transition-all">
                              <MapPin size={16} />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Target_Location</span>
                              <span className="text-sm font-bold truncate max-w-[200px]">{req.pickupAddress}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-4 w-full xl:w-64">
                        <button 
                          onClick={() => handleAccept(req.id)}
                          className="btn-main btn-main-primary w-full justify-center !py-4"
                        >
                          Synchronize_Node <CheckCircle2 size={18} />
                        </button>
                        <button className="nav-button w-full justify-center !py-4 !text-[10px] opacity-40 hover:opacity-100">
                          Decline_Sync <Clock size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {!loading && requests.length === 0 && (
                <div className="text-center py-40 dash-card bg-white/[0.02]">
                  <Activity size={64} className="mx-auto mb-8 text-white/10" />
                  <h3 className="text-3xl font-black uppercase tracking-tight text-white/20">Buffer_Null</h3>
                  <p className="text-sm font-bold text-white/10 uppercase tracking-[0.4em] mt-4">All network resources are currently allocated.</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
