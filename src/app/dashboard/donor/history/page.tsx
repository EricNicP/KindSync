"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Package, Calendar, MapPin, CheckCircle2, Clock, ChevronRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DonationHistory() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        setDonations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DISTRIBUTED': return 'text-green-600 bg-green-50';
      case 'PICKED_UP': return 'text-blue-600 bg-blue-50';
      case 'ACCEPTED': return 'text-purple-600 bg-purple-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      default: return 'text-amber-600 bg-amber-50';
    }
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-main))] pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/donor" className="p-2 rounded-xl bg-white text-[hsl(var(--text-muted))] hover:text-[hsl(var(--brand-primary))] transition-colors">
            <LayoutDashboard size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Donation History</h1>
            <p className="text-[hsl(var(--text-muted))]">Track your impact over time</p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[hsl(var(--brand-primary))] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : donations.length === 0 ? (
          <div className="text-center py-20 glass rounded-[32px]">
            <Package size={64} className="mx-auto mb-4 text-[hsl(var(--text-muted))] opacity-20" />
            <h3 className="text-2xl font-bold">No donations yet</h3>
            <p className="text-[hsl(var(--text-muted))] mb-8">Start your journey by making your first donation.</p>
            <Link href="/dashboard/donor" className="btn btn-primary">Donate Now</Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {Array.isArray(donations) && donations.map((donation) => (
              <motion.div
                key={donation._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-6 rounded-[24px] hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[hsl(var(--brand-primary))] text-white flex items-center justify-center">
                          <Package size={24} />
                        </div>
                        <div>
                          <div className="font-bold text-lg">
                            {donation.items.map((i: any) => i.type).join(', ')}
                          </div>
                          <div className="text-sm text-[hsl(var(--text-muted))] flex items-center gap-2">
                            <Calendar size={14} /> {new Date(donation.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(donation.status)}`}>
                        {donation.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-black/5">
                      <div className="flex items-center gap-2 text-sm text-[hsl(var(--text-muted))]">
                        <MapPin size={16} /> {donation.pickupDetails.address}
                      </div>
                      {donation.assignedNGO && (
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--brand-secondary))] font-medium">
                          <CheckCircle2 size={16} /> Assigned to NGO Partner
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <button className="p-3 rounded-full hover:bg-black/5 text-[hsl(var(--text-muted))] transition-colors">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
