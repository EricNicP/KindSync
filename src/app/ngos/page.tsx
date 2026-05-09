"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, MapPin, Globe, ExternalLink, RefreshCw } from 'lucide-react';

interface NGO {
  id: string;
  name: string;
  ngoDescription: string;
  ngoWebsite: string;
  address: string;
  ngoIsVerified: boolean;
}

export default function GlobalNetwork() {
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const res = await fetch('/api/ngos');
        const data = await res.json();
        setNgos(data);
      } catch (err) {
        console.error('Failed to fetch NGOs');
      } finally {
        setLoading(false);
      }
    };
    fetchNGOs();
  }, []);

  const filteredNgos = ngos.filter(n => 
    n.name.toLowerCase().includes(search.toLowerCase()) || 
    n.ngoDescription?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-hero))]">
      <Navbar />

      <section className="pt-48 pb-20">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6">Global <span className="text-[hsl(var(--primary))]">Network</span></h1>
              <p className="text-xl text-[hsl(var(--text-dim))] font-medium">Verified NGO nodes currently synchronized with the KindSync protocol.</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
              <input 
                type="text" 
                placeholder="Search_Node_Registry..."
                className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-4 rounded-2xl text-white outline-none focus:border-[hsl(var(--primary))] transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-40">
              <RefreshCw className="text-[hsl(var(--primary))] animate-spin" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNgos.length > 0 ? (
                filteredNgos.map((ngo) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    key={ngo.id} 
                    className="bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col gap-6 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-2xl bg-[hsl(var(--primary))] text-black">
                        <ShieldCheck size={24} />
                      </div>
                      {ngo.ngoIsVerified && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/10 px-3 py-1 rounded-full">Protocol_Verified</span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">{ngo.name}</h3>
                      <p className="text-[hsl(var(--text-dim))] text-sm leading-relaxed line-clamp-3">
                        {ngo.ngoDescription || "Standard verified collection and distribution node within the KindSync global network."}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex items-center gap-3 text-xs font-bold text-white/40 uppercase tracking-widest">
                        <MapPin size={14} className="text-[hsl(var(--primary))]" /> {ngo.address || "Location Encrypted"}
                      </div>
                      {ngo.ngoWebsite && (
                        <a href={ngo.ngoWebsite} target="_blank" className="flex items-center gap-3 text-xs font-bold text-white/40 uppercase tracking-widest hover:text-[hsl(var(--primary))] transition-colors">
                          <Globe size={14} className="text-[hsl(var(--primary))]" /> {ngo.ngoWebsite.replace('https://', '')}
                        </a>
                      )}
                    </div>

                    <button className="btn-main btn-main-primary w-full justify-center !py-3 mt-4 !text-[10px]">
                      Sync_Donation <ExternalLink size={14} />
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-40 border border-dashed border-white/10 rounded-[40px]">
                  <p className="text-[hsl(var(--text-dim))] font-bold uppercase tracking-[0.2em]">No Synchronized Nodes Found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
