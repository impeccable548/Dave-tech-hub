"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Zap, Headphones, Package, MessageCircle, ArrowRight,
  Star, ChevronDown, Cpu, Smartphone, Monitor
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

// ─── Mock data for static preview (replace with Sanity fetch in production) ──
const MOCK_PRODUCTS = [
  { _id: "1", name: "iPhone 15 Pro Max", price: 1200000, originalPrice: 1400000, badge: "Hot", description: "Titanium design, A17 Pro chip, 48MP camera system.", image: null, category: "Smartphones" },
  { _id: "2", name: "MacBook Pro M3", price: 2800000, badge: "New", description: "M3 chip with 18-hour battery life and Liquid Retina XDR display.", image: null, category: "Laptops" },
  { _id: "3", name: "Sony WH-1000XM5", price: 320000, originalPrice: 380000, badge: "Sale", description: "Industry-leading noise cancellation with 30hr battery.", image: null, category: "Audio" },
  { _id: "4", name: "Samsung Galaxy S24 Ultra", price: 1100000, badge: "New", description: "Snapdragon 8 Gen 3, 200MP camera, built-in S Pen.", image: null, category: "Smartphones" },
  { _id: "5", name: "AirPods Pro 2nd Gen", price: 280000, originalPrice: 320000, description: "Adaptive Audio, Conversation Awareness, USB-C charging.", image: null, category: "Audio" },
  { _id: "6", name: "iPad Pro 13\" M4", price: 1600000, badge: "Hot", description: "Ultra Retina XDR OLED, thinnest Apple product ever made.", image: null, category: "Tablets" },
];

const SERVICES = [
  { icon: Smartphone, title: "Premium Gadgets", desc: "Latest flagship phones, tablets & wearables from top global brands." },
  { icon: Headphones, title: "Audio & Accessories", desc: "Studio-grade audio equipment, cables, chargers, and carry solutions." },
  { icon: Monitor, title: "Computing Solutions", desc: "High-performance laptops, desktops, and peripherals for pros." },
  { icon: Shield, title: "Warranty & Support", desc: "Genuine products with full warranty. After-sales support guaranteed." },
  { icon: Zap, title: "Fast Delivery", desc: "Same-day delivery within Lagos. Nationwide shipping available." },
  { icon: Package, title: "Custom Orders", desc: "Can't find it? We'll source it. Reach out via WhatsApp." },
];

const WHATSAPP = "https://wa.me/2347070440191?text=Hi%20Dave%20Tech%20Hub%2C%20I%20need%20help!";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <main className="min-h-screen bg-black text-white font-body overflow-x-hidden">
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');

        .gold-text {
          background: linear-gradient(135deg, #D4AF37 0%, #f5f0d0 40%, #D4AF37 60%, #8B6914 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .glass {
          background: rgba(10,10,10,0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212,175,55,0.15);
        }
        .glass-card {
          background: rgba(15,15,15,0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212,175,55,0.15);
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav className="glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}>
              <Cpu size={16} color="#000" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              <span className="gold-text">Dave</span>
              <span className="text-white"> Tech Hub</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
            {["Products", "Services", "About"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors duration-200"
                style={{ "--gold": "#D4AF37" } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                {item}
              </a>
            ))}
          </div>

          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #D4AF37, #B8960C)", color: "#000" }}>
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(212,175,55,0.12) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }} />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase mb-8"
              style={{ border: "1px solid rgba(212,175,55,0.3)", color: "rgba(212,175,55,0.8)", background: "rgba(212,175,55,0.05)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Premium Tech — Lagos & Beyond
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl md:text-8xl leading-none mb-6 tracking-tight">
            <span className="text-white">Elevate Your</span>
            <br />
            <span className="gold-text">Tech Experience</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}>
            Nigeria&apos;s finest destination for authentic gadgets, accessories, and premium tech solutions.
            Curated by <span style={{ color: "rgba(212,175,55,0.9)" }}>Obinna David</span> — CEO, Dave Tech Hub.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)", color: "#000",
                boxShadow: "0 0 30px rgba(212,175,55,0.3)" }}>
              Shop Now
              <ArrowRight size={16} />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
              style={{ border: "1px solid rgba(212,175,55,0.35)", color: "#D4AF37",
                background: "rgba(212,175,55,0.05)" }}>
              <MessageCircle size={16} />
              Chat with Us
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-6 mt-20 max-w-xl mx-auto">
            {[
              { val: "500+", label: "Products" },
              { val: "2K+", label: "Happy Clients" },
              { val: "100%", label: "Authentic" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-bold text-2xl gold-text">{val}</p>
                <p className="text-xs mt-1 font-mono tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown size={20} style={{ color: "rgba(212,175,55,0.5)" }} />
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.6)" }}>What We Offer</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl">
              <span className="gold-text">Premium</span> Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="glass-card rounded-2xl p-6 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <Icon size={22} style={{ color: "#D4AF37" }} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-24 px-6" style={{ background: "rgba(10,10,10,0.6)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color: "rgba(212,175,55,0.6)" }}>Top Picks</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl">
              Featured <span className="gold-text">Products</span>
            </h2>
            <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.45)" }}>
              All products are 100% authentic. Click any card to order directly on WhatsApp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_PRODUCTS.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border transition-all duration-300"
              style={{ borderColor: "rgba(212,175,55,0.3)", color: "#D4AF37" }}>
              View All Products on WhatsApp
              <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <p className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "rgba(212,175,55,0.6)" }}>The Brand</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl mb-6">
              Built on <span className="gold-text">Trust</span> & Quality
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Dave Tech Hub was founded with a simple mission: give Nigerians access to the world&apos;s best
              technology without compromise. Every product we sell is sourced directly and verified for
              authenticity. CEO <strong style={{ color: "rgba(212,175,55,0.9)" }}>Obinna David</strong> personally oversees
              quality control so you receive exactly what you pay for.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {["100% Authentic", "Fast Delivery", "After-Sales Support", "Flexible Payment"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full text-xs font-mono tracking-wider"
                  style={{ border: "1px solid rgba(212,175,55,0.25)", color: "rgba(212,175,55,0.7)", background: "rgba(212,175,55,0.04)" }}>
                  {tag}
                </span>
              ))}
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)", color: "#000",
                boxShadow: "0 0 30px rgba(212,175,55,0.25)" }}>
              <MessageCircle size={18} />
              Contact CEO on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="glass border-t-0 py-12 px-6"
        style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}>
                <Cpu size={16} color="#000" />
              </div>
              <div>
                <p className="font-display font-bold text-sm">
                  <span className="gold-text">Dave</span> Tech Hub
                </p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>CEO: Obinna David</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp: 07070440191</a>
              <span>Benin City, Nigeria</span>
            </div>

            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © {new Date().getFullYear()} Dave Tech Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}