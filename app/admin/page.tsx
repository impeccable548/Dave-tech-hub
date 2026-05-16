"use client";

import { useEffect, useState, useRef } from "react";
import { supabase, type Product } from "@/lib/supabase";
import {
  LogOut, Plus, Pencil, Trash2, Upload, X, Check,
  Eye, EyeOff, Package, TrendingUp, ShoppingBag, Star
} from "lucide-react";

const BADGES = ["", "HOT", "NEW", "SALE"];
const CATEGORIES = ["Smartphones", "Laptops", "Audio", "Tablets", "Accessories", "Other"];

// ── Login Screen ──
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) { setError(err.message); setLoading(false); return; }
    onLogin();
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#060606", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}input{outline:none}`}</style>

      <div style={{ width:"100%", maxWidth:420 }}>
        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ width:56, height:56, borderRadius:14, background:"linear-gradient(135deg,#D4AF37,#B8860B)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", boxShadow:"0 0 40px rgba(212,175,55,.3)" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L21 8V16L12 21L3 16V8Z" fill="none" stroke="#000" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="2" fill="#000"/>
            </svg>
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:22, marginBottom:4 }}>
            <span style={{ background:"linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>DAVE</span>
            <span style={{ color:"rgba(255,255,255,.8)" }}> TECH HUB</span>
          </div>
          <p style={{ fontSize:12, letterSpacing:".2em", color:"rgba(212,175,55,.45)", fontFamily:"'Space Mono',monospace" }}>ADMIN PORTAL</p>
        </div>

        {/* Card */}
        <div style={{ background:"#0c0c0c", border:"1px solid rgba(212,175,55,.15)", borderRadius:20, padding:36 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:26, marginBottom:8, color:"#fff" }}>Welcome back</h2>
          <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", marginBottom:32, fontWeight:300 }}>Sign in to manage your products.</p>

          {error && (
            <div style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.3)", borderRadius:10, padding:"12px 16px", marginBottom:20, fontSize:13, color:"#fca5a5" }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom:18 }}>
            <label style={{ display:"block", fontSize:11, letterSpacing:".16em", color:"rgba(212,175,55,.6)", fontFamily:"'Space Mono',monospace", marginBottom:8 }}>EMAIL</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="your@email.com"
              style={{ width:"100%", padding:"13px 16px", borderRadius:10, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"#fff", fontSize:14, transition:"border-color .2s", fontFamily:"'DM Sans',sans-serif" }}
              onFocus={e => e.target.style.borderColor="rgba(212,175,55,.5)"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,.08)"}
            />
          </div>

          <div style={{ marginBottom:28 }}>
            <label style={{ display:"block", fontSize:11, letterSpacing:".16em", color:"rgba(212,175,55,.6)", fontFamily:"'Space Mono',monospace", marginBottom:8 }}>PASSWORD</label>
            <div style={{ position:"relative" }}>
              <input
                type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="••••••••"
                style={{ width:"100%", padding:"13px 48px 13px 16px", borderRadius:10, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"#fff", fontSize:14, transition:"border-color .2s", fontFamily:"'DM Sans',sans-serif" }}
                onFocus={e => e.target.style.borderColor="rgba(212,175,55,.5)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,.08)"}
              />
              <button onClick={() => setShowPass(!showPass)}
                style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(255,255,255,.3)", padding:0 }}>
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          <button onClick={handleLogin} disabled={loading}
            style={{ width:"100%", padding:"14px", borderRadius:10, background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", fontWeight:700, fontSize:14, border:"none", cursor:loading?"not-allowed":"pointer", opacity:loading?.7:1, transition:"all .3s", letterSpacing:".04em" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Product Form Modal ──
function ProductForm({ product, onSave, onClose }: { product: Product | null; onSave: () => void; onClose: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    original_price: product?.original_price || "",
    badge: product?.badge || "",
    category: product?.category || "",
    description: product?.description || "",
    image_url: product?.image_url || "",
    available: product?.available ?? true,
    featured: product?.featured ?? false,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("product-images").upload(path, file);
    if (upErr) { setError(upErr.message); setUploading(false); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm(f => ({ ...f, image_url: data.publicUrl }));
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) { setError("Name and price are required."); return; }
    setSaving(true);
    setError("");
    if (product) {
      const { error: err } = await supabase.from("products").update(form).eq("id", product.id);
      if (err) { setError(err.message); setSaving(false); return; }
    } else {
      const { error: err } = await supabase.from("products").insert([form]);
      if (err) { setError(err.message); setSaving(false); return; }
    }
    setSaving(false);
    onSave();
  };

  const inputStyle = { width:"100%", padding:"11px 14px", borderRadius:9, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", color:"#fff", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none" };
  const labelStyle = { display:"block" as const, fontSize:10, letterSpacing:".16em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginBottom:6 };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.8)", backdropFilter:"blur(10px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ width:"100%", maxWidth:560, background:"#0c0c0c", border:"1px solid rgba(212,175,55,.2)", borderRadius:24, maxHeight:"90vh", overflowY:"auto" }}>
        <div style={{ padding:"28px 28px 0", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:22, color:"#fff" }}>
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} style={{ width:36, height:36, borderRadius:9, border:"1px solid rgba(255,255,255,.1)", background:"transparent", cursor:"pointer", color:"rgba(255,255,255,.5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <X size={16}/>
          </button>
        </div>

        <div style={{ padding:"0 28px 28px" }}>
          {error && <div style={{ background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.3)", borderRadius:9, padding:"10px 14px", marginBottom:16, fontSize:12, color:"#fca5a5" }}>{error}</div>}

          {/* Image upload */}
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>PRODUCT IMAGE</label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{ width:"100%", height:140, borderRadius:12, border:"1px dashed rgba(212,175,55,.25)", display:"flex", flexDirection:"column" as const, alignItems:"center", justifyContent:"center", cursor:"pointer", background:"rgba(212,175,55,.03)", transition:"all .3s", position:"relative", overflow:"hidden" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor="rgba(212,175,55,.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor="rgba(212,175,55,.25)")}>
              {form.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image_url} alt="preview" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:12 }}/>
              ) : (
                <>
                  <Upload size={24} color="rgba(212,175,55,.4)" style={{ marginBottom:8 }}/>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,.3)" }}>{uploading ? "Uploading..." : "Click to upload image"}</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadImage(f); }}/>
          </div>

          {/* Name */}
          <div style={{ marginBottom:16 }}>
            <label style={labelStyle}>PRODUCT NAME *</label>
            <input value={form.name} onChange={e => setForm(f => ({...f, name:e.target.value}))} placeholder="e.g. iPhone 15 Pro Max" style={inputStyle}
              onFocus={e => e.target.style.borderColor="rgba(212,175,55,.5)"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,.08)"}/>
          </div>

          {/* Price row */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <label style={labelStyle}>PRICE *</label>
              <input value={form.price} onChange={e => setForm(f => ({...f, price:e.target.value}))} placeholder="₦150,000" style={inputStyle}
                onFocus={e => e.target.style.borderColor="rgba(212,175,55,.5)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,.08)"}/>
            </div>
            <div>
              <label style={labelStyle}>ORIGINAL PRICE</label>
              <input value={form.original_price} onChange={e => setForm(f => ({...f, original_price:e.target.value}))} placeholder="₦200,000" style={inputStyle}
                onFocus={e => e.target.style.borderColor="rgba(212,175,55,.5)"}
                onBlur={e => e.target.style.borderColor="rgba(255,255,255,.08)"}/>
            </div>
          </div>

          {/* Badge + Category */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            <div>
              <label style={labelStyle}>BADGE</label>
              <select value={form.badge} onChange={e => setForm(f => ({...f, badge:e.target.value}))}
                style={{ ...inputStyle, cursor:"pointer" }}>
                {BADGES.map(b => <option key={b} value={b} style={{ background:"#1a1a1a" }}>{b || "None"}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>CATEGORY</label>
              <select value={form.category} onChange={e => setForm(f => ({...f, category:e.target.value}))}
                style={{ ...inputStyle, cursor:"pointer" }}>
                <option value="" style={{ background:"#1a1a1a" }}>Select...</option>
                {CATEGORIES.map(c => <option key={c} value={c} style={{ background:"#1a1a1a" }}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom:20 }}>
            <label style={labelStyle}>DESCRIPTION</label>
            <textarea value={form.description} onChange={e => setForm(f => ({...f, description:e.target.value}))}
              placeholder="Brief product description..."
              rows={3}
              style={{ ...inputStyle, resize:"none" as const, lineHeight:1.6 }}
              onFocus={e => e.target.style.borderColor="rgba(212,175,55,.5)"}
              onBlur={e => e.target.style.borderColor="rgba(255,255,255,.08)"}/>
          </div>

          {/* Toggles */}
          <div style={{ display:"flex", gap:16, marginBottom:28 }}>
            {[
              { key:"available", label:"Available" },
              { key:"featured", label:"Featured" },
            ].map(({ key, label }) => (
              <button key={key} onClick={() => setForm(f => ({...f, [key]: !f[key as keyof typeof f]}))}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 16px", borderRadius:9, border:`1px solid ${form[key as keyof typeof form] ? "rgba(212,175,55,.5)" : "rgba(255,255,255,.1)"}`, background:form[key as keyof typeof form] ? "rgba(212,175,55,.1)" : "transparent", color:form[key as keyof typeof form] ? "#D4AF37" : "rgba(255,255,255,.4)", fontSize:13, cursor:"pointer", transition:"all .2s" }}>
                {form[key as keyof typeof form] ? <Check size={14}/> : <X size={14}/>}
                {label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={onClose}
              style={{ flex:1, padding:"13px", borderRadius:10, border:"1px solid rgba(255,255,255,.1)", background:"transparent", color:"rgba(255,255,255,.5)", fontSize:13, fontWeight:600, cursor:"pointer" }}>
              Cancel
            </button>
            <button onClick={handleSave} disabled={saving}
              style={{ flex:2, padding:"13px", borderRadius:10, background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", fontSize:13, fontWeight:700, border:"none", cursor:saving?"not-allowed":"pointer", opacity:saving?.7:1, letterSpacing:".04em" }}>
              {saving ? "Saving..." : product ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ──
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | Product | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    setDeleting(id);
    await supabase.from("products").delete().eq("id", id);
    await fetchProducts();
    setDeleting(null);
  };

  const toggleAvailable = async (p: Product) => {
    await supabase.from("products").update({ available: !p.available }).eq("id", p.id);
    fetchProducts();
  };

  const stats = [
    { icon:ShoppingBag, label:"Total Products", val:products.length },
    { icon:Check, label:"Available", val:products.filter(p => p.available).length },
    { icon:Star, label:"Featured", val:products.filter(p => p.featured).length },
    { icon:TrendingUp, label:"Out of Stock", val:products.filter(p => !p.available).length },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#060606", fontFamily:"'DM Sans',sans-serif", color:"#fff" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}`}</style>

      {/* Header */}
      <header style={{ background:"rgba(10,10,10,.95)", borderBottom:"1px solid rgba(212,175,55,.1)", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(20px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:9, background:"linear-gradient(135deg,#D4AF37,#B8860B)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L21 8V16L12 21L3 16V8Z" fill="none" stroke="#000" strokeWidth="1.8"/>
              <circle cx="12" cy="12" r="2" fill="#000"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:16 }}>
              <span style={{ background:"linear-gradient(135deg,#BF953F,#FCF6BA,#B38728)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>DAVE</span>
              <span style={{ color:"rgba(255,255,255,.7)" }}> TECH HUB</span>
            </div>
            <div style={{ fontSize:8, letterSpacing:".2em", color:"rgba(212,175,55,.4)", fontFamily:"'Space Mono',monospace" }}>ADMIN PORTAL</div>
          </div>
        </div>
        <button onClick={onLogout}
          style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:9, border:"1px solid rgba(255,255,255,.1)", background:"transparent", color:"rgba(255,255,255,.4)", fontSize:13, cursor:"pointer", transition:"all .2s" }}
          onMouseEnter={e => { const el=e.currentTarget; el.style.borderColor="rgba(239,68,68,.4)"; el.style.color="#f87171"; }}
          onMouseLeave={e => { const el=e.currentTarget; el.style.borderColor="rgba(255,255,255,.1)"; el.style.color="rgba(255,255,255,.4)"; }}>
          <LogOut size={14}/> Sign Out
        </button>
      </header>

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"40px 32px" }}>
        {/* Page title + add btn */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36, flexWrap:"wrap", gap:16 }}>
          <div>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:36, lineHeight:1, marginBottom:6 }}>Products</h1>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.35)", fontWeight:300 }}>Manage your product listings. Changes go live instantly.</p>
          </div>
          <button onClick={() => setModal("add")}
            style={{ display:"flex", alignItems:"center", gap:9, padding:"12px 24px", borderRadius:11, background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", fontWeight:700, fontSize:14, border:"none", cursor:"pointer", boxShadow:"0 0 30px rgba(212,175,55,.2)", transition:"all .3s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 30px rgba(212,175,55,.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="0 0 30px rgba(212,175,55,.2)"; }}>
            <Plus size={16}/> Add Product
          </button>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:40 }}>
          {stats.map(({ icon:Icon, label, val }) => (
            <div key={label} style={{ background:"#0c0c0c", border:"1px solid rgba(255,255,255,.06)", borderRadius:16, padding:"20px 24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:9, background:"rgba(212,175,55,.08)", border:"1px solid rgba(212,175,55,.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon size={16} color="#D4AF37"/>
                </div>
                <p style={{ fontSize:11, color:"rgba(255,255,255,.35)", letterSpacing:".1em", fontFamily:"'Space Mono',monospace" }}>{label.toUpperCase()}</p>
              </div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:36, color:"#D4AF37", lineHeight:1 }}>{val}</p>
            </div>
          ))}
        </div>

        {/* Products grid */}
        {loading ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"rgba(255,255,255,.3)", fontSize:14 }}>Loading products...</div>
        ) : products.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <Package size={48} color="rgba(212,175,55,.2)" style={{ margin:"0 auto 16px", display:"block" }}/>
            <p style={{ fontSize:16, color:"rgba(255,255,255,.3)", marginBottom:8 }}>No products yet</p>
            <p style={{ fontSize:13, color:"rgba(255,255,255,.2)", fontWeight:300 }}>Click "Add Product" to get started.</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
            {products.map(p => (
              <div key={p.id} style={{ background:"#0c0c0c", border:"1px solid rgba(255,255,255,.07)", borderRadius:20, overflow:"hidden", transition:"border-color .3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="rgba(212,175,55,.25)"}
                onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,.07)"}>
                {/* Image */}
                <div style={{ height:160, background:"rgba(255,255,255,.03)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image_url} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  ) : (
                    <Package size={36} color="rgba(212,175,55,.2)"/>
                  )}
                  {p.badge && (
                    <div style={{ position:"absolute", top:10, left:10, background:"linear-gradient(135deg,#D4AF37,#B8860B)", color:"#000", fontSize:9, fontWeight:800, padding:"3px 10px", borderRadius:99, fontFamily:"'Space Mono',monospace", letterSpacing:".15em" }}>{p.badge}</div>
                  )}
                  {!p.available && (
                    <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:11, color:"rgba(255,255,255,.6)", fontFamily:"'Space Mono',monospace", letterSpacing:".12em" }}>UNAVAILABLE</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ padding:"18px 18px 14px" }}>
                  {p.category && <p style={{ fontSize:9, letterSpacing:".18em", color:"rgba(212,175,55,.5)", fontFamily:"'Space Mono',monospace", marginBottom:6 }}>{p.category.toUpperCase()}</p>}
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:17, marginBottom:6, color:"#f5f0e8", lineHeight:1.2 }}>{p.name}</h3>
                  <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:14 }}>
                    <span style={{ color:"#D4AF37", fontWeight:700, fontSize:18, fontFamily:"'Cormorant Garamond',serif" }}>{p.price}</span>
                    {p.original_price && <span style={{ fontSize:12, textDecoration:"line-through", color:"rgba(255,255,255,.25)" }}>{p.original_price}</span>}
                  </div>

                  {/* Actions */}
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={() => toggleAvailable(p)}
                      style={{ flex:1, padding:"8px", borderRadius:8, border:`1px solid ${p.available?"rgba(34,197,94,.3)":"rgba(255,255,255,.1)"}`, background:p.available?"rgba(34,197,94,.08)":"transparent", color:p.available?"#86efac":"rgba(255,255,255,.4)", fontSize:11, cursor:"pointer", transition:"all .2s", fontFamily:"'Space Mono',monospace", letterSpacing:".08em" }}>
                      {p.available ? "LIVE" : "HIDDEN"}
                    </button>
                    <button onClick={() => setModal(p)}
                      style={{ width:36, height:36, borderRadius:8, border:"1px solid rgba(255,255,255,.1)", background:"transparent", color:"rgba(255,255,255,.4)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(212,175,55,.4)"; e.currentTarget.style.color="#D4AF37"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.color="rgba(255,255,255,.4)"; }}>
                      <Pencil size={13}/>
                    </button>
                    <button onClick={() => deleteProduct(p.id)} disabled={deleting===p.id}
                      style={{ width:36, height:36, borderRadius:8, border:"1px solid rgba(255,255,255,.1)", background:"transparent", color:"rgba(255,255,255,.4)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(239,68,68,.4)"; e.currentTarget.style.color="#f87171"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; e.currentTarget.style.color="rgba(255,255,255,.4)"; }}>
                      <Trash2 size={13}/>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <ProductForm
          product={modal === "add" ? null : modal}
          onSave={() => { setModal(null); fetchProducts(); }}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

// ── Root ──
export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(false);
  };

  if (session === null) return (
    <div style={{ minHeight:"100vh", background:"#060606", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ width:40, height:40, borderRadius:"50%", border:"2px solid rgba(212,175,55,.2)", borderTopColor:"#D4AF37", animation:"spin .8s linear infinite" }}/>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return session ? <Dashboard onLogout={handleLogout}/> : <LoginScreen onLogin={() => setSession(true)}/>;
}