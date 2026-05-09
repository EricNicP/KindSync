"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, CheckCircle, XCircle, Users, Building2, Package } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [ngos, setNgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/ngos/verify')
      .then(res => res.json())
      .then(data => {
        setNgos(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleVerify = async (userId: string, isVerified: boolean) => {
    try {
      const res = await fetch('/api/admin/ngos/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isVerified }),
      });
      if (res.ok) {
        setNgos(ngos.map(n => n._id === userId ? { ...n, ngoDetails: { ...n.ngoDetails, isVerified } } : n));
      }
    } catch (err) {
      alert('Verification failed');
    }
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-main))] pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Admin Console</h1>
            <p className="text-[hsl(var(--text-muted))]">Platform overview and NGO verification</p>
          </div>
          <div className="flex gap-6">
            <div className="glass px-8 py-4 rounded-3xl text-center">
              <div className="text-3xl font-bold">{ngos.length}</div>
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--text-muted))]">Total NGOs</div>
            </div>
            <div className="glass px-8 py-4 rounded-3xl text-center border-l-4 border-amber-400">
              <div className="text-3xl font-bold">{ngos.filter(n => !n.ngoDetails?.isVerified).length}</div>
              <div className="text-xs uppercase tracking-widest text-[hsl(var(--text-muted))]">Pending</div>
            </div>
          </div>
        </div>

        <section className="glass rounded-[32px] overflow-hidden">
          <div className="p-8 border-b border-black/5 flex items-center gap-3">
            <Building2 className="text-[hsl(var(--brand-primary))]" />
            <h2 className="text-2xl font-bold">NGO Verification Queue</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/5 text-[hsl(var(--text-muted))] text-sm uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-4">NGO Name</th>
                  <th className="px-8 py-4">Reg. Number</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {Array.isArray(ngos) && ngos.map((ngo) => (
                  <tr key={ngo._id} className="hover:bg-black/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="font-bold">{ngo.name}</div>
                      <div className="text-xs text-[hsl(var(--text-muted))]">{ngo.email}</div>
                    </td>
                    <td className="px-8 py-6 font-mono text-sm">
                      {ngo.ngoDetails?.registrationNumber || 'N/A'}
                    </td>
                    <td className="px-8 py-6">
                      {ngo.ngoDetails?.isVerified ? (
                        <span className="flex items-center gap-1.5 text-green-600 font-bold text-sm">
                          <ShieldCheck size={16} /> Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-amber-600 font-bold text-sm">
                          <ShieldAlert size={16} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {ngo.ngoDetails?.isVerified ? (
                        <button 
                          onClick={() => handleVerify(ngo._id, false)}
                          className="text-red-500 hover:underline text-sm font-bold"
                        >
                          Revoke
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleVerify(ngo._id, true)}
                          className="btn btn-primary py-2 px-6 text-sm"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {ngos.length === 0 && !loading && (
            <div className="py-20 text-center text-[hsl(var(--text-muted))]">
              No NGOs registered yet.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
