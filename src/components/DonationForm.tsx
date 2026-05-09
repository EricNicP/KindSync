"use client";

import { useState } from 'react';
import { Package, Plus, Trash2, Calendar, MapPin, Phone, Zap, ArrowRight, Cpu, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DonationForm() {
  const [items, setItems] = useState([{ type: 'clothes', quantity: '', description: '' }]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        setSuccess(true);
        setItems([{ type: 'clothes', quantity: '', description: '' }]);
        setAddress('');
        setPhone('');
        setPickupDate('');
        setTimeout(() => setSuccess(false), 5000);
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
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Items Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight">Resource_Inventory</h3>
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-1">Section 01 // Node_Payload</p>
          </div>
          <button 
            type="button" 
            onClick={addItem}
            className="nav-button !py-2 !px-4 !text-[10px]"
          >
            <Plus size={14} /> Add_Item
          </button>
        </div>
        
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl relative group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-2 block">Class</label>
                    <select 
                      className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all"
                      value={item.type}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].type = e.target.value;
                        setItems(newItems);
                      }}
                    >
                      <option value="clothes">CLOTHES_NODE</option>
                      <option value="household">HOUSEHOLD_NODE</option>
                      <option value="books">DATA_NODE_BOOKS</option>
                      <option value="other">GENERIC_NODE</option>
                    </select>
                  </div>
                  <div className="lg:col-span-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-2 block">Quant</label>
                    <input 
                      placeholder="UNIT_COUNT"
                      className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all"
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
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] mb-2 block">Specifications</label>
                    <input 
                      placeholder="Input item metadata..."
                      className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all"
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
                    className="absolute right-4 top-4 text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Logistics Section */}
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tight">Logistics_Link</h3>
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mt-1">Section 02 // Node_Synchronization</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] ml-2">Pickup_Target</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  placeholder="GEO_ADDRESS"
                  className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] ml-2">Contact_Tel</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  placeholder="LOCAL_PHONE"
                  className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[hsl(var(--primary))] ml-2">Time_Window</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input 
                  type="datetime-local"
                  className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-3.5 rounded-xl text-sm text-white focus:border-[hsl(var(--primary))] outline-none transition-all"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative pt-4">
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-12 left-0 w-full flex justify-center"
            >
              <div className="bg-[hsl(var(--primary))] text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 size={12} /> Sync_Success: Node_Initialized
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          type="submit" 
          disabled={loading}
          className="btn-main btn-main-primary w-full justify-center py-6 text-xl shadow-[0_0_40px_hsla(var(--primary)/0.2)]"
        >
          {loading ? "TRANSMITTING..." : "INITIALIZE_PROTOCOL"} <Zap size={24} />
        </button>
      </div>
    </form>
  );
}
