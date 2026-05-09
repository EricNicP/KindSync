"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Mail, Lock, RefreshCw, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.user.role === 'DONOR') router.push('/dashboard/donor');
        else if (data.user.role === 'NGO') router.push('/dashboard/ngo');
        else router.push('/dashboard/admin');
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[hsl(var(--bg-hero))] flex flex-col items-center justify-center py-20 px-6">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[420px]" 
      >
        <div className="bg-white/5 border border-white/10 p-10 rounded-[32px] backdrop-blur-xl">
          <div className="text-center mb-10">
            <div className="inline-flex p-3 rounded-2xl bg-[hsl(var(--primary))] text-black mb-6">
              <RefreshCw size={24} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Node_Login</h1>
            <p className="text-[hsl(var(--text-dim))] text-xs font-bold uppercase tracking-widest">Access_Authorized_Registry</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] ml-2">Email_Identifier</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-4 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] ml-2">Secure_Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-4 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-main btn-main-primary w-full justify-center py-4 mt-4"
            >
              {loading ? "AUTHENTICATING..." : "INITIATE_AUTH"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-[hsl(var(--text-dim))] text-[10px] font-bold uppercase tracking-widest mb-6">New Node Registration Required?</p>
            <Link href="/register" className="nav-button w-full text-center py-3 flex justify-center">
              CREATE_ACCOUNT
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
