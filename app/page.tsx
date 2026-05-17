"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, ShoppingCart, Star, ArrowRight, Zap, Shield, Headphones, Smartphone, Monitor, Package, Phone, MapPin, Instagram, Twitter, Facebook, Menu, X, ChevronRight } from "lucide-react";
import { supabase, type Product } from "@/lib/supabase";

const WA = "https://wa.me/2347070440191";
const MSG = (m: string) => `${WA}?text=${encodeURIComponent(m)}`;

const NAV = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  { id:1, name:"iPhone 15 Pro Max", cat:"Smartphones", price:"₦1,200,000", orig:"₦1,400,000", badge:"HOT", stars:5, desc:"Titanium chassis · A17 Pro chip · 48MP ProRAW camera system." },
  { id:2, name:'MacBook Pro M3 14"', cat:"Laptops", price:"₦2,800,000", orig:"", badge:"NEW", stars:5, desc:"M3 chip · Liquid Retina XDR · 18-hour battery · 16GB RAM." },
  { id:3, name:"Sony WH-1000XM5", cat:"Audio", price:"₦320,000", orig:"₦380,000", badge:"SALE", stars:5, desc:"Industry-leading noise cancellation · 30hr battery life." },
  { id:4, name:"Samsung S24 Ultra", cat:"Smartphones", price:"₦1,100,000", orig:"", badge:"NEW", stars:5, desc:"Snapdragon 8 Gen 3 · 200MP camera · built-in S Pen." },
  { id:5, name:"AirPods Pro 2nd Gen", cat:"Audio", price:"₦280,000", orig:"₦320,000", badge:"", stars:4, desc:"Adaptive Audio · USB-C charging · Conversation Awareness." },
  { id:6, name:'iPad Pro 13" M4', cat:"Tablets", price:"₦1,600,000", orig:"", badge:"HOT", stars:5, desc:"Ultra Retina XDR OLED · Thinnest Apple product ever made." },
];

const SERVICES = [
  { icon:Smartphone, title:"Premium Gadgets", desc:"Latest flagship phones, tablets & wearables sourced directly from top global brands." },
  { icon:Headphones, title:"Audio Solutions", desc:"Studio-grade headphones, earbuds & Bluetooth speaker systems." },
  { icon:Monitor, title:"Computing", desc:"High-performance laptops, desktops & professional accessories." },
  { icon:Shield, title:"Warranty Support", desc:"Every product is 100% genuine with full manufacturer warranty." },
  { icon:Zap, title:"Fast Delivery", desc:"Same-day delivery across Benin City. Nationwide shipping available." },
  { icon:Package, title:"Custom Orders", desc:"Can't find it? We'll source any device you need — just ask." },
];

const CONTACT_CARDS = [
  { icon:MessageCircle, label:"WhatsApp", val:"07070440191", href:MSG("Hi Dave Tech Hub!"), accent:"#22c55e" },
  { icon:Phone, label:"Call Us", val:"07070440191", href:"tel:07070440191", accent:"#D4AF37" },
  { icon:MapPin, label:"Location", val:"Benin City, Nigeria", href:"#contact", accent:"#f87171" },
];
// ── Reusable hook ──
function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return { ref, v };
}

