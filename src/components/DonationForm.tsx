"use client";

import { useState } from 'react';
import { Package, Plus, Trash2, Calendar, MapPin, Phone, Zap, ArrowRight, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DonationForm() {
  const [items, setItems] = useState([{ type: 'clothes', quantity: '', description: '' }]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [loading, setLoading] = useState(false);

  const addItem = () => setItems([...items, { type: 'clothes', quantity: '', description: '' }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ type: i.type, quantity: i.quantity, description: i.description })),
          pickupDetails: { address, scheduledTime: pickupDate, contactPhone: phone },
        }),
      });
      if (res.ok) {
        alert('Donation entry logged in the network.');
        setItems([{ type: 'clothes', quantity: '', description: '' }]);
        setAddress('');
        setPhone('');
        setPickupDate('');
      } else {
        const data = await res.json();
        alert(data.error || 'Interface error');
      }
    } catch (err) {
      alert('Network transmission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <div className="space-y-10">
        <div className="flex items-center justify-between border-b border-[hsl(var(--border-subtle))] pb-8">
          <div>
            <h3 className="text-4xl font-black tracking-tighter mb-2">INVENTORY_LOG</h3>
            <p className="text-xs font-mono text-[hsl(var(--accent-primary))] uppercase tracking-[0.4em]">Section 01: Resource Parameters</p>
          </div>
          <button 
            type="button" 
            onClick={addItem}
            className="flex items-center gap-3 text-xs font-mono font-bold tracking-widest text-[hsl(var(--accent-primary))] hover:brightness-125 transition-all"
          >
            <Plus size={20} /> [ADD_NODE]
          </button>
        </div>
        
        <div className="space-y-6">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="tech-card bg-[hsl(var(--bg-elevated))] group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[hsl(var(--text-muted))] mb-4 block">Item_Class</label>
                    <select 
                      className="w-full bg-[hsl(var(--bg-deep))] border border-[hsl(var(--border-subtle))] p-4 rounded-xl text-sm font-mono focus:border-[hsl(var(--accent-primary))] outline-none transition-colors"
                      value={item.type}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].type = e.target.value;
                        setItems(newItems);
                      }}
                    >
                      <option value="clothes">CLOTHES_ASSET</option>
                      <option value="household">HOUSEHOLD_ASSET</option>
                      <option value="books">DATA_ASSET_BOOKS</option>
                      <option value="other">GENERIC_ASSET</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[hsl(var(--text-muted))] mb-4 block">Quant_Value</label>
                    <input 
                      placeholder="e.g. 10.0"
                      className="w-full bg-[hsl(var(--bg-deep))] border border-[hsl(var(--border-subtle))] p-4 rounded-xl text-sm font-mono focus:border-[hsl(var(--accent-primary))] outline-none transition-colors"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].quantity = e.target.value;
                        setItems(newItems);
                      }}
                      required
                    />
                  </div>
                  <div className="lg:col-span-6">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[hsl(var(--text-muted))] mb-4 block">Metadata_Desc</label>
                    <input 
                      placeholder="Input additional parameters..."
                      className="w-full bg-[hsl(var(--bg-deep))] border border-[hsl(var(--border-subtle))] p-4 rounded-xl text-sm font-mono focus:border-[hsl(var(--accent-primary))] outline-none transition-colors"
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].description = e.target.value;
                        setItems(newItems);
                      }}
                    />
                  </div>
                </div>
                {items.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeItem(index)}
                    className="absolute right-4 top-4 text-[hsl(var(--text-muted))] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-10">
        <div className="border-b border-[hsl(var(--border-subtle))] pb-8">
          <h3 className="text-4xl font-black tracking-tighter mb-2">LOGISTICS_LINK</h3>
          <p className="text-xs font-mono text-[hsl(var(--accent-secondary))] uppercase tracking-[0.4em]">Section 02: Node Geolocation</p>
        </div>
        <div className="tech-card border-l-4 border-[hsl(var(--accent-secondary))]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[hsl(var(--text-muted))]">Pickup_Address</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--accent-secondary))]" size={18} />
                <input 
                  placeholder="GEO_COORD / STREET"
                  className="w-full bg-[hsl(var(--bg-deep))] border border-[hsl(var(--border-subtle))] pl-12 pr-4 py-4 rounded-xl text-sm font-mono focus:border-[hsl(var(--accent-secondary))] outline-none transition-colors"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[hsl(var(--text-muted))]">Comms_Link</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--accent-secondary))]" size={18} />
                <input 
                  placeholder="PHONE_TEL"
                  className="w-full bg-[hsl(var(--bg-deep))] border border-[hsl(var(--border-subtle))] pl-12 pr-4 py-4 rounded-xl text-sm font-mono focus:border-[hsl(var(--accent-secondary))] outline-none transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <label className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-[hsl(var(--text-muted))]">Schedule_Window</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--accent-secondary))]" size={18} />
                <input 
                  type="datetime-local"
                  className="w-full bg-[hsl(var(--bg-deep))] border border-[hsl(var(--border-subtle))] pl-12 pr-4 py-4 rounded-xl text-sm font-mono focus:border-[hsl(var(--accent-secondary))] outline-none transition-colors"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn-tech btn-tech-primary w-full justify-center text-xl py-6 border-2 border-transparent hover:border-white transition-all"
      >
        {loading ? "TRANSMITTING..." : "INITIALIZE_LOGISTICS"} <Zap size={24} />
      </button>
    </form>
  );
}
