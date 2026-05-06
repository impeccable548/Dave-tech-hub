import { getFeaturedProducts } from "@/lib/sanity.client";
import ProductCard from "@/components/ProductCard";
import { MessageCircle, Package, ArrowRight } from "lucide-react";

const WHATSAPP = "https://wa.me/2347070440191?text=Hi%20Dave%20Tech%20Hub%2C%20I%20need%20help!";

const SERVICES = [
  { title: "Premium Gadgets", desc: "Latest flagship phones, tablets & wearables from top global brands." },
  { title: "Audio & Accessories", desc: "Studio-grade audio, cables, chargers, and carry solutions." },
  { title: "Computing Solutions", desc: "High-performance laptops, desktops, and peripherals for pros." },
  { title: "Warranty & Support", desc: "Genuine products with full warranty. After-sales support guaranteed." },
  { title: "Fast Delivery", desc: "Same-day delivery within Lagos. Nationwide shipping available." },
  { title: "Custom Orders", desc: "Can't find it? We'll source it. Reach out via WhatsApp." },
];

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;700&display=swap');
        .gold-text {
          background: linear-gradient(135deg, #FF8C00 0%, #FFD700 35%, #FFF8DC 55%, #FFD700 75%, #CC7000 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
        .silver-text {
          background: linear-gradient(135deg, #C0C0C0 0%, #fff 50%, #C0C0C0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .glass-nav {
          background: rgba(5,5,5,0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,165,0,0.15);
        }
        .glass-footer {
          background: rgba(5,5,5,0.9);
          backdrop-filter: blur(24px);
          border-top: 1px solid rgba(255,165,0,0.12);
        }
        .hex-bg {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='69' viewBox='0 0 60 69'%3E%3Cg fill='none' stroke='rgba(255,165,0,0.04)' stroke-width='1'%3E%3Cpolygon points='30,1 58,16 58,53 30,68 2,53 2,16'/%3E%3C/g%3E%3C/svg%3E");
          background-size: 60px 69px;
        }
        .service-card {
          background: rgba(12,12,12,0.9);
          border: 1px solid rgba(255,165,0,0.12);
          border-radius: 16px;
          transition: border-color 0.3s, transform 0.3s;
        }
        .service-card:hover {
          border-color: rgba(255,165,0,0.4);
          transform: translateY(-4px);
        }
        .glow-btn {
          background: linear-gradient(135deg, #FF8C00, #FFD700);
          color: #000;
          font-weight: 700;
          border-radius: 10px;
          transition: box-shadow 0.3s, transform 0.2s;
        }
        .glow-btn:hover {
          box-shadow: 0 0 30px rgba(255,165,0,0.5);
          transform: translateY(-2px);
        }
        .outline-btn {
          border: 1px solid rgba(255,165,0,0.4);
          color: #FFD700;
          border-radius: 10px;
          transition: background 0.3s;
        }
        .outline-btn:hover {
          background: rgba(255,165,0,0.08);
        }
        .tag-pill {
          border: 1px solid rgba(255,165,0,0.25);
          color: rgba(255,165,0,0.75);
          background: rgba(255,165,0,0.04);
          border-radius: 999px;
        }
        .stat-divider {
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(255,165,0,0.3), transparent);
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .pulse-dot { animation: pulse-dot 2s infinite; }
      `}</style>

      {/* NAVBAR */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FF8C00, #FFD700)", boxShadow: "0 0 16px rgba(255,165,0,0.4)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" stroke="#000" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="3" fill="#000"/>
                <path d="M8 12 L16 12 M12 8 L12 16" stroke="#000" strokeWidth="1.5"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 16, lineHeight: 1 }}>
                <span className="gold-text">DAVE</span>
                <span className="silver-text"> TECH HUB</span>
              </p>
              <p style={{ fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,165,0,0.5)", fontFamily: "'JetBrains Mono', monospace" }}>
                DELIVERING QUALITY
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            {["Products", "Services", "About"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition-colors hover:text-white" style={{ fontWeight: 500 }}>
                {item}
              </a>
            ))}
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="glow-btn flex items-center gap-2 px-4 py-2.5 text-sm">
            <MessageCircle size={15} />
            WhatsApp Us
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-5 hex-bg overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute top-28 left-8 opacity-20 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M0 60 L0 0 L60 0" stroke="#FFD700" strokeWidth="1"/>
            <circle cx="0" cy="0" r="4" fill="#FFD700"/>
          </svg>
        </div>
        <div className="absolute top-28 right-8 opacity-20 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M60 60 L60 0 L0 0" stroke="#FFD700" strokeWidth="1"/>
            <circle cx="60" cy="0" r="4" fill="#FFD700"/>
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 tag-pill text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
            <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-green-400" style={{ display: "inline-block" }} />
            LAGOS · NATIONWIDE DELIVERY · 100% AUTHENTIC
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.05 }}
            className="text-5xl sm:text-7xl md:text-8xl mb-6">
            <span className="silver-text">Powering</span>
            <br />
            <span className="gold-text">Connectivity</span>
          </h1>

          <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)", fontWeight: 300 }}>
            Nigeria&apos;s premium destination for authentic gadgets, accessories &amp; tech solutions.
            Curated by <span style={{ color: "#FFD700", fontWeight: 500 }}>Obinna David</span>, CEO.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#products" className="glow-btn flex items-center justify-center gap-2 px-8 py-4 text-sm">
              Shop Now <ArrowRight size={16} />
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="outline-btn flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium">
              <MessageCircle size={16} /> Chat with CEO
            </a>
          </div>

          <div className="inline-flex items-center gap-0 rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,165,0,0.15)", background: "rgba(10,10,10,0.8)" }}>
            {[{ val: "500+", label: "PRODUCTS" }, { val: "2K+", label: "CUSTOMERS" }, { val: "100%", label: "AUTHENTIC" }].map(({ val, label }, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && <div className="stat-divider h-12" />}
                <div className="px-8 py-4 text-center">
                  <p className="gold-text font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>{val}</p>
                  <p style={{ fontSize: 9, letterSpacing: "0.12em", color: "rgba(255,255,255,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-5" style={{ background: "rgba(6,6,6,0.98)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,165,0,0.6)", fontFamily: "'JetBrains Mono', monospace" }} className="mb-3">WHAT WE OFFER</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,5vw,48px)" }}>
              <span className="silver-text">Our </span><span className="gold-text">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(({ title, desc }) => (
              <div key={title} className="service-card p-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(255,165,0,0.08)", border: "1px solid rgba(255,165,0,0.2)" }}>
                  <span style={{ color: "#FFD700", fontSize: 20 }}>◈</span>
                </div>
                <h3 className="font-semibold text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-24 px-5 hex-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,165,0,0.6)", fontFamily: "'JetBrains Mono', monospace" }} className="mb-3">LATEST STOCK</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,5vw,48px)" }}>
              <span className="gold-text">Featured </span><span className="silver-text">Products</span>
            </h2>
            <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
              Tap any product to order directly on WhatsApp. All items are 100% genuine.
            </p>
          </div>

          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any, i: number) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(255,165,0,0.06)", border: "1px solid rgba(255,165,0,0.15)" }}>
                <Package size={28} style={{ color: "rgba(255,165,0,0.4)" }} />
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14 }}>Products coming soon. Check back shortly.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="outline-btn inline-flex items-center gap-2 px-8 py-4 text-sm font-medium">
              View Full Catalogue on WhatsApp <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-5" style={{ background: "rgba(6,6,6,0.98)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,165,0,0.6)", fontFamily: "'JetBrains Mono', monospace" }} className="mb-4">THE BRAND</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(28px,5vw,48px)" }} className="mb-6">
            <span className="silver-text">Built on </span><span className="gold-text">Trust</span>
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
            Dave Tech Hub was founded with one mission — give Nigerians access to the world&apos;s best technology without compromise.
            Every product is sourced directly and verified for authenticity. CEO{" "}
            <span style={{ color: "#FFD700", fontWeight: 500 }}>Obinna David</span> personally oversees quality so you receive exactly what you pay for.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["100% Authentic", "Fast Delivery", "After-Sales Support", "Flexible Payment"].map((tag) => (
              <span key={tag} className="tag-pill px-4 py-2 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em" }}>
                {tag}
              </span>
            ))}
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="glow-btn inline-flex items-center gap-2 px-8 py-4 text-sm">
            <MessageCircle size={18} /> Contact CEO on WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="glass-footer py-10 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #FF8C00, #FFD700)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z" stroke="#000" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="3" fill="#000"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 14 }}>
                <span className="gold-text">DAVE</span><span className="silver-text"> TECH HUB</span>
              </p>
              <p style={{ fontSize: 9, color: "rgba(255,165,0,0.5)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.1em" }}>CEO: OBINNA DAVID</p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'JetBrains Mono', monospace" }}>
            Delivering quality, powering connectivity...
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© {new Date().getFullYear()} Dave Tech Hub</p>
        </div>
      </footer>
    </main>
  );
}