// ── Product Card ──
function PCard({ p, i }: { p: Product; i: number }) {
  const { ref, v } = useVisible();
  const [h, setH] = useState(false);
  const badgeColor =
    p.badge === "SALE" ? { bg:"linear-gradient(135deg,#dc2626,#991b1b)", c:"#fff" } :
    p.badge === "NEW"  ? { bg:"linear-gradient(135deg,#1d4ed8,#1e40af)", c:"#fff" } :
                         { bg:"linear-gradient(135deg,#d97706,#92400e)", c:"#fff" };
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(60px) scale(0.96)",
        transition: `opacity .7s ${i*.09}s, transform .7s ${i*.09}s, box-shadow .4s, border-color .4s, background .4s`,
        borderRadius: 24, overflow: "hidden", position: "relative" as const,
        background: "#0c0c0c",
        border: `1px solid ${h ? "rgba(212,175,55,.5)" : "rgba(255,255,255,.06)"}`,
        boxShadow: h ? "0 30px 80px rgba(212,175,55,.12), 0 0 0 1px rgba(212,175,55,.15)" : "0 4px 40px rgba(0,0,0,.6)",
      }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background: h ? "linear-gradient(90deg,transparent,#D4AF37,transparent)" : "transparent", transition:"all .4s", zIndex:2 }} />
      {p.badge && (
        <div style={{ position:"absolute", top:14, left:14, zIndex:3, background:badgeColor.bg, color:badgeColor.c, fontSize:9, fontWeight:800, letterSpacing:".18em", padding:"4px 12px", borderRadius:99, fontFamily:"'Space Mono',monospace" }}>{p.badge}</div>
      )}
      <div style={{ height:190, display:"flex", alignItems:"center", justifyContent:"center", background: h ? "linear-gradient(160deg,rgba(212,175,55,.08),transparent)" : "linear-gradient(160deg,rgba(255,255,255,.02),transparent)", borderBottom:"1px solid rgba(255,255,255,.05)", transition:"all .4s", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(circle at 50% 50%, rgba(212,175,55,${h ? .12 : .04}) 0%, transparent 70%)`, transition:"all .4s" }} />
      {p.image_url ? (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={p.image_url} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:0 }} />
) : (
  <ShoppingCart size={44} strokeWidth={1} color={h ? "rgba(212,175,55,.6)" : "rgba(255,255,255,.12)"} style={{ transition:"all .4s", transform: h ? "scale(1.1)" : "scale(1)" }} />
)}
      </div>
      <div style={{ padding:"24px 24px 28px" }}>
        <p style={{ fontSize:10, letterSpacing:".22em", color:"rgba(212,175,55,.55)", fontFamily:"'Space Mono',monospace", marginBottom:8 }}>{(p.category || "").toUpperCase()}</p>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:21, marginBottom:10, color:"#f5f0e8", lineHeight:1.2 }}>{p.name}</h3>
        <p style={{ fontSize:12.5, color:"rgba(255,255,255,.35)", lineHeight:1.7, marginBottom:16 }}>{p.description}</p>
        <div style={{ display:"flex", gap:3, marginBottom:18 }}>
          {[...Array(5)].map((_,s) => <Star key={s} size={11} fill="#D4AF37" color="#D4AF37" />)}
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:22 }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:26, color:"#D4AF37" }}>{p.price}</span>
          {p.original_price && <span style={{ fontSize:13, textDecoration:"line-through", color:"rgba(255,255,255,.22)" }}>{p.original_price}</span>}
        </div>
        <a href={MSG(`Hi Dave Tech Hub! I'm interested in the ${p.name} at ${p.price}. Please send more details.`)}
          target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"13px 0", borderRadius:12, fontSize:13, fontWeight:700, background: h ? "linear-gradient(135deg,#D4AF37,#B8860B)" : "transparent", color: h ? "#000" : "#D4AF37", border: h ? "none" : "1px solid rgba(212,175,55,.25)", textDecoration:"none", transition:"all .35s", letterSpacing:".04em" }}>
          <MessageCircle size={14}/> Order via WhatsApp
        </a>
      </div>
    </div>
  );
}

