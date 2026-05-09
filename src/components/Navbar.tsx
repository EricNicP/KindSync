"use client";

import Link from 'next/link';
import { RefreshCw, Menu, X, ArrowRight, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[hsl(var(--bg-hero))]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'}`}>
      <div className="container-custom flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-4 shrink-0">
          <div className="bg-[hsl(var(--primary))] p-2.5 rounded-xl shadow-[0_0_20px_hsla(var(--primary)/0.3)]">
            <RefreshCw className="text-black" size={24} />
          </div>
          <span className="text-3xl font-black tracking-tighter">
            Kind<span className="text-[hsl(var(--primary))]">Sync</span>
          </span>
        </Link>

        {/* Desktop Navigation - All Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="#about" className="nav-button">The_Protocol</Link>
          <Link href="/ngos" className="nav-button">Global_Network</Link>
          <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
          <Link href="/login" className="nav-button flex items-center gap-2">
            <User size={14} /> Node_Login
          </Link>
          <Link href="/register" className="btn-main btn-main-primary !py-2.5 !px-6 !text-[10px]">
            Initialize <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[100px] bg-[hsl(var(--bg-hero))] p-10 flex flex-col gap-6 animate-fade-in">
          <Link href="#about" onClick={() => setIsOpen(false)} className="nav-button w-full text-center py-4">The Protocol</Link>
          <Link href="/ngos" onClick={() => setIsOpen(false)} className="nav-button w-full text-center py-4">Global Network</Link>
          <Link href="/login" onClick={() => setIsOpen(false)} className="nav-button w-full text-center py-4">Login</Link>
          <Link href="/register" onClick={() => setIsOpen(false)} className="btn-main btn-main-primary w-full justify-center py-6 text-xl">Initialize</Link>
        </div>
      )}
    </nav>
  );
}
