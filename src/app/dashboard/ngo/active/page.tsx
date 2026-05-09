"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Package, MapPin, Calendar, CheckCircle2, Truck, LogOut, LayoutDashboard, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NGOActivePickups() {
  const [activeDonations, setActiveDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        // Show donations assigned to this NGO that are not yet distributed/cancelled
        setActiveDonations(data.filter((d: any) => d.status === 'ACCEPTED' || d.status === 'PICKED_UP'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/donations/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        if (status === 'DISTRIBUTED') {
          setActiveDonations(activeDonations.filter(d => d._id !== id));
        } else {
          setActiveDonations(activeDonations.map(d => d._id === id ? { ...d, status } : d));
        }
      }
    } catch (err) {
      alert('Status update failed');
    }
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-main))] pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/ngo" className="p-2 rounded-xl bg-white text-[hsl(var(--text-muted))] hover:text-[hsl(var(--brand-secondary))] transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Active Pickups</h1>
            <p className="text-[hsl(var(--text-muted))]">Manage your ongoing collections</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[hsl(var(--brand-secondary))] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : activeDonations.length === 0 ? (
          <div className="text-center py-20 glass rounded-[32px]">
            <Truck size={64} className="mx-auto mb-4 text-[hsl(var(--text-muted))] opacity-20" />
            <h3 className="text-2xl font-bold">No active pickups</h3>
            <p className="text-[hsl(var(--text-muted))]">Go to the dashboard to accept new donation requests.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeDonations.map((donation) => (
              <motion.div
                key={donation._id}
                layout
                className="glass p-6 rounded-[32px] space-y-6"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-[hsla(var(--brand-secondary)/0.1)] text-[hsl(var(--brand-secondary))] flex items-center justify-center">
                    <Package size={28} />
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${donation.status === 'PICKED_UP' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {donation.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2">{donation.items.map((i: any) => i.type).join(', ')}</h3>
                  <div className="space-y-2 text-sm text-[hsl(var(--text-muted))]">
                    <div className="flex items-center gap-2"><MapPin size={16} /> {donation.pickupDetails.address}</div>
                    <div className="flex items-center gap-2"><Calendar size={16} /> {new Date(donation.pickupDetails.scheduledTime).toLocaleString()}</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-black/5">
                  {donation.status === 'ACCEPTED' ? (
                    <button 
                      onClick={() => handleUpdateStatus(donation._id, 'PICKED_UP')}
                      className="btn btn-primary bg-[hsl(var(--brand-secondary))] w-full justify-center"
                    >
                      <Truck size={18} /> Mark as Picked Up
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleUpdateStatus(donation._id, 'DISTRIBUTED')}
                      className="btn btn-primary bg-emerald-600 w-full justify-center"
                    >
                      <CheckCircle2 size={18} /> Mark as Distributed
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