// ── Service Card ──
function SCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const { ref, v } = useVisible();
  const [h, setH] = useState(false);
  const Icon = s.icon;
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ opacity:v?1:0, transform:v?"none":"translateY(40px)", transition:`all .6s ease ${i*.07}s`, padding:"36px 32px", borderRadius:20, background: h ? "rgba(212,175,55,.05)" : "#0c0c0c", border:`1px solid ${h?"rgba(212,175,55,.35)":"rgba(255,255,255,.06)"}`, position:"relative", overflow:"hidden", cursor:"default" }}>
      <div style={{ position:"absolute", bottom:0, right:0, width:120, height:120, borderRadius:"50%", background:`radial-gradient(circle, rgba(212,175,55,${h?.08:.02}) 0%, transparent 70%)`, transition:"all .4s" }}/>
      <div style={{ width:52, height:52, borderRadius:14, background: h?"rgba(212,175,55,.12)":"rgba(212,175,55,.05)", border:`1px solid ${h?"rgba(212,175,55,.35)":"rgba(212,175,55,.12)"}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24, transition:"all .4s", boxShadow:h?"0 0 30px rgba(212,175,55,.2)":"none" }}>
        <Icon size={22} color="#D4AF37"/>
      </div>
      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:20, marginBottom:10, color:h?"#f5f0e8":"rgba(255,255,255,.85)" }}>{s.title}</h3>
      <p style={{ fontSize:13, color:"rgba(255,255,255,.38)", lineHeight:1.75 }}>{s.desc}</p>
    </div>
  );
}

// ── Contact Card ──
function CCard({ c }: { c: typeof CONTACT_CARDS[0] }) {
  const { ref, v } = useVisible();
  const [h, setH] = useState(false);
  const Icon = c.icon;
  return (
    <div ref={ref} style={{ opacity:v?1:0, transition:"opacity .6s" }}>
      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ display:"block", padding:"32px 24px", borderRadius:20, border:`1px solid ${h?"rgba(212,175,55,.35)":"rgba(255,255,255,.06)"}`, background:h?"rgba(212,175,55,.04)":"#0c0c0c", textAlign:"center", transition:"all .35s", transform:h?"translateY(-6px)":"none", textDecoration:"none" }}>
        <div style={{ width:52, height:52, borderRadius:14, background:`${c.accent}15`, border:`1px solid ${c.accent}30`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", transition:"all .35s", boxShadow:h?`0 0 30px ${c.accent}40`:"none" }}>
          <Icon size={22} color={c.accent}/>
        </div>
        <p style={{ fontSize:10, letterSpacing:".18em", color:"rgba(255,255,255,.3)", fontFamily:"'Space Mono',monospace", marginBottom:6 }}>{c.label.toUpperCase()}</p>
        <p style={{ fontSize:13, color:"rgba(255,255,255,.7)", fontWeight:500 }}>{c.val}</p>
      </a>
    </div>
  );
}

// ── Social Icon ──
function SocialIcon({ Icon }: { Icon: React.ElementType }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ width:36, height:36, borderRadius:9, border:`1px solid ${h?"rgba(212,175,55,.4)":"rgba(212,175,55,.15)"}`, display:"flex", alignItems:"center", justifyContent:"center", background:h?"rgba(212,175,55,.08)":"transparent", transition:"all .3s" }}>
      <Icon size={14} color="rgba(212,175,55,.55)"/>
    </a>
  );
}

// ── About Left ──
function AboutLeft() {
  const { ref, v } = useVisible();
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"none":"translateX(-40px)", transition:"all .8s ease" }}>
      <p style={{ fontSize:11, letterSpacing:".26em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginBottom:20 }}>THE BRAND</p>
      <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(36px,4.5vw,60px)", lineHeight:.95, marginBottom:36, letterSpacing:"-.01em" }}>
        <span style={{ color:"rgba(255,255,255,.85)" }}>Built on</span><br/>
        <span className="g">Trust &amp; Quality</span>
      </h2>
      <p style={{ fontSize:15, color:"rgba(255,255,255,.42)", lineHeight:1.9, fontWeight:300, marginBottom:20 }}>
        Dave Tech Hub was founded with a single mission — give Nigerians access to the world&apos;s best technology without compromise. Every product is sourced directly and verified for authenticity before it reaches you.
      </p>
      <p style={{ fontSize:15, color:"rgba(255,255,255,.42)", lineHeight:1.9, fontWeight:300, marginBottom:44 }}>
        CEO <span style={{ color:"#D4AF37", fontWeight:500 }}>Obinna David</span> personally oversees quality control so you always receive exactly what you pay for.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10, marginBottom:44 }}>
        {["100% Authentic","Fast Delivery","After-Sales Support","Flexible Payment","Nationwide Shipping"].map(t => (
          <span key={t} style={{ padding:"8px 18px", borderRadius:99, fontSize:11, fontFamily:"'Space Mono',monospace", letterSpacing:".06em", border:"1px solid rgba(212,175,55,.2)", color:"rgba(212,175,55,.6)", background:"rgba(212,175,55,.03)" }}>{t}</span>
        ))}
      </div>
      <a href={MSG("Hi Dave Tech Hub! I'd like to learn more about the brand.")} target="_blank" rel="noopener noreferrer"
        style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"14px 36px", borderRadius:12, fontSize:13, fontWeight:700, letterSpacing:".06em", background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", transition:"all .3s" }}
        onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-2px)"; el.style.boxShadow="0 10px 40px rgba(212,175,55,.4)"; }}
        onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform="none"; el.style.boxShadow="none"; }}>
        Get in Touch <ArrowRight size={14}/>
      </a>
    </div>
  );
}

// ── About Right (orbital) ──
function AboutRight() {
  const { ref, v } = useVisible();
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"none":"translateX(40px)", transition:"all .8s ease .2s", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", height:420 }}>
      <div style={{ position:"absolute", width:380, height:380, borderRadius:"50%", border:"1px solid rgba(212,175,55,.1)", animation:"spin 60s linear infinite" }}>
        {[0,90,180,270].map((deg,i) => (
          <div key={i} style={{ position:"absolute", width:8, height:8, borderRadius:"50%", background:"#D4AF37", boxShadow:"0 0 12px rgba(212,175,55,.8)", left:`calc(50% + ${Math.cos(deg*Math.PI/180)*188}px - 4px)`, top:`calc(50% + ${Math.sin(deg*Math.PI/180)*188}px - 4px)` }}/>
        ))}
      </div>
      <div style={{ position:"absolute", width:280, height:280, borderRadius:"50%", border:"1px solid rgba(212,175,55,.15)", animation:"spinr 40s linear infinite" }}>
        {[45,135,225,315].map((deg,i) => (
          <div key={i} style={{ position:"absolute", width:5, height:5, borderRadius:"50%", background:"rgba(212,175,55,.6)", left:`calc(50% + ${Math.cos(deg*Math.PI/180)*138}px - 2.5px)`, top:`calc(50% + ${Math.sin(deg*Math.PI/180)*138}px - 2.5px)` }}/>
        ))}
      </div>
      <div style={{ width:160, height:160, borderRadius:"50%", background:"linear-gradient(135deg,rgba(212,175,55,.12),rgba(212,175,55,.03))", border:"1px solid rgba(212,175,55,.35)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 80px rgba(212,175,55,.15)", animation:"float 6s ease-in-out infinite" }}>
        <div style={{ textAlign:"center" }}>
          <div className="g" style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:42, lineHeight:1, letterSpacing:"-.02em" }}>DTH</div>
          <div style={{ fontSize:8, letterSpacing:".24em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginTop:4 }}>PREMIUM</div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// ── MAIN PAGE ──
// ══════════════════════════════════════════════
export default function Page() {
  const [scrollY, setScrollY] = useState(0);
  const [liveProducts, setLiveProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ x:50, y:50 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => setMousePos({ x:(e.clientX/window.innerWidth)*100, y:(e.clientY/window.innerHeight)*100 });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("available", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setLiveProducts(data || []);
        setProductsLoading(false);
      });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x:number; y:number; vx:number; vy:number; r:number; a:number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.5+.3, a:Math.random() });
    }
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(212,175,55,${p.a*.4})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ background:"#060606", color:"#fff", fontFamily:"'DM Sans',sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        a{text-decoration:none;color:inherit}
        ::selection{background:rgba(212,175,55,.3);color:#fff}
        ::-webkit-scrollbar{width:2px}
        ::-webkit-scrollbar-track{background:#060606}
        ::-webkit-scrollbar-thumb{background:#D4AF37;border-radius:2px}
        .g{background:linear-gradient(135deg,#BF953F 0%,#FCF6BA 30%,#B38728 60%,#FBF5B7 80%,#AA771C 100%);background-size:300% 300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gs 6s ease infinite}
        @keyframes gs{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes spinr{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
        @keyframes scan{0%{top:-10px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100vh;opacity:0}}
        @keyframes borderGlow{0%,100%{box-shadow:0 0 20px rgba(212,175,55,.2)}50%{box-shadow:0 0 50px rgba(212,175,55,.5)}}
        .scan-line{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,.6),transparent);animation:scan 8s linear infinite;pointer-events:none}
        @media(max-width:900px){
          .desktop-nav{display:none!important}
          .mobile-btn{display:flex!important}
          .about-grid{grid-template-columns:1fr!important;gap:48px!important}
          .footer-grid{grid-template-columns:1fr!important;gap:40px!important}
          .stats-wrap{flex-wrap:wrap;justify-content:center}
          .hero-h{font-size:clamp(44px,12vw,80px)!important}
        }
        @media(max-width:900px){.mobile-btn{display:flex!important}}
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, transition:"all .5s", background: scrollY>60?"rgba(6,6,6,.95)":"transparent", backdropFilter:scrollY>60?"blur(30px)":"none", borderBottom:scrollY>60?"1px solid rgba(212,175,55,.1)":"1px solid transparent" }}>
        <div style={{ height:2, background:"linear-gradient(90deg,transparent,#D4AF37 20%,#FCF6BA 50%,#D4AF37 80%,transparent)", opacity:scrollY>60?1:0, transition:"opacity .5s" }} />
        <div style={{ maxWidth:1320, margin:"0 auto", padding:"0 32px", height:70, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="#hero" style={{ display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ position:"relative", width:44, height:44 }}>
              <div style={{ position:"absolute", inset:0, borderRadius:12, background:"linear-gradient(135deg,#D4AF37,#B8860B)", animation:"borderGlow 3s ease infinite" }} />
              <div style={{ position:"absolute", inset:2, borderRadius:10, background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L21 8V16L12 21L3 16V8Z" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="2" fill="#D4AF37"/>
                  <path d="M8 12H16M12 8V16" stroke="#D4AF37" strokeWidth="1.2"/>
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:20, letterSpacing:".04em", lineHeight:1.1 }}>
                <span className="g">DAVE</span><span style={{ color:"rgba(255,255,255,.8)" }}> TECH HUB</span>
              </div>
              <div style={{ fontSize:8, letterSpacing:".28em", color:"rgba(212,175,55,.45)", fontFamily:"'Space Mono',monospace", marginTop:1 }}>DELIVERING QUALITY</div>
            </div>
          </a>

          <nav className="desktop-nav" style={{ display:"flex", gap:36 }}>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,.5)", letterSpacing:".04em", transition:"color .25s" }}
                onMouseEnter={e => e.currentTarget.style.color="#D4AF37"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.5)"}>
                {label}
              </a>
            ))}
          </nav>

          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <a href={MSG("Hi Dave Tech Hub! I'd like to enquire about your products.")} target="_blank" rel="noopener noreferrer"
              className="desktop-nav"
              style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 24px", borderRadius:10, fontSize:13, fontWeight:700, letterSpacing:".04em", background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", transition:"all .3s" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-1px)"; el.style.boxShadow="0 8px 30px rgba(212,175,55,.4)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform="none"; el.style.boxShadow="none"; }}>
              <MessageCircle size={14}/> WhatsApp Us
            </a>
            <button onClick={() => setMenu(!menu)} className="mobile-btn"
              style={{ display:"none", width:42, height:42, borderRadius:10, border:"1px solid rgba(212,175,55,.25)", background:"rgba(212,175,55,.05)", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#D4AF37" }}>
              {menu ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {menu && (
          <div style={{ background:"rgba(6,6,6,.98)", backdropFilter:"blur(30px)", borderTop:"1px solid rgba(212,175,55,.1)", padding:"24px 32px 32px" }}>
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenu(false)}
                style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0", fontSize:16, fontFamily:"'Cormorant Garamond',serif", fontWeight:600, color:"rgba(255,255,255,.7)", borderBottom:"1px solid rgba(255,255,255,.05)" }}>
                {label} <ChevronRight size={16} color="rgba(212,175,55,.5)"/>
              </a>
            ))}
            <a href={MSG("Hi Dave Tech Hub!")} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:24, padding:"15px", borderRadius:12, background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", fontWeight:700, fontSize:14 }}>
              <MessageCircle size={16}/> WhatsApp Us
            </a>
          </div>
        )}
      </header>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"120px 24px 100px", position:"relative", overflow:"hidden" }}>
        <canvas ref={canvasRef} style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}/>
        <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 60% 50% at ${mousePos.x}% ${mousePos.y}%, rgba(212,175,55,.07) 0%, transparent 70%)`, transition:"background .1s", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", width:900, height:900, borderRadius:"50%", border:"1px solid rgba(212,175,55,.04)", marginLeft:-450, marginTop:-450, animation:"spin 80s linear infinite", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", width:650, height:650, borderRadius:"50%", border:"1px solid rgba(212,175,55,.06)", marginLeft:-325, marginTop:-325, animation:"spinr 50s linear infinite", pointerEvents:"none", zIndex:0 }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", width:450, height:450, borderRadius:"50%", border:"1px solid rgba(212,175,55,.08)", marginLeft:-225, marginTop:-225, animation:"spin 30s linear infinite", pointerEvents:"none", zIndex:0 }} />
        <div className="scan-line" style={{ zIndex:1 }} />
        <svg width="64" height="64" viewBox="0 0 64 64" style={{position:"absolute",top:"88px",left:"28px",opacity:.18,pointerEvents:"none",zIndex:1}} fill="none"><polyline points="0,64 0,0 64,0" stroke="#D4AF37" strokeWidth="1.5" fill="none"/></svg>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{position:"absolute",top:"88px",right:"28px",opacity:.18,pointerEvents:"none",zIndex:1}} fill="none"><polyline points="64,64 64,0 0,0" stroke="#D4AF37" strokeWidth="1.5" fill="none"/></svg>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{position:"absolute",bottom:"28px",left:"28px",opacity:.18,pointerEvents:"none",zIndex:1}} fill="none"><polyline points="0,0 0,64 64,64" stroke="#D4AF37" strokeWidth="1.5" fill="none"/></svg>
        <svg width="64" height="64" viewBox="0 0 64 64" style={{position:"absolute",bottom:"28px",right:"28px",opacity:.18,pointerEvents:"none",zIndex:1}} fill="none"><polyline points="64,0 64,64 0,64" stroke="#D4AF37" strokeWidth="1.5" fill="none"/></svg>

        <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:960 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"8px 20px", border:"1px solid rgba(212,175,55,.18)", borderRadius:999, background:"rgba(212,175,55,.04)", marginBottom:48, fontFamily:"'Space Mono',monospace", fontSize:10, letterSpacing:".14em", color:"rgba(212,175,55,.7)", animation:"fadeIn 1s ease .1s both" }}>
            <span style={{ display:"inline-block", width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 10px #22c55e", animation:"pulse 2s ease infinite" }} />
            BENIN CITY · NATIONWIDE · 100% AUTHENTIC
          </div>
          <h1 className="hero-h" style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, lineHeight:.95, marginBottom:8, fontSize:"clamp(56px,9vw,110px)", letterSpacing:"-.02em", animation:"fadeUp .9s ease .2s both" }}>
            <span style={{ color:"rgba(255,255,255,.9)" }}>Powering</span>
          </h1>
          <h1 className="hero-h" style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, lineHeight:.95, marginBottom:32, fontSize:"clamp(56px,9vw,110px)", letterSpacing:"-.02em", animation:"fadeUp .9s ease .3s both" }}>
            <span className="g">Connectivity</span>
          </h1>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"clamp(16px,2.5vw,24px)", color:"rgba(255,255,255,.3)", marginBottom:32, animation:"fadeUp .9s ease .4s both", letterSpacing:".02em" }}>
            — delivering quality since day one —
          </p>
          <p style={{ fontSize:"clamp(14px,1.8vw,17px)", color:"rgba(255,255,255,.45)", fontWeight:300, maxWidth:540, margin:"0 auto 52px", lineHeight:1.85, animation:"fadeUp .9s ease .5s both" }}>
            Benin City&apos;s premier destination for authentic gadgets &amp; tech solutions, curated personally by{" "}
            <span style={{ color:"#D4AF37", fontWeight:500 }}>Obinna David</span>, CEO.
          </p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:80, animation:"fadeUp .9s ease .6s both" }}>
            <a href="#products"
              style={{ display:"flex", alignItems:"center", gap:10, padding:"16px 44px", borderRadius:12, fontSize:14, fontWeight:700, letterSpacing:".06em", background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", boxShadow:"0 0 50px rgba(212,175,55,.25)", transition:"all .3s" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-3px)"; el.style.boxShadow="0 12px 60px rgba(212,175,55,.5)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform="none"; el.style.boxShadow="0 0 50px rgba(212,175,55,.25)"; }}>
              Shop Now <ArrowRight size={16}/>
            </a>
            <a href={MSG("Hi Dave Tech Hub! I'd like to speak with the CEO.")} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", gap:10, padding:"16px 44px", borderRadius:12, fontSize:14, fontWeight:500, letterSpacing:".06em", border:"1px solid rgba(212,175,55,.3)", color:"rgba(212,175,55,.9)", background:"transparent", transition:"all .3s" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(212,175,55,.08)"; el.style.borderColor="rgba(212,175,55,.6)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor="rgba(212,175,55,.3)"; }}>
              <MessageCircle size={16}/> Chat with CEO
            </a>
          </div>
          <div className="stats-wrap" style={{ display:"inline-flex", borderRadius:20, overflow:"hidden", border:"1px solid rgba(212,175,55,.12)", background:"rgba(10,10,10,.9)", backdropFilter:"blur(20px)", animation:"fadeUp .9s ease .8s both" }}>
            {[{v:"100+",l:"HAPPY USERS"},{v:"Multiple",l:"PRODUCTS"},{v:"100%",l:"AUTHENTIC"},{v:"5★",l:"RATED"}].map(({v,l},i) => (
              <div key={l} style={{ display:"flex" }}>
                {i>0 && <div style={{ width:1, background:"linear-gradient(180deg,transparent,rgba(212,175,55,.2),transparent)" }}/>}
                <div style={{ padding:"20px 36px", textAlign:"center" }}>
                  <div className="g" style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:28, lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:9, letterSpacing:".18em", color:"rgba(255,255,255,.28)", fontFamily:"'Space Mono',monospace", marginTop:5 }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{ padding:"120px 32px", background:"#080808", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)" }}/>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(212,175,55,.15),transparent)" }}/>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:72, flexWrap:"wrap", gap:24 }}>
            <div>
              <p style={{ fontSize:11, letterSpacing:".26em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginBottom:16 }}>WHAT WE OFFER</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", lineHeight:.95, letterSpacing:"-.01em" }}>
                <span style={{ color:"rgba(255,255,255,.85)" }}>Our </span><span className="g">Services</span>
              </h2>
            </div>
            <p style={{ fontSize:14, color:"rgba(255,255,255,.35)", maxWidth:300, lineHeight:1.7, fontWeight:300 }}>Everything you need from a premium tech partner — under one roof.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
            {SERVICES.map((s,i) => <SCard key={s.title} s={s} i={i}/>)}
          </div>
        </div>
      </section>

      {/* ═══ PRODUCTS ═══ */}
      <section id="products" style={{ padding:"120px 32px", background:"#060606", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(212,175,55,.15),transparent)" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(212,175,55,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.025) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1320, margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <p style={{ fontSize:11, letterSpacing:".26em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginBottom:16 }}>HAND PICKED</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", lineHeight:.95, letterSpacing:"-.01em" }}>
              <span className="g">Featured</span> <span style={{ color:"rgba(255,255,255,.85)" }}>Products</span>
            </h2>
            <p style={{ marginTop:20, fontSize:14, color:"rgba(255,255,255,.35)", maxWidth:420, margin:"20px auto 0", lineHeight:1.75, fontWeight:300 }}>Every item is 100% genuine. Tap any card to order instantly on WhatsApp.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(310px,1fr))", gap:24 }}>
            {productsLoading ? (
              <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 0", color:"rgba(255,255,255,.3)", fontSize:14 }}>Loading products...</div>
            ) : liveProducts.length === 0 ? (
              <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 0" }}>
                <Package size={40} color="rgba(212,175,55,.2)" style={{ margin:"0 auto 14px", display:"block" }}/>
                <p style={{ fontSize:14, color:"rgba(255,255,255,.3)" }}>Products coming soon. Check back shortly.</p>
              </div>
            ) : liveProducts.map((p, i) => <PCard key={p.id} p={p} i={i}/>)}
          </div>
          <div style={{ textAlign:"center", marginTop:64 }}>
            <a href={MSG("Hi! Please send me your full product catalogue.")} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"14px 40px", borderRadius:12, fontSize:13, fontWeight:700, letterSpacing:".06em", border:"1px solid rgba(212,175,55,.25)", color:"rgba(212,175,55,.8)", transition:"all .3s" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background="rgba(212,175,55,.07)"; el.style.borderColor="rgba(212,175,55,.5)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background="transparent"; el.style.borderColor="rgba(212,175,55,.25)"; }}>
              Full Catalogue on WhatsApp <ArrowRight size={14}/>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding:"120px 32px", background:"#080808", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)" }}/>
        <div className="about-grid" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:100, alignItems:"center" }}>
          <AboutLeft/>
          <AboutRight/>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding:"120px 32px", background:"#060606", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(212,175,55,.2),transparent)" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(212,175,55,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,55,.02) 1px,transparent 1px)", backgroundSize:"80px 80px", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1000, margin:"0 auto", position:"relative" }}>
          <div style={{ textAlign:"center", marginBottom:80 }}>
            <p style={{ fontSize:11, letterSpacing:".26em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginBottom:16 }}>REACH OUT</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", lineHeight:.95, letterSpacing:"-.01em", marginBottom:20 }}>
              <span style={{ color:"rgba(255,255,255,.85)" }}>Contact </span><span className="g">Us</span>
            </h2>
            <p style={{ fontSize:15, color:"rgba(255,255,255,.38)", fontWeight:300, maxWidth:460, margin:"0 auto", lineHeight:1.8 }}>Ready to upgrade your tech? Reach out instantly — we respond fast.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:60 }}>
            {CONTACT_CARDS.map(c => <CCard key={c.label} c={c}/>)}
          </div>
          <div style={{ textAlign:"center" }}>
            <a href={MSG("Hi Dave Tech Hub! I want to place an order.")} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:12, padding:"20px 60px", borderRadius:16, fontSize:17, fontWeight:700, letterSpacing:".06em", background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", boxShadow:"0 0 60px rgba(212,175,55,.25)", transition:"all .3s" }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.transform="translateY(-3px)"; el.style.boxShadow="0 16px 80px rgba(212,175,55,.5)"; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.transform="none"; el.style.boxShadow="0 0 60px rgba(212,175,55,.25)"; }}>
              <MessageCircle size={20}/> Order Now on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background:"#030303", borderTop:"1px solid rgba(212,175,55,.08)", padding:"64px 32px 36px" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr", gap:64, marginBottom:56 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#D4AF37,#B8860B)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L21 8V16L12 21L3 16V8Z" fill="none" stroke="#000" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="2" fill="#000"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:18, letterSpacing:".04em" }}>
                    <span className="g">DAVE</span><span style={{ color:"rgba(255,255,255,.7)" }}> TECH HUB</span>
                  </div>
                  <div style={{ fontSize:8, letterSpacing:".22em", color:"rgba(212,175,55,.4)", fontFamily:"'Space Mono',monospace" }}>CEO: OBINNA DAVID</div>
                </div>
              </div>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.28)", lineHeight:1.85, maxWidth:300, fontWeight:300, marginBottom:28 }}>
                Delivering quality, powering connectivity. Benin City&apos;s most trusted premium tech retailer, serving all of Nigeria.
              </p>
              <div style={{ display:"flex", gap:10 }}>
                <SocialIcon Icon={Instagram}/>
                <SocialIcon Icon={Twitter}/>
                <SocialIcon Icon={Facebook}/>
              </div>
            </div>
            <div>
              <p style={{ fontSize:10, letterSpacing:".22em", color:"rgba(212,175,55,.45)", fontFamily:"'Space Mono',monospace", marginBottom:24 }}>NAVIGATE</p>
              {NAV.map(({ label, href }) => (
                <a key={label} href={href} style={{ display:"block", fontSize:14, color:"rgba(255,255,255,.35)", marginBottom:14, transition:"color .2s", fontWeight:300 }}
                  onMouseEnter={e => e.currentTarget.style.color="#D4AF37"}
                  onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.35)"}>
                  {label}
                </a>
              ))}
            </div>
            <div>
              <p style={{ fontSize:10, letterSpacing:".22em", color:"rgba(212,175,55,.45)", fontFamily:"'Space Mono',monospace", marginBottom:24 }}>CONTACT</p>
              {[{l:"WhatsApp",v:"07070440191"},{l:"Location",v:"Benin City, Nigeria"},{l:"Delivery",v:"Nationwide"}].map(({ l, v }) => (
                <div key={l} style={{ marginBottom:18 }}>
                  <p style={{ fontSize:9, letterSpacing:".16em", color:"rgba(212,175,55,.4)", fontFamily:"'Space Mono',monospace", marginBottom:3 }}>{l}</p>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.42)", fontWeight:300 }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.05)", paddingTop:28, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ fontSize:11, color:"rgba(255,255,255,.16)", fontWeight:300 }}>© {new Date().getFullYear()} Dave Tech Hub. All rights reserved.</p>
            <p style={{ fontSize:9, fontFamily:"'Space Mono',monospace", color:"rgba(212,175,55,.3)", letterSpacing:".16em" }}>DELIVERING QUALITY · POWERING CONNECTIVITY</p>
          </div>
        </div>
      </footer>
    </div>
  );
}