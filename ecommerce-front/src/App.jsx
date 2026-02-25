import { useState, useEffect, useContext, createContext, useCallback } from "react";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8080";

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
function useAuth() { return useContext(AuthContext); }

// ─── API ──────────────────────────────────────────────────────────────────────
function useApi() {
  const { token } = useAuth();
  const request = useCallback(async (method, path, body = null) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${path}`, {
      method, headers, body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) { const err = await res.text(); throw new Error(err || `Error ${res.status}`); }
    if (res.status === 204) return null;
    return res.json();
  }, [token]);
  return {
    get: (p) => request("GET", p),
    post: (p, b) => request("POST", p, b),
    put: (p, b) => request("PUT", p, b),
    del: (p) => request("DELETE", p),
  };
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Lato:wght@300;400;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #faf7f2;
  --surface:   #f4efe6;
  --card:      #fffdf9;
  --border:    #e8dfc8;
  --terra:     #c0533a;
  --terra-d:   #9a3f2a;
  --terra-l:   #f0ded8;
  --olive:     #6b7c4a;
  --olive-l:   #e8eddc;
  --brown:     #5c3d1e;
  --brown-l:   #a07850;
  --ink:       #2a1f0f;
  --muted:     #9a8a75;
  --cream:     #faf7f2;
  --radius:    6px;
  --shadow:    0 2px 16px rgba(42,31,15,0.08);
  --shadow-lg: 0 8px 40px rgba(42,31,15,0.14);
}

body {
  background: var(--bg);
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  color: var(--ink);
  font-family: 'Lato', sans-serif;
  font-size: 14px;
  min-height: 100vh;
  line-height: 1.6;
}

h1, h2, h3, h4 { font-family: 'Playfair Display', serif; font-weight: 400; line-height: 1.2; }

.app { min-height: 100vh; display: flex; flex-direction: column; }

/* ── HERO BANNER ── */
.hero {
  background: var(--brown);
  background-image: linear-gradient(135deg, #3a1f0a 0%, #6b3d1e 50%, #8b5e2a 100%);
  color: var(--cream);
  text-align: center;
  padding: 5rem 2rem 4rem;
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23ffffff' opacity='0.06'/%3E%3C/svg%3E");
  animation: drift 20s linear infinite;
}
@keyframes drift { to { background-position: 60px 60px; } }
.hero-tag {
  display: inline-block;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  color: #f0d9b0;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 5px 16px;
  border-radius: 999px;
  margin-bottom: 1.5rem;
  position: relative;
}
.hero-title {
  font-size: clamp(3.5rem, 10vw, 7rem);
  font-style: italic;
  color: #fff;
  margin-bottom: 0.5rem;
  position: relative;
  letter-spacing: -0.01em;
}
.hero-title span { color: #f0c070; }
.hero-sub {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.7);
  margin-bottom: 2.5rem;
  position: relative;
  letter-spacing: 0.03em;
}
.hero-cta {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--terra);
  color: #fff;
  border: none; cursor: pointer;
  font-family: 'Lato', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 999px;
  transition: all 0.2s;
  position: relative;
  box-shadow: 0 4px 20px rgba(192,83,58,0.4);
}
.hero-cta:hover { background: var(--terra-d); transform: translateY(-1px); box-shadow: 0 6px 28px rgba(192,83,58,0.5); }

/* ── NAV ── */
.nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(250,247,242,0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 2rem; height: 64px;
  box-shadow: 0 1px 8px rgba(42,31,15,0.06);
}
.nav-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem; font-style: italic;
  color: var(--brown); cursor: pointer;
  display: flex; align-items: center; gap: 8px;
}
.nav-brand-dot { color: var(--terra); }
.nav-links { display: flex; gap: 0.25rem; align-items: center; }
.nav-btn {
  background: none; border: none; color: var(--muted);
  font-family: 'Lato', sans-serif;
  font-size: 12px; font-weight: 700;
  padding: 7px 14px; cursor: pointer;
  letter-spacing: 0.08em; text-transform: uppercase;
  transition: color 0.2s; border-radius: var(--radius);
}
.nav-btn:hover, .nav-btn.active { color: var(--brown); }
.nav-btn.cta {
  background: var(--terra); color: #fff;
  border-radius: 999px; padding: 7px 18px;
}
.nav-btn.cta:hover { background: var(--terra-d); }
.nav-badge {
  background: var(--terra); color: #fff;
  font-size: 9px; padding: 2px 6px;
  border-radius: 999px; margin-left: 3px; font-weight: 700;
}

/* ── PAGE ── */
.page { flex: 1; max-width: 1160px; margin: 0 auto; width: 100%; padding: 2.5rem 2rem; }
.page-header { margin-bottom: 2rem; }
.page-title { font-size: clamp(1.8rem, 4vw, 2.8rem); color: var(--brown); margin-bottom: 0.25rem; }
.page-sub { color: var(--muted); font-size: 12px; letter-spacing: 0.05em; }

/* ── SECTION DIVIDER ── */
.section-label {
  display: flex; align-items: center; gap: 1rem;
  margin: 2rem 0 1.25rem;
}
.section-label span {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem; color: var(--brown); white-space: nowrap;
}
.section-label::before, .section-label::after {
  content: ''; flex: 1; height: 1px; background: var(--border);
}

/* ── FORMS ── */
.form-card {
  max-width: 440px; margin: 3rem auto;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: var(--shadow-lg);
}
.form-brand { text-align: center; margin-bottom: 2rem; }
.form-brand-name { font-family: 'Playfair Display', serif; font-size: 2.2rem; font-style: italic; color: var(--brown); }
.form-brand-name span { color: var(--terra); }
.form-title { font-size: 1.6rem; margin-bottom: 0.25rem; color: var(--ink); }
.form-sub { color: var(--muted); font-size: 12px; margin-bottom: 1.75rem; }
.field { margin-bottom: 1.1rem; }
.field label { display: block; color: var(--brown); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
.field input, .field select, .field textarea {
  width: 100%; background: var(--surface);
  border: 1.5px solid var(--border);
  color: var(--ink); font-family: 'Lato', sans-serif; font-size: 14px;
  padding: 10px 14px; border-radius: var(--radius);
  outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus, .field select:focus, .field textarea:focus {
  border-color: var(--terra); box-shadow: 0 0 0 3px rgba(192,83,58,0.1);
}
.field textarea { min-height: 80px; resize: vertical; }
.field select option { background: var(--surface); }

/* ── BUTTONS ── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  border: none; cursor: pointer; font-family: 'Lato', sans-serif;
  font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 11px 22px; border-radius: var(--radius); transition: all 0.18s;
}
.btn-primary { background: var(--terra); color: #fff; box-shadow: 0 2px 12px rgba(192,83,58,0.3); }
.btn-primary:hover { background: var(--terra-d); transform: translateY(-1px); }
.btn-olive { background: var(--olive); color: #fff; }
.btn-olive:hover { background: #5a6a3a; }
.btn-outline { background: none; border: 1.5px solid var(--border); color: var(--brown); }
.btn-outline:hover { border-color: var(--terra); color: var(--terra); }
.btn-danger { background: none; border: 1.5px solid #f0d0c8; color: var(--terra); }
.btn-danger:hover { background: var(--terra-l); }
.btn-sm { padding: 6px 14px; font-size: 11px; }
.btn-full { width: 100%; }
.btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; }

/* ── SEARCH ── */
.search-bar {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 1.75rem; flex-wrap: wrap;
}
.search-input-wrap { position: relative; flex: 1; min-width: 220px; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 14px; }
.search-input {
  width: 100%; background: var(--card);
  border: 1.5px solid var(--border);
  color: var(--ink); font-family: 'Lato', sans-serif; font-size: 13px;
  padding: 10px 14px 10px 36px; border-radius: 999px; outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input:focus { border-color: var(--terra); box-shadow: 0 0 0 3px rgba(192,83,58,0.1); }
.filter-chip {
  background: var(--card); border: 1.5px solid var(--border);
  color: var(--muted); font-family: 'Lato', sans-serif;
  font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 7px 14px; border-radius: 999px; cursor: pointer;
  transition: all 0.15s;
}
.filter-chip:hover, .filter-chip.active { background: var(--terra-l); border-color: var(--terra); color: var(--terra); }

/* ── PLATOS GRID ── */
.platos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.plato-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 10px; overflow: hidden; cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow);
}
.plato-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); }
.plato-img {
  width: 100%; aspect-ratio: 4/3; object-fit: cover;
  background: var(--surface);
}
.plato-img-placeholder {
  width: 100%; aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--surface) 0%, var(--border) 100%);
  display: flex; align-items: center; justify-content: center;
  font-size: 3rem; color: var(--border);
}
.plato-body { padding: 1.25rem; }
.plato-category {
  display: inline-block;
  background: var(--olive-l); color: var(--olive);
  font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 3px 10px; border-radius: 999px; margin-bottom: 0.6rem;
}
.plato-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; margin-bottom: 0.4rem; color: var(--ink); }
.plato-desc { color: var(--muted); font-size: 12px; line-height: 1.6; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.plato-footer { display: flex; align-items: center; justify-content: space-between; }
.plato-price { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: var(--terra); }
.plato-stock { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; }
.stock-ok { color: var(--olive); }
.stock-low { color: var(--terra); }

/* ── DETAIL ── */
.back-btn { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: 0.06em; cursor: pointer; border: none; background: none; padding: 0; margin-bottom: 2rem; transition: color 0.15s; text-transform: uppercase; }
.back-btn:hover { color: var(--terra); }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
.detail-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; border-radius: 10px; box-shadow: var(--shadow-lg); }
.detail-img-placeholder { width: 100%; aspect-ratio: 4/3; background: linear-gradient(135deg, var(--surface), var(--border)); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 5rem; color: var(--border); }
.detail-category { display: inline-block; background: var(--olive-l); color: var(--olive); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 12px; border-radius: 999px; margin-bottom: 0.75rem; }
.detail-title { font-size: 2.2rem; color: var(--ink); margin-bottom: 0.5rem; }
.detail-brand { color: var(--muted); font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.25rem; }
.detail-price { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--terra); margin-bottom: 1.25rem; }
.detail-desc { color: #6a5a48; line-height: 1.8; font-size: 13px; margin-bottom: 1.5rem; }
.detail-stock { font-size: 12px; font-weight: 700; margin-bottom: 1.25rem; }
.qty-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
.qty-btn { background: var(--surface); border: 1.5px solid var(--border); color: var(--brown); width: 36px; height: 36px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius); transition: all 0.15s; }
.qty-btn:hover { border-color: var(--terra); color: var(--terra); }
.qty-val { min-width: 36px; text-align: center; font-size: 15px; font-weight: 700; color: var(--brown); }
.qty-label { color: var(--muted); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }

/* ── CART ── */
.cart-layout { display: grid; grid-template-columns: 1fr 360px; gap: 2rem; align-items: start; }
.cart-item { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem; box-shadow: var(--shadow); }
.cart-item-thumb { width: 72px; height: 72px; object-fit: cover; border-radius: 6px; background: var(--surface); flex-shrink: 0; }
.cart-item-thumb-placeholder { width: 72px; height: 72px; background: var(--surface); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; flex-shrink: 0; }
.cart-item-info { flex: 1; }
.cart-item-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; margin-bottom: 0.2rem; color: var(--ink); }
.cart-item-price { color: var(--terra); font-size: 12px; font-weight: 700; }
.cart-item-actions { display: flex; align-items: center; gap: 0.5rem; }
.summary-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 1.75rem; position: sticky; top: 84px; box-shadow: var(--shadow-lg); }
.summary-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--brown); margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }
.summary-row { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 13px; color: var(--muted); }
.summary-total { display: flex; justify-content: space-between; padding: 1rem 0 0; margin-top: 0.75rem; border-top: 1px solid var(--border); }
.summary-total-label { font-family: 'Playfair Display', serif; font-size: 1.2rem; color: var(--brown); }
.summary-total-val { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: var(--terra); }

/* ── ORDERS ── */
.order-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; box-shadow: var(--shadow); }
.order-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
.order-num { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: var(--brown); }
.order-date { color: var(--muted); font-size: 11px; margin-top: 3px; }
.order-addr { color: var(--muted); font-size: 12px; margin-bottom: 0.75rem; }
.status-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; }
.status-PENDING   { background: #fdf3e0; color: #b07820; border: 1px solid #f0d890; }
.status-PAID      { background: var(--olive-l); color: var(--olive); border: 1px solid #c8d8a8; }
.status-SHIPPED   { background: #e0eef8; color: #2860a0; border: 1px solid #b0ccec; }
.status-DELIVERED { background: #e0f4e0; color: #206820; border: 1px solid #a0d8a0; }
.status-CANCELLED { background: var(--terra-l); color: var(--terra-d); border: 1px solid #e0b8b0; }
.order-items-list { border-top: 1px solid var(--border); padding-top: 0.75rem; margin-top: 0.75rem; }
.order-item-row { display: flex; justify-content: space-between; padding: 0.3rem 0; font-size: 12px; color: var(--muted); }

/* ── ADMIN ── */
.admin-tabs { display: flex; gap: 0; border-bottom: 2px solid var(--border); margin-bottom: 2rem; }
.admin-tab { background: none; border: none; border-bottom: 3px solid transparent; color: var(--muted); font-family: 'Lato', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 10px 20px; cursor: pointer; transition: all 0.15s; margin-bottom: -2px; }
.admin-tab.active { color: var(--terra); border-bottom-color: var(--terra); }
.table { width: 100%; border-collapse: collapse; }
.table th { color: var(--muted); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 14px; text-align: left; border-bottom: 2px solid var(--border); }
.table td { padding: 12px 14px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--ink); vertical-align: middle; }
.table tr:hover td { background: var(--surface); }

/* ── MODALS ── */
.modal-overlay { position: fixed; inset: 0; background: rgba(42,31,15,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; backdrop-filter: blur(4px); }
.modal { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; width: 100%; max-width: 520px; max-height: 90vh; overflow-y: auto; box-shadow: var(--shadow-lg); }
.modal-title { font-family: 'Playfair Display', serif; font-size: 1.7rem; color: var(--brown); margin-bottom: 1.5rem; }
.modal-footer { display: flex; gap: 0.75rem; margin-top: 1.5rem; justify-content: flex-end; }

/* ── ALERTS ── */
.alert { padding: 10px 16px; border-radius: var(--radius); font-size: 12px; margin-bottom: 1rem; font-weight: 700; }
.alert-error { background: var(--terra-l); border: 1px solid #e0b8b0; color: var(--terra-d); }
.alert-success { background: var(--olive-l); border: 1px solid #c0d8a0; color: var(--olive); }

/* ── MISC ── */
.spinner { display: inline-block; width: 20px; height: 20px; border: 2px solid var(--border); border-top-color: var(--terra); border-radius: 50%; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.loading-center { display: flex; align-items: center; justify-content: center; min-height: 240px; flex-direction: column; gap: 1rem; color: var(--muted); }
.empty { text-align: center; padding: 4rem 2rem; }
.empty-icon { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.25; }
.empty-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--brown); margin-bottom: 0.5rem; }
.empty-sub { color: var(--muted); font-size: 13px; margin-bottom: 1.5rem; }
.divider { border: none; border-top: 1px solid var(--border); margin: 1.5rem 0; }
.chip { display: inline-flex; align-items: center; background: var(--surface); border: 1px solid var(--border); color: var(--muted); font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; }
.link-btn { background: none; border: none; color: var(--terra); cursor: pointer; font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700; text-decoration: underline; padding: 0; }
.link-btn:hover { color: var(--terra-d); }

@media (max-width: 768px) {
  .detail-grid, .cart-layout { grid-template-columns: 1fr; }
  .hero-title { font-size: 3rem; }
}
`;

// ─── UTILS ────────────────────────────────────────────────────────────────────
function parseJwt(t) {
  try { return JSON.parse(atob(t.split(".")[1])); } catch { return null; }
}
function fmt(n) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n ?? 0);
}
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}
function cartTotal(items = []) {
  return items.reduce((s, i) => s + i.productPrice * i.quantity, 0);
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Spinner({ text = "Cargando platos…" }) {
  return (
    <div className="loading-center">
      <div className="spinner" />
      <span style={{ color: "var(--muted)", fontSize: 12 }}>{text}</span>
    </div>
  );
}
function Alert({ type = "error", msg }) {
  if (!msg) return null;
  return <div className={`alert alert-${type}`}>{msg}</div>;
}
function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, cartCount }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => setPage("home")}>
        <span style={{ fontSize: "1.4rem" }}>🍲</span>
        Bishul<span className="nav-brand-dot">.</span>
      </div>
      <div className="nav-links">
        <button className={`nav-btn ${page === "home" || page === "products" ? "active" : ""}`} onClick={() => setPage("home")}>Menú</button>
        {user && (
          <>
            <button className={`nav-btn ${page === "cart" ? "active" : ""}`} onClick={() => setPage("cart")}>
              Pedido{cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>
            <button className={`nav-btn ${page === "my-orders" ? "active" : ""}`} onClick={() => setPage("my-orders")}>Mis pedidos</button>
            {isAdmin && (
              <button className={`nav-btn ${page === "admin" ? "active" : ""}`} onClick={() => setPage("admin")}>Admin</button>
            )}
            <button className="nav-btn cta" onClick={logout}>Salir</button>
          </>
        )}
        {!user && (
          <>
            <button className={`nav-btn ${page === "login" ? "active" : ""}`} onClick={() => setPage("login")}>Acceder</button>
            <button className="nav-btn cta" onClick={() => setPage("register")}>Registrarse</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── HOME / HERO ──────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <div className="hero">
        <div className="hero-tag">✦ Cocina casera · Entrega a domicilio ✦</div>
        <h1 className="hero-title"><span>Bish</span>ul</h1>
        <p className="hero-sub">בישול — Cocinado con amor, entregado en tu puerta</p>
        <button className="hero-cta" onClick={() => setPage("products")}>
          Ver el menú de hoy →
        </button>
      </div>
      <div className="page">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem", margin: "3rem 0" }}>
          {[
            { icon: "🥘", title: "Recién cocinado", desc: "Cada plato se prepara tras recibir tu pedido" },
            { icon: "🚴", title: "Entrega rápida", desc: "De nuestra cocina a tu puerta en menos de 60 min" },
            { icon: "🌿", title: "Ingredientes frescos", desc: "Productos de temporada y productores locales" },
            { icon: "❤️", title: "Con cariño", desc: "Recetas tradicionales con el toque de siempre" },
          ].map(f => (
            <div key={f.title} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10, padding: "1.5rem", textAlign: "center", boxShadow: "var(--shadow)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem", marginBottom: "0.4rem", color: "var(--brown)" }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 12, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "1rem 0 2rem" }}>
          <button className="btn btn-primary" style={{ borderRadius: 999, padding: "14px 36px", fontSize: 13 }} onClick={() => setPage("products")}>
            🍽️ &nbsp; Ver todos los platos
          </button>
        </div>
      </div>
    </>
  );
}

// ─── PRODUCTS (MENÚ) ──────────────────────────────────────────────────────────
function ProductsPage({ setPage, setDetailId }) {
  const api = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    api.get("/api/products").then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const categories = ["Todos", ...new Set(products.map(p => p.category).filter(Boolean))];
  const filtered = products.filter(p => {
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">El menú de hoy</h1>
        <p className="page-sub">{products.length} platos disponibles · Hecho en casa</p>
      </div>
      <div className="search-bar">
        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Buscar un plato…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {categories.map(c => (
          <button key={c} className={`filter-chip ${activeCategory === c ? "active" : ""}`} onClick={() => setActiveCategory(c)}>{c}</button>
        ))}
      </div>
      {loading ? <Spinner /> : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🍽️</div>
          <h3 className="empty-title">Sin resultados</h3>
          <p className="empty-sub">No encontramos platos con ese nombre.</p>
        </div>
      ) : (
        <div className="platos-grid">
          {filtered.map(p => (
            <div key={p.id} className="plato-card" onClick={() => { setDetailId(p.id); setPage("product-detail"); }}>
              {p.imageUrl
                ? <img className="plato-img" src={p.imageUrl} alt={p.name} />
                : <div className="plato-img-placeholder">🍲</div>
              }
              <div className="plato-body">
                <span className="plato-category">{p.category || "Plato del día"}</span>
                <div className="plato-name">{p.name}</div>
                <div className="plato-desc">{p.shortDescription || p.description}</div>
                <div className="plato-footer">
                  <span className="plato-price">{fmt(p.price)}</span>
                  <span className={`plato-stock ${p.stock <= 5 ? "stock-low" : "stock-ok"}`}>
                    {p.stock <= 0 ? "Agotado" : p.stock <= 5 ? `Solo ${p.stock} restantes` : "Disponible"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PRODUCT DETAIL ───────────────────────────────────────────────────────────
function ProductDetailPage({ id, setPage, onCartUpdate }) {
  const api = useApi();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    api.get(`/api/products/${id}`).then(setProduct).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  async function addToCart() {
    if (!user) { setPage("login"); return; }
    setAdding(true); setMsg(null);
    try {
      await api.post("/api/cart/items", { productId: product.id, productName: product.name, productPrice: product.price, quantity: qty });
      setMsg({ type: "success", text: "✓ Añadido a tu pedido" });
      if (onCartUpdate) onCartUpdate();
    } catch (ex) {
      setMsg({ type: "error", text: ex.message || "Error al añadir" });
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <div className="page"><Spinner text="Cargando plato…" /></div>;
  if (!product) return <div className="page"><div className="empty"><p>Plato no encontrado.</p></div></div>;

  return (
    <div className="page">
      <button className="back-btn" onClick={() => setPage("products")}>← Volver al menú</button>
      <div className="detail-grid">
        {product.imageUrl
          ? <img className="detail-img" src={product.imageUrl} alt={product.name} />
          : <div className="detail-img-placeholder">🍲</div>
        }
        <div>
          <span className="detail-category">{product.category || "Plato del día"}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-brand">por {product.brand || "Nuestra cocina"}</p>
          <div className="detail-price">{fmt(product.price)}</div>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-stock">
            {product.stock <= 0
              ? <span className="stock-low">Agotado por hoy</span>
              : product.stock <= 5
                ? <span className="stock-low">⚠ Solo quedan {product.stock} raciones</span>
                : <span className="stock-ok">✓ Disponible · {product.stock} raciones</span>
            }
          </p>
          {msg && <Alert type={msg.type} msg={msg.text} />}
          <div className="qty-row">
            <span className="qty-label">Raciones:</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-val">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
          </div>
          <button className="btn btn-primary btn-full" onClick={addToCart} disabled={adding || product.stock === 0} style={{ borderRadius: 999, padding: "14px" }}>
            {product.stock === 0 ? "Agotado por hoy" : adding ? <span className="spinner" style={{ width: 16, height: 16 }} /> : "🛒 Añadir al pedido"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CART ─────────────────────────────────────────────────────────────────────
function CartPage({ setPage, onCartUpdate }) {
  const api = useApi();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  function loadCart() {
    api.get("/api/cart").then(data => { setCart(data); if (onCartUpdate) onCartUpdate(data); }).catch(e => setErr(e.message)).finally(() => setLoading(false));
  }
  useEffect(() => { loadCart(); }, []);

  async function removeItem(id) { await api.del(`/api/cart/items/${id}`); loadCart(); }
  async function updateItem(item, qty) {
    if (qty < 1) { await removeItem(item.id); return; }
    await api.put("/api/cart/items", { productId: item.productId, productName: item.productName, productPrice: item.productPrice, quantity: qty });
    loadCart();
  }
  async function clearCart() { await api.del("/api/cart"); loadCart(); }

  if (loading) return <div className="page"><Spinner text="Cargando tu pedido…" /></div>;
  const items = cart?.cartItems ?? [];
  const total = cartTotal(items);

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Tu pedido</h1>
        <p className="page-sub">{items.length} plato{items.length !== 1 ? "s" : ""} seleccionado{items.length !== 1 ? "s" : ""}</p>
      </div>
      <Alert msg={err} />
      {items.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🛒</div>
          <h3 className="empty-title">Tu pedido está vacío</h3>
          <p className="empty-sub">Elige tus platos favoritos del menú de hoy.</p>
          <button className="btn btn-primary" style={{ borderRadius: 999 }} onClick={() => setPage("products")}>Ver el menú</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-thumb-placeholder">🍲</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.productName}</div>
                  <div className="cart-item-price">{fmt(item.productPrice)} / ración · Total: {fmt(item.productPrice * item.quantity)}</div>
                </div>
                <div className="cart-item-actions">
                  <button className="qty-btn" onClick={() => updateItem(item, item.quantity - 1)}>−</button>
                  <span className="qty-val">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateItem(item, item.quantity + 1)}>+</button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "1rem", textAlign: "right" }}>
              <button className="btn btn-outline btn-sm" onClick={clearCart}>Vaciar pedido</button>
            </div>
          </div>
          <div>
            <div className="summary-card">
              <h3 className="summary-title">Resumen</h3>
              {items.map(i => (
                <div key={i.id} className="summary-row">
                  <span>{i.productName} ×{i.quantity}</span>
                  <span>{fmt(i.productPrice * i.quantity)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", fontSize: 13, color: "var(--muted)" }}>
                <span>Entrega</span><span style={{ color: "var(--olive)", fontWeight: 700 }}>Gratis</span>
              </div>
              <div className="summary-total">
                <span className="summary-total-label">Total</span>
                <span className="summary-total-val">{fmt(total)}</span>
              </div>
              <button className="btn btn-primary btn-full" style={{ marginTop: "1.25rem", borderRadius: 999, padding: 14 }} onClick={() => setShowCheckout(true)}>
                🏠 &nbsp; Confirmar entrega
              </button>
              <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 11, marginTop: "0.75rem" }}>
                Entrega estimada: 45–60 minutos
              </p>
            </div>
          </div>
        </div>
      )}
      {showCheckout && (
        <CheckoutModal total={total} onClose={() => setShowCheckout(false)} onSuccess={() => { setShowCheckout(false); setPage("my-orders"); }} />
      )}
    </div>
  );
}

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
function CheckoutModal({ total, onClose, onSuccess }) {
  const api = useApi();
  const [form, setForm] = useState({ address: "", postalCode: "", country: "España" });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      await api.post("/api/order", { orderNumber: `BISHUL-${Date.now()}`, address: form.address, postalCode: form.postalCode, country: form.country });
      onSuccess();
    } catch (ex) { setErr(ex.message || "Error al confirmar el pedido"); } finally { setLoading(false); }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">🏠 Datos de entrega</h3>
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: "1.25rem" }}>
          Total a pagar: <strong style={{ color: "var(--terra)", fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>{fmt(total)}</strong>
        </p>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div className="field"><label>Dirección de entrega</label><input placeholder="Calle, número, piso…" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required /></div>
          <div className="field"><label>Código postal</label><input placeholder="28001" value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} required /></div>
          <div className="field"><label>País</label><input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required /></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" disabled={loading} style={{ borderRadius: 999 }}>
              {loading ? <span className="spinner" style={{ width: 15, height: 15 }} /> : "✓ Confirmar pedido"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── MY ORDERS ────────────────────────────────────────────────────────────────
function MyOrdersPage() {
  const api = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/api/order/my-orders").then(setOrders).catch(e => setErr(e.message)).finally(() => setLoading(false));
  }, []);

  async function cancel(id) {
    await api.put(`/api/order/${id}/cancel`);
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "CANCELLED" } : o));
  }

  if (loading) return <div className="page"><Spinner text="Cargando tus pedidos…" /></div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Mis pedidos</h1>
        <p className="page-sub">{orders.length} pedido{orders.length !== 1 ? "s" : ""} realizados</p>
      </div>
      <Alert msg={err} />
      {orders.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🍽️</div>
          <h3 className="empty-title">Aún no has pedido</h3>
          <p className="empty-sub">¡Prueba el menú de hoy!</p>
        </div>
      ) : orders.map(o => (
        <div key={o.id} className="order-card">
          <div className="order-header">
            <div>
              <div className="order-num">Pedido {o.orderNumber}</div>
              <div className="order-date">🕐 {fmtDate(o.createdAt)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <StatusBadge status={o.status} />
              <div style={{ color: "var(--terra)", fontFamily: "Playfair Display, serif", fontSize: "1.2rem", marginTop: 6 }}>{fmt(o.totalPrice)}</div>
            </div>
          </div>
          <div className="order-addr">📍 {o.address}, {o.postalCode} — {o.country}</div>
          {o.orderItems?.length > 0 && (
            <div className="order-items-list">
              {o.orderItems.map(i => (
                <div key={i.id} className="order-item-row">
                  <span>Plato #{i.productId} × {i.quantity} ración{i.quantity !== 1 ? "es" : ""}</span>
                  <span>{fmt(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
          )}
          {o.status === "PENDING" && (
            <div style={{ marginTop: "1rem" }}>
              <button className="btn btn-danger btn-sm" onClick={() => cancel(o.id)}>Cancelar pedido</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN ────────────────────────────────────────────────────────────────────
function AdminPanel() {
  const [tab, setTab] = useState("products");
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Panel de cocina</h1>
        <p className="page-sub">Gestión de Bishul</p>
      </div>
      <div className="admin-tabs">
        {[["products", "🍲 Platos"], ["orders", "📦 Pedidos"], ["users", "👤 Usuarios"]].map(([k, l]) => (
          <button key={k} className={`admin-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      {tab === "products" && <AdminProducts />}
      {tab === "orders" && <AdminOrders />}
      {tab === "users" && <AdminUsers />}
    </div>
  );
}

function AdminProducts() {
  const api = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [err, setErr] = useState("");

  function load() { api.get("/api/products").then(setProducts).catch(e => setErr(e.message)).finally(() => setLoading(false)); }
  useEffect(() => { load(); }, []);

  async function del(id) {
    if (!confirm("¿Eliminar este plato del menú?")) return;
    try { await api.del(`/api/products/${id}`); load(); } catch (ex) { setErr(ex.message); }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button className="btn btn-primary btn-sm" style={{ borderRadius: 999 }} onClick={() => setModal("create")}>+ Añadir plato</button>
      </div>
      <Alert msg={err} />
      {loading ? <Spinner /> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ color: "var(--muted)" }}>{p.id}</td>
                <td style={{ fontFamily: "Playfair Display, serif" }}>{p.name}</td>
                <td><span className="chip">{p.category}</span></td>
                <td style={{ color: "var(--terra)", fontWeight: 700 }}>{fmt(p.price)}</td>
                <td style={{ color: p.stock <= 5 ? "var(--terra)" : "var(--olive)", fontWeight: 700 }}>{p.stock}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setModal(p)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => del(p.id)}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modal && <ProductModal product={modal === "create" ? null : modal} onClose={() => setModal(null)} onSave={() => { setModal(null); load(); }} />}
    </div>
  );
}

function ProductModal({ product, onClose, onSave }) {
  const api = useApi();
  const [form, setForm] = useState(product
    ? { sku: product.sku, name: product.name, brand: product.brand, description: product.description, shortDescription: product.shortDescription, category: product.category, stock: product.stock, price: product.price, imageUrl: product.imageUrl || "" }
    : { sku: "", name: "", brand: "", description: "", shortDescription: "", category: "", stock: 0, price: 0, imageUrl: "" }
  );
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      const body = { ...form, stock: Number(form.stock), price: Number(form.price) };
      if (product) { await api.put(`/api/products/${product.id}`, body); }
      else { await api.post("/api/products", body); }
      onSave();
    } catch (ex) { setErr(ex.message || "Error al guardar"); } finally { setLoading(false); }
  }

  const f = k => ({ value: form[k] ?? "", onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">{product ? "Editar plato" : "Nuevo plato"}</h3>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <div className="field"><label>SKU *</label><input {...f("sku")} required placeholder="P001" /></div>
            <div className="field"><label>Nombre del plato *</label><input {...f("name")} required placeholder="Cocido madrileño" /></div>
            <div className="field"><label>Chef / Origen *</label><input {...f("brand")} required placeholder="Cocina de la abuela" /></div>
            <div className="field"><label>Categoría *</label><input {...f("category")} required placeholder="Cocidos, Sopas…" /></div>
            <div className="field"><label>Precio (€) *</label><input type="number" step="0.01" min="0" {...f("price")} required /></div>
            <div className="field"><label>Raciones disponibles *</label><input type="number" min="0" {...f("stock")} required /></div>
          </div>
          <div className="field"><label>Descripción corta *</label><input required placeholder="Breve descripción del plato…" {...f("shortDescription")} /></div>
          <div className="field"><label>Descripción completa *</label><textarea required placeholder="Ingredientes, preparación, alérgenos…" {...f("description")} /></div>
          <div className="field"><label>URL de imagen</label><input placeholder="https://tuweb.com/imagen.jpg" {...f("imageUrl")} /></div>
          {form.imageUrl && (
            <div style={{ marginBottom: "1rem" }}>
              <img src={form.imageUrl} alt="preview" style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border)" }} onError={e => e.target.style.display = "none"} />
            </div>
          )}
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" disabled={loading} style={{ borderRadius: 999 }}>
              {loading ? <span className="spinner" style={{ width: 15, height: 15 }} /> : "Guardar plato"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminOrders() {
  const api = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => { api.get("/api/order").then(setOrders).catch(e => setErr(e.message)).finally(() => setLoading(false)); }, []);

  async function updateStatus(id, status) {
    try { await api.put(`/api/order/${id}/status?status=${status}`); setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o)); }
    catch (ex) { setErr(ex.message); }
  }

  return (
    <div>
      <Alert msg={err} />
      {loading ? <Spinner /> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Pedido</th><th>Cliente</th><th>Total</th><th>Estado</th><th>Fecha</th><th>Cambiar estado</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td style={{ color: "var(--muted)" }}>{o.id}</td>
                <td style={{ fontFamily: "Playfair Display, serif", fontSize: "0.95rem" }}>{o.orderNumber}</td>
                <td style={{ color: "var(--muted)" }}>{o.userSummaryDTO?.email || "—"}</td>
                <td style={{ color: "var(--terra)", fontWeight: 700 }}>{fmt(o.totalPrice)}</td>
                <td><StatusBadge status={o.status} /></td>
                <td style={{ color: "var(--muted)" }}>{fmtDate(o.createdAt)}</td>
                <td>
                  <div className="field" style={{ marginBottom: 0, minWidth: 140 }}>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                      {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function AdminUsers() {
  const api = useApi();
  const { user: me } = useAuth();
  const [err, setErr] = useState(""); const [userId, setUserId] = useState(""); const [found, setFound] = useState(null); const [loading, setLoading] = useState(false);

  async function search(e) {
    e.preventDefault(); setErr(""); setLoading(true); setFound(null);
    try { setFound(await api.get(`/api/users/${userId}`)); } catch { setErr("Usuario no encontrado"); } finally { setLoading(false); }
  }
  async function del(id) {
    if (!confirm("¿Eliminar este usuario?")) return;
    try { await api.del(`/api/users/${id}`); setFound(null); } catch (ex) { setErr(ex.message); }
  }

  return (
    <div>
      <Alert msg={err} />
      <form onSubmit={search} style={{ display: "flex", gap: "0.75rem", maxWidth: 380, marginBottom: "2rem" }}>
        <div className="field" style={{ flex: 1, marginBottom: 0 }}>
          <input placeholder="ID de usuario" value={userId} onChange={e => setUserId(e.target.value)} type="number" />
        </div>
        <button className="btn btn-outline" disabled={loading}>Buscar</button>
      </form>
      {found && (
        <div className="order-card">
          <div className="order-header">
            <div>
              <div className="order-num" style={{ fontFamily: "Lato, sans-serif", fontSize: 14 }}>{found.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 3 }}>{found.email}</div>
              <div style={{ marginTop: 8, display: "flex", gap: "0.5rem" }}>
                {found.roles?.map(r => <span key={r} className="chip">{r}</span>)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>Desde {fmtDate(found.createdAt)}</div>
              <span className={`status-badge ${found.enabled ? "status-PAID" : "status-CANCELLED"}`}>{found.enabled ? "Activo" : "Inactivo"}</span>
            </div>
          </div>
          {found.id !== me?.id && (
            <button className="btn btn-danger btn-sm" style={{ marginTop: "1rem" }} onClick={() => del(found.id)}>Eliminar usuario</button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function LoginPage({ setPage }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(""); setLoading(true);
    try { await login(form.email, form.password); }
    catch (ex) { setErr("Credenciales incorrectas. Comprueba tu email y contraseña."); }
    finally { setLoading(false); }
  }

  return (
    <div className="page">
      <div className="form-card">
        <div className="form-brand"><div className="form-brand-name"><span>Bish</span>ul<span style={{ color: "var(--terra)" }}>.</span></div></div>
        <h2 className="form-title">Bienvenido de nuevo</h2>
        <p className="form-sub">Accede para pedir tus platos favoritos</p>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div className="field"><label>Email</label><input type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="field"><label>Contraseña</label><input type="password" placeholder="••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></div>
          <button className="btn btn-primary btn-full" style={{ borderRadius: 999, padding: 13 }} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 15, height: 15 }} /> : "Acceder"}
          </button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
          ¿Primera vez? <button className="link-btn" onClick={() => setPage("register")}>Crear cuenta gratis</button>
        </p>
      </div>
    </div>
  );
}

function RegisterPage({ setPage }) {
  const { loginWithToken } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr("");
    if (form.password !== form.confirmPassword) { setErr("Las contraseñas no coinciden"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error(await res.text());
      loginWithToken((await res.json()).token);
    } catch (ex) { setErr(ex.message || "Error al registrar"); } finally { setLoading(false); }
  }

  return (
    <div className="page">
      <div className="form-card">
        <div className="form-brand"><div className="form-brand-name"><span>Bish</span>ul<span style={{ color: "var(--terra)" }}>.</span></div></div>
        <h2 className="form-title">Crear cuenta</h2>
        <p className="form-sub">Regístrate y empieza a pedir</p>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div className="field"><label>Nombre</label><input placeholder="Tu nombre" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></div>
          <div className="field"><label>Email</label><input type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="field"><label>Contraseña</label><input type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></div>
          <div className="field"><label>Confirmar contraseña</label><input type="password" placeholder="Repite la contraseña" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required /></div>
          <button className="btn btn-primary btn-full" style={{ borderRadius: 999, padding: 13 }} disabled={loading}>
            {loading ? <span className="spinner" style={{ width: 15, height: 15 }} /> : "Crear mi cuenta"}
          </button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
          ¿Ya tienes cuenta? <button className="link-btn" onClick={() => setPage("login")}>Acceder</button>
        </p>
      </div>
    </div>
  );
}

// ─── AUTH PROVIDER ────────────────────────────────────────────────────────────
function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  function loginWithToken(t) {
    setToken(t);
    const p = parseJwt(t);
    if (p) setUser({ email: p.sub, roles: p.roles || [] });
  }
  async function login(email, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    if (!res.ok) throw new Error(await res.text());
    loginWithToken((await res.json()).token);
  }
  function logout() { setToken(null); setUser(null); }

  return <AuthContext.Provider value={{ token, user, login, loginWithToken, logout }}>{children}</AuthContext.Provider>;
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  function onCartUpdate(cart) { if (cart) setCartCount(cart.cartItems?.length ?? 0); }

  return (
    <AuthProvider>
      <style>{css}</style>
      <div className="app">
        <Inner page={page} setPage={setPage} detailId={detailId} setDetailId={setDetailId} cartCount={cartCount} onCartUpdate={onCartUpdate} />
      </div>
    </AuthProvider>
  );
}

function Inner({ page, setPage, detailId, setDetailId, cartCount, onCartUpdate }) {
  const { user } = useAuth();
  const protected_ = ["cart", "my-orders", "admin"];

  useEffect(() => { if (!user && protected_.includes(page)) setPage("login"); }, [user, page]);
  useEffect(() => { if (user && (page === "login" || page === "register")) setPage("home"); }, [user]);

  return (
    <>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "login" && <LoginPage setPage={setPage} />}
      {page === "register" && <RegisterPage setPage={setPage} />}
      {page === "products" && <ProductsPage setPage={setPage} setDetailId={setDetailId} />}
      {page === "product-detail" && detailId && <ProductDetailPage id={detailId} setPage={setPage} onCartUpdate={onCartUpdate} />}
      {page === "cart" && user && <CartPage setPage={setPage} onCartUpdate={onCartUpdate} />}
      {page === "my-orders" && user && <MyOrdersPage />}
      {page === "admin" && user && <AdminPanel />}
    </>
  );
}
