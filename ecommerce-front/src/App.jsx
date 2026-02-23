import { useState, useEffect, useContext, createContext, useCallback } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8080";

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

function useAuth() {
  return useContext(AuthContext);
}

// ─── API HELPERS ──────────────────────────────────────────────────────────────
function useApi() {
  const { token } = useAuth();

  const request = useCallback(
    async (method, path, body = null) => {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || `Error ${res.status}`);
      }
      if (res.status === 204) return null;
      return res.json();
    },
    [token]
  );

  return {
    get: (path) => request("GET", path),
    post: (path, body) => request("POST", path, body),
    put: (path, body) => request("PUT", path, body),
    del: (path) => request("DELETE", path),
  };
}

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #080808;
    --surface: #101010;
    --card:    #161616;
    --border:  #252525;
    --gold:    #c9a96e;
    --gold-dim:#8a7050;
    --cream:   #f0ece3;
    --muted:   #555;
    --danger:  #c0392b;
    --success: #27ae60;
    --radius:  2px;
  }

  body { background: var(--bg); color: var(--cream); font-family: 'DM Mono', monospace; font-size: 13px; min-height: 100vh; }

  h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; font-weight: 300; letter-spacing: 0.02em; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(8,8,8,0.96); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 60px;
  }
  .nav-brand {
    font-family: 'Cormorant Garamond', serif; font-size: 1.5rem;
    font-weight: 600; color: var(--gold); letter-spacing: 0.15em; cursor: pointer;
    text-transform: uppercase;
  }
  .nav-links { display: flex; gap: 0.25rem; align-items: center; }
  .nav-btn {
    background: none; border: none; color: var(--muted); font-family: 'DM Mono', monospace;
    font-size: 11px; padding: 6px 12px; cursor: pointer; letter-spacing: 0.1em;
    text-transform: uppercase; transition: color 0.2s; border-radius: var(--radius);
  }
  .nav-btn:hover, .nav-btn.active { color: var(--cream); }
  .nav-btn.gold { color: var(--gold); border: 1px solid var(--gold-dim); }
  .nav-btn.gold:hover { background: var(--gold); color: var(--bg); }
  .nav-badge {
    background: var(--gold); color: var(--bg); font-size: 9px;
    padding: 1px 5px; border-radius: 999px; margin-left: 4px; font-weight: 500;
  }

  /* PAGE WRAPPER */
  .page { flex: 1; max-width: 1200px; margin: 0 auto; width: 100%; padding: 2rem 2rem; }
  .page-title { font-size: clamp(2rem, 5vw, 3.5rem); color: var(--cream); margin-bottom: 0.25rem; }
  .page-sub { color: var(--muted); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2.5rem; }

  /* FORMS */
  .form-card {
    max-width: 440px; margin: 4rem auto;
    background: var(--card); border: 1px solid var(--border);
    padding: 2.5rem; border-radius: var(--radius);
  }
  .form-title { font-size: 2.2rem; margin-bottom: 0.25rem; color: var(--cream); }
  .form-sub { color: var(--muted); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2rem; }
  .field { margin-bottom: 1.25rem; }
  .field label { display: block; color: var(--muted); font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
  .field input, .field select, .field textarea {
    width: 100%; background: var(--surface); border: 1px solid var(--border);
    color: var(--cream); font-family: 'DM Mono', monospace; font-size: 13px;
    padding: 10px 12px; border-radius: var(--radius); outline: none; transition: border-color 0.2s;
  }
  .field input:focus, .field select:focus { border-color: var(--gold-dim); }
  .field textarea { min-height: 80px; resize: vertical; }
  .field select option { background: var(--surface); }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
    border: none; cursor: pointer; font-family: 'DM Mono', monospace;
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 10px 20px; border-radius: var(--radius); transition: all 0.18s; font-weight: 500;
  }
  .btn-primary { background: var(--gold); color: var(--bg); }
  .btn-primary:hover { background: #dbb97e; }
  .btn-outline { background: none; border: 1px solid var(--border); color: var(--cream); }
  .btn-outline:hover { border-color: var(--gold-dim); color: var(--gold); }
  .btn-danger { background: none; border: 1px solid #3a1a1a; color: #e74c3c; }
  .btn-danger:hover { background: #3a1a1a; }
  .btn-sm { padding: 6px 12px; font-size: 10px; }
  .btn-full { width: 100%; }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* GRID */
  .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .product-card {
    background: var(--card); padding: 1.5rem; cursor: pointer;
    transition: background 0.15s; position: relative; overflow: hidden;
  }
  .product-card:hover { background: var(--surface); }
  .product-card::after { content: ''; position: absolute; inset: 0; border: 1px solid transparent; transition: border-color 0.15s; }
  .product-card:hover::after { border-color: var(--gold-dim); }
  .product-sku { color: var(--gold-dim); font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .product-name { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; margin-bottom: 0.25rem; line-height: 1.2; }
  .product-brand { color: var(--muted); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .product-desc { color: #777; font-size: 11px; line-height: 1.6; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .product-footer { display: flex; align-items: center; justify-content: space-between; }
  .product-price { font-size: 1.1rem; color: var(--cream); }
  .product-stock { font-size: 9px; color: var(--muted); letter-spacing: 0.1em; }
  .stock-low { color: #c0392b; }

  /* DETAIL */
  .product-detail { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
  .detail-img-placeholder {
    aspect-ratio: 1; background: var(--card); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--border); font-size: 4rem; border-radius: var(--radius);
  }
  .detail-title { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .detail-meta { color: var(--muted); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.5rem; display: flex; gap: 1rem; }
  .detail-price { font-size: 1.8rem; color: var(--gold); margin-bottom: 1.5rem; font-family: 'Cormorant Garamond', serif; }
  .detail-desc { color: #aaa; line-height: 1.8; margin-bottom: 1.5rem; font-size: 12px; }
  .qty-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
  .qty-btn { background: var(--card); border: 1px solid var(--border); color: var(--cream); width: 32px; height: 32px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius); transition: border-color 0.15s; }
  .qty-btn:hover { border-color: var(--gold-dim); }
  .qty-val { min-width: 32px; text-align: center; font-size: 14px; }

  /* CART */
  .cart-layout { display: grid; grid-template-columns: 1fr 340px; gap: 2rem; align-items: start; }
  .cart-item { background: var(--card); border: 1px solid var(--border); padding: 1.25rem; display: flex; gap: 1rem; align-items: center; margin-bottom: 1px; }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; margin-bottom: 0.25rem; }
  .cart-item-price { color: var(--gold); font-size: 12px; }
  .cart-item-actions { display: flex; align-items: center; gap: 0.5rem; }
  .order-summary { background: var(--card); border: 1px solid var(--border); padding: 1.5rem; position: sticky; top: 80px; }
  .summary-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border); }
  .summary-row { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 12px; color: var(--muted); }
  .summary-total { display: flex; justify-content: space-between; padding: 1rem 0 0; margin-top: 0.5rem; border-top: 1px solid var(--border); font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; }

  /* ORDERS */
  .order-card { background: var(--card); border: 1px solid var(--border); padding: 1.5rem; margin-bottom: 1px; }
  .order-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
  .order-num { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; }
  .status-badge { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; border-radius: var(--radius); }
  .status-PENDING  { background: #2a2010; color: #c9a96e; border: 1px solid #3a3020; }
  .status-PAID     { background: #102010; color: #27ae60; border: 1px solid #203020; }
  .status-SHIPPED  { background: #101828; color: #3498db; border: 1px solid #203040; }
  .status-DELIVERED{ background: #0a1a0a; color: #2ecc71; border: 1px solid #1a2a1a; }
  .status-CANCELLED{ background: #1a0a0a; color: #c0392b; border: 1px solid #2a1a1a; }
  .order-items-list { border-top: 1px solid var(--border); padding-top: 0.75rem; margin-top: 0.75rem; }
  .order-item-row { display: flex; justify-content: space-between; padding: 0.3rem 0; font-size: 11px; color: var(--muted); }

  /* ADMIN */
  .admin-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
  .admin-tab { background: none; border: none; border-bottom: 2px solid transparent; color: var(--muted); font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 10px 20px; cursor: pointer; transition: all 0.15s; margin-bottom: -1px; }
  .admin-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
  .table { width: 100%; border-collapse: collapse; }
  .table th { color: var(--muted); font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; padding: 8px 12px; text-align: left; border-bottom: 1px solid var(--border); }
  .table td { padding: 12px 12px; border-bottom: 1px solid var(--border); font-size: 12px; color: var(--cream); }
  .table tr:hover td { background: var(--surface); }

  /* MODALS */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .modal { background: var(--card); border: 1px solid var(--border); padding: 2rem; width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; border-radius: var(--radius); }
  .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; margin-bottom: 1.5rem; }
  .modal-footer { display: flex; gap: 0.75rem; margin-top: 1.5rem; }

  /* ALERTS */
  .alert { padding: 10px 14px; border-radius: var(--radius); font-size: 11px; margin-bottom: 1rem; }
  .alert-error { background: #1a0808; border: 1px solid #3a1010; color: #e74c3c; }
  .alert-success { background: #081a08; border: 1px solid #103010; color: #2ecc71; }

  /* LOADING */
  .spinner { display: inline-block; width: 20px; height: 20px; border: 2px solid var(--border); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-center { display: flex; align-items: center; justify-content: center; min-height: 200px; }

  /* EMPTY */
  .empty { text-align: center; padding: 4rem 2rem; color: var(--muted); }
  .empty-icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.3; }
  .empty-title { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; color: var(--cream); margin-bottom: 0.5rem; }

  /* DIVIDER */
  .divider { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

  /* CHIP */
  .chip { display: inline-flex; align-items: center; gap: 4px; background: var(--surface); border: 1px solid var(--border); color: var(--muted); font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 8px; border-radius: var(--radius); }

  .link-btn { background: none; border: none; color: var(--gold-dim); cursor: pointer; font-family: 'DM Mono', monospace; font-size: 12px; text-decoration: underline; padding: 0; }
  .link-btn:hover { color: var(--gold); }

  @media (max-width: 768px) {
    .product-detail, .cart-layout { grid-template-columns: 1fr; }
    .nav-links .nav-btn span { display: none; }
  }
`;

// ─── UTILITIES ────────────────────────────────────────────────────────────────
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function formatPrice(n) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n ?? 0);
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function cartTotal(items = []) {
  return items.reduce((s, i) => s + i.productPrice * i.quantity, 0);
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Spinner() {
  return <div className="loading-center"><div className="spinner" /></div>;
}

function Alert({ type = "error", msg }) {
  if (!msg) return null;
  return <div className={`alert alert-${type}`}>{msg}</div>;
}

function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{status}</span>;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, cartCount }) {
  const { user, logout } = useAuth();
  const isAdmin = user?.roles?.includes("ADMIN");

  return (
    <nav className="nav">
      <div className="nav-brand" onClick={() => setPage("products")}>ÉLITE</div>
      <div className="nav-links">
        <button className={`nav-btn ${page === "products" ? "active" : ""}`} onClick={() => setPage("products")}>
          <span>Tienda</span>
        </button>
        {user && (
          <>
            <button className={`nav-btn ${page === "cart" ? "active" : ""}`} onClick={() => setPage("cart")}>
              <span>Carrito</span>
              {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
            </button>
            <button className={`nav-btn ${page === "my-orders" ? "active" : ""}`} onClick={() => setPage("my-orders")}>
              <span>Pedidos</span>
            </button>
            {isAdmin && (
              <button className={`nav-btn ${page === "admin" ? "active" : ""}`} onClick={() => setPage("admin")}>
                <span>Admin</span>
              </button>
            )}
            <button className="nav-btn gold" onClick={logout}>Salir</button>
          </>
        )}
        {!user && (
          <>
            <button className={`nav-btn ${page === "login" ? "active" : ""}`} onClick={() => setPage("login")}>Acceder</button>
            <button className="nav-btn gold" onClick={() => setPage("register")}>Registro</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ setPage }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (ex) {
      setErr(ex.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2 className="form-title">Acceder</h2>
        <p className="form-sub">Introduce tus credenciales</p>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="field"><label>Contraseña</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></div>
          <button className="btn btn-primary btn-full" disabled={loading}>{loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : "Entrar"}</button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 11 }}>
          ¿Sin cuenta? <button className="link-btn" onClick={() => setPage("register")}>Crear una</button>
        </p>
      </div>
    </div>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────
function RegisterPage({ setPage }) {
  const { loginWithToken } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    if (form.password !== form.confirmPassword) { setErr("Las contraseñas no coinciden"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      loginWithToken(data.token);
    } catch (ex) {
      setErr(ex.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2 className="form-title">Registro</h2>
        <p className="form-sub">Crea tu cuenta</p>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div className="field"><label>Nombre de usuario</label><input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required /></div>
          <div className="field"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></div>
          <div className="field"><label>Contraseña</label><input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></div>
          <div className="field"><label>Confirmar contraseña</label><input type="password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required /></div>
          <button className="btn btn-primary btn-full" disabled={loading}>{loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : "Crear cuenta"}</button>
        </form>
        <hr className="divider" />
        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 11 }}>
          ¿Ya tienes cuenta? <button className="link-btn" onClick={() => setPage("login")}>Entrar</button>
        </p>
      </div>
    </div>
  );
}

// ─── PRODUCTS LIST ────────────────────────────────────────────────────────────
function ProductsPage({ setPage, setDetailId }) {
  const api = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/api/products").then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.brand?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  function open(id) { setDetailId(id); setPage("product-detail"); }

  return (
    <div className="page">
      <h1 className="page-title">Catálogo</h1>
      <p className="page-sub">{products.length} productos disponibles</p>
      <div className="field" style={{ maxWidth: 340, marginBottom: "1.5rem" }}>
        <input placeholder="Buscar por nombre, marca o categoría…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {loading ? <Spinner /> : filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">◻</div>
          <h3 className="empty-title">Sin resultados</h3>
          <p>Prueba con otro término de búsqueda.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(p => (
            <div key={p.id} className="product-card" onClick={() => open(p.id)}>
              <div className="product-sku">{p.sku}</div>
              <div className="product-name">{p.name}</div>
              <div className="product-brand">{p.brand} · {p.category}</div>
              <div className="product-desc">{p.shortDescription || p.description}</div>
              <div className="product-footer">
                <span className="product-price">{formatPrice(p.price)}</span>
                <span className={`product-stock ${p.stock <= 5 ? "stock-low" : ""}`}>
                  {p.stock <= 0 ? "Sin stock" : p.stock <= 5 ? `Últimas ${p.stock}` : `${p.stock} uds`}
                </span>
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
      await api.post("/api/cart/items", {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        quantity: qty,
      });
      setMsg({ type: "success", text: "Añadido al carrito ✓" });
      if (onCartUpdate) onCartUpdate();
    } catch (ex) {
      setMsg({ type: "error", text: ex.message || "Error al añadir" });
    } finally {
      setAdding(false);
    }
  }

  if (loading) return <div className="page"><Spinner /></div>;
  if (!product) return <div className="page"><div className="empty"><p>Producto no encontrado.</p></div></div>;

  return (
    <div className="page">
      <button className="btn btn-outline btn-sm" style={{ marginBottom: "1.5rem" }} onClick={() => setPage("products")}>← Volver</button>
      <div className="product-detail">
        <div className="detail-img-placeholder">◻</div>
        <div>
          <div className="chip" style={{ marginBottom: "0.75rem" }}>{product.category}</div>
          <h1 className="detail-title">{product.name}</h1>
          <div className="detail-meta">
            <span>{product.brand}</span>
            <span>SKU: {product.sku}</span>
          </div>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p className="detail-desc">{product.description}</p>
          <p style={{ color: "var(--muted)", fontSize: 11, marginBottom: "1.25rem" }}>
            Stock: <span style={{ color: product.stock <= 5 ? "var(--danger)" : "var(--cream)" }}>{product.stock} unidades</span>
          </p>
          {msg && <Alert type={msg.type} msg={msg.text} />}
          <div className="qty-row">
            <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
            <span className="qty-val">{qty}</span>
            <button className="qty-btn" onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
          </div>
          <button className="btn btn-primary" onClick={addToCart} disabled={adding || product.stock === 0} style={{ width: "100%", marginTop: "0.5rem" }}>
            {product.stock === 0 ? "Sin stock" : adding ? <span className="spinner" style={{ width: 14, height: 14 }} /> : "Añadir al carrito"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CART PAGE ────────────────────────────────────────────────────────────────
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

  async function removeItem(cartItemId) {
    await api.del(`/api/cart/items/${cartItemId}`);
    loadCart();
  }

  async function updateItem(item, quantity) {
    if (quantity < 1) { await removeItem(item.id); return; }
    await api.put("/api/cart/items", { productId: item.productId, productName: item.productName, productPrice: item.productPrice, quantity });
    loadCart();
  }

  async function clearCart() {
    await api.del("/api/cart");
    loadCart();
  }

  if (loading) return <div className="page"><Spinner /></div>;
  const items = cart?.cartItems ?? [];
  const total = cartTotal(items);

  return (
    <div className="page">
      <h1 className="page-title">Carrito</h1>
      <p className="page-sub">{items.length} artículo{items.length !== 1 ? "s" : ""}</p>
      <Alert msg={err} />
      {items.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">◻</div>
          <h3 className="empty-title">Tu carrito está vacío</h3>
          <p style={{ marginBottom: "1.5rem" }}>Explora nuestro catálogo para añadir productos.</p>
          <button className="btn btn-outline" onClick={() => setPage("products")}>Ver catálogo</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.productName}</div>
                  <div className="cart-item-price">{formatPrice(item.productPrice)} / ud · Total: {formatPrice(item.productPrice * item.quantity)}</div>
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
              <button className="btn btn-outline btn-sm" onClick={clearCart}>Vaciar carrito</button>
            </div>
          </div>
          <div>
            <div className="order-summary">
              <h3 className="summary-title">Resumen</h3>
              {items.map(i => (
                <div key={i.id} className="summary-row">
                  <span>{i.productName} ×{i.quantity}</span>
                  <span>{formatPrice(i.productPrice * i.quantity)}</span>
                </div>
              ))}
              <div className="summary-total">
                <span>Total</span>
                <span style={{ color: "var(--gold)" }}>{formatPrice(total)}</span>
              </div>
              <button className="btn btn-primary btn-full" style={{ marginTop: "1.5rem" }} onClick={() => setShowCheckout(true)}>
                Finalizar pedido
              </button>
            </div>
          </div>
        </div>
      )}
      {showCheckout && (
        <CheckoutModal
          total={total}
          onClose={() => setShowCheckout(false)}
          onSuccess={() => { setShowCheckout(false); setPage("my-orders"); }}
        />
      )}
    </div>
  );
}

// ─── CHECKOUT MODAL ───────────────────────────────────────────────────────────
function CheckoutModal({ total, onClose, onSuccess }) {
  const api = useApi();
  const [form, setForm] = useState({ address: "", postalCode: "", country: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await api.post("/api/order", {
        orderNumber: `ORD-${Date.now()}`,
        address: form.address,
        postalCode: form.postalCode,
        country: form.country,
      });
      onSuccess();
    } catch (ex) {
      setErr(ex.message || "Error al crear el pedido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">Datos de envío</h3>
        <Alert msg={err} />
        <p style={{ color: "var(--muted)", fontSize: 11, marginBottom: "1.25rem" }}>Total a pagar: <span style={{ color: "var(--gold)" }}>{formatPrice(total)}</span></p>
        <form onSubmit={submit}>
          <div className="field"><label>Dirección completa</label><input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required /></div>
          <div className="field"><label>Código postal</label><input value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} required /></div>
          <div className="field"><label>País</label><input value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required /></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" disabled={loading}>{loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : "Confirmar pedido"}</button>
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

  if (loading) return <div className="page"><Spinner /></div>;

  return (
    <div className="page">
      <h1 className="page-title">Mis pedidos</h1>
      <p className="page-sub">{orders.length} pedido{orders.length !== 1 ? "s" : ""}</p>
      <Alert msg={err} />
      {orders.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">◻</div>
          <h3 className="empty-title">Sin pedidos</h3>
          <p>Aún no has realizado ningún pedido.</p>
        </div>
      ) : orders.map(o => (
        <div key={o.id} className="order-card">
          <div className="order-header">
            <div>
              <div className="order-num">#{o.orderNumber || o.id}</div>
              <div style={{ color: "var(--muted)", fontSize: 10, marginTop: 4 }}>{formatDate(o.createdAt)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <StatusBadge status={o.status} />
              <div style={{ color: "var(--gold)", marginTop: 6, fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem" }}>{formatPrice(o.totalPrice)}</div>
            </div>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 10, marginBottom: "0.5rem" }}>
            {o.address}, {o.postalCode} — {o.country}
          </div>
          {o.orderItems?.length > 0 && (
            <div className="order-items-list">
              {o.orderItems.map(i => (
                <div key={i.id} className="order-item-row">
                  <span>Producto #{i.productId} ×{i.quantity}</span>
                  <span>{formatPrice(i.price)}</span>
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

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel() {
  const [tab, setTab] = useState("products");
  const tabs = [
    { key: "products", label: "Productos" },
    { key: "orders", label: "Pedidos" },
    { key: "users", label: "Usuarios" },
  ];

  return (
    <div className="page">
      <h1 className="page-title">Panel Admin</h1>
      <p className="page-sub">Gestión de la plataforma</p>
      <div className="admin-tabs">
        {tabs.map(t => (
          <button key={t.key} className={`admin-tab ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>
      {tab === "products" && <AdminProducts />}
      {tab === "orders" && <AdminOrders />}
      {tab === "users" && <AdminUsers />}
    </div>
  );
}

// ─── ADMIN: PRODUCTS ─────────────────────────────────────────────────────────
function AdminProducts() {
  const api = useApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | product
  const [err, setErr] = useState("");

  function load() {
    api.get("/api/products").then(setProducts).catch(e => setErr(e.message)).finally(() => setLoading(false));
  }
  useEffect(() => { load(); }, []);

  async function deleteProduct(id) {
    if (!confirm("¿Eliminar este producto?")) return;
    try { await api.del(`/api/products/${id}`); load(); } catch (ex) { setErr(ex.message); }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button className="btn btn-primary btn-sm" onClick={() => setModal("create")}>+ Nuevo producto</button>
      </div>
      <Alert msg={err} />
      {loading ? <Spinner /> : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>SKU</th><th>Nombre</th><th>Marca</th><th>Categoría</th><th>Precio</th><th>Stock</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{ color: "var(--muted)" }}>{p.id}</td>
                <td style={{ color: "var(--gold-dim)" }}>{p.sku}</td>
                <td>{p.name}</td>
                <td style={{ color: "var(--muted)" }}>{p.brand}</td>
                <td style={{ color: "var(--muted)" }}>{p.category}</td>
                <td>{formatPrice(p.price)}</td>
                <td style={{ color: p.stock <= 5 ? "var(--danger)" : "var(--cream)" }}>{p.stock}</td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setModal(p)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Eliminar</button>
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
  const [form, setForm] = useState(product ? {
    sku: product.sku, name: product.name, brand: product.brand,
    description: product.description, shortDescription: product.shortDescription,
    category: product.category, stock: product.stock, price: product.price,
  } : { sku: "", name: "", brand: "", description: "", shortDescription: "", category: "", stock: 0, price: 0 });
  const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      if (product) {
        await api.put(`/api/products/${product.id}`, { ...form, stock: Number(form.stock), price: Number(form.price) });
      } else {
        await api.post("/api/products/api/product", { ...form, stock: Number(form.stock), price: Number(form.price) });
      }
      onSave();
    } catch (ex) { setErr(ex.message || "Error al guardar"); } finally { setLoading(false); }
  }

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h3 className="modal-title">{product ? "Editar producto" : "Nuevo producto"}</h3>
        <Alert msg={err} />
        <form onSubmit={submit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
            <div className="field"><label>SKU</label><input {...f("sku")} required /></div>
            <div className="field"><label>Nombre</label><input {...f("name")} required /></div>
            <div className="field"><label>Marca</label><input {...f("brand")} required /></div>
            <div className="field"><label>Categoría</label><input {...f("category")} required /></div>
            <div className="field"><label>Precio (€)</label><input type="number" step="0.01" {...f("price")} required /></div>
            <div className="field"><label>Stock</label><input type="number" {...f("stock")} required /></div>
          </div>
          <div className="field"><label>Descripción corta</label><input {...f("shortDescription")} /></div>
          <div className="field"><label>Descripción</label><textarea {...f("description")} /></div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" disabled={loading}>{loading ? <span className="spinner" style={{ width: 14, height: 14 }} /> : "Guardar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── ADMIN: ORDERS ────────────────────────────────────────────────────────────
function AdminOrders() {
  const api = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/api/order").then(setOrders).catch(e => setErr(e.message)).finally(() => setLoading(false));
  }, []);

  async function updateStatus(id, status) {
    try {
      await api.put(`/api/order/${id}/status?status=${status}`);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (ex) { setErr(ex.message); }
  }

  const statuses = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

  return (
    <div>
      <Alert msg={err} />
      {loading ? <Spinner /> : (
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Nº Pedido</th><th>Usuario</th><th>Total</th><th>Estado</th><th>Fecha</th><th>Acción</th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td style={{ color: "var(--muted)" }}>{o.id}</td>
                <td style={{ fontFamily: "Cormorant Garamond, serif" }}>{o.orderNumber}</td>
                <td style={{ color: "var(--muted)" }}>{o.userSummaryDTO?.email || "—"}</td>
                <td style={{ color: "var(--gold)" }}>{formatPrice(o.totalPrice)}</td>
                <td><StatusBadge status={o.status} /></td>
                <td style={{ color: "var(--muted)" }}>{formatDate(o.createdAt)}</td>
                <td>
                  <div className="field" style={{ marginBottom: 0, minWidth: 130 }}>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
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

// ─── ADMIN: USERS ─────────────────────────────────────────────────────────────
function AdminUsers() {
  const api = useApi();
  const { user: me } = useAuth();
  const [err, setErr] = useState("");
  const [userId, setUserId] = useState("");
  const [found, setFound] = useState(null);
  const [loading, setLoading] = useState(false);

  async function search(e) {
    e.preventDefault();
    setErr(""); setLoading(true); setFound(null);
    try {
      const u = await api.get(`/api/users/${userId}`);
      setFound(u);
    } catch (ex) { setErr("Usuario no encontrado"); } finally { setLoading(false); }
  }

  async function deleteUser(id) {
    if (!confirm("¿Eliminar este usuario?")) return;
    try { await api.del(`/api/users/${id}`); setFound(null); } catch (ex) { setErr(ex.message); }
  }

  return (
    <div>
      <Alert msg={err} />
      <div style={{ marginBottom: "2rem", maxWidth: 400 }}>
        <form onSubmit={search} style={{ display: "flex", gap: "0.75rem" }}>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <input placeholder="ID de usuario" value={userId} onChange={e => setUserId(e.target.value)} type="number" />
          </div>
          <button className="btn btn-outline" disabled={loading}>Buscar</button>
        </form>
      </div>
      {found && (
        <div className="order-card">
          <div className="order-header">
            <div>
              <div className="order-num" style={{ fontFamily: "DM Mono, monospace", fontSize: 13 }}>{found.name}</div>
              <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 4 }}>{found.email}</div>
              <div style={{ marginTop: 8, display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {found.roles?.map(r => <span key={r} className="chip">{r}</span>)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 8 }}>Registrado: {formatDate(found.createdAt)}</div>
              <div className="chip">{found.enabled ? "Activo" : "Inactivo"}</div>
            </div>
          </div>
          {found.id !== me?.id && (
            <button className="btn btn-danger btn-sm" style={{ marginTop: "1rem" }} onClick={() => deleteUser(found.id)}>
              Eliminar usuario
            </button>
          )}
        </div>
      )}
      <div style={{ marginTop: "2rem" }}>
        <p style={{ color: "var(--muted)", fontSize: 11 }}>
          También puedes consultar tu propio perfil desde{" "}
          <button className="link-btn" onClick={() => api.get("/api/users/me").then(setFound).catch(e => setErr(e.message))}>
            /api/users/me
          </button>
        </p>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  function loginWithToken(t) {
    setToken(t);
    const payload = parseJwt(t);
    if (payload) setUser({ email: payload.sub, roles: payload.roles || [] });
  }

  async function login(email, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    const data = await res.json();
    loginWithToken(data.token);
  }

  function logout() { setToken(null); setUser(null); }

  return (
    <AuthContext.Provider value={{ token, user, login, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function App() {
  const [page, setPage] = useState("products");
  const [detailId, setDetailId] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  function onCartUpdate(cart) {
    if (cart) setCartCount(cart.cartItems?.length ?? 0);
  }

  return (
    <AuthProvider>
      <style>{css}</style>
      <div className="app">
        <AppInner page={page} setPage={setPage} detailId={detailId} setDetailId={setDetailId} cartCount={cartCount} onCartUpdate={onCartUpdate} />
      </div>
    </AuthProvider>
  );
}

function AppInner({ page, setPage, detailId, setDetailId, cartCount, onCartUpdate }) {
  const { user } = useAuth();

  // Redirect to login if accessing protected routes without auth
  const protectedPages = ["cart", "my-orders", "admin"];
  useEffect(() => {
    if (!user && protectedPages.includes(page)) setPage("login");
  }, [user, page]);

  // Redirect away from auth pages if logged in
  useEffect(() => {
    if (user && (page === "login" || page === "register")) setPage("products");
  }, [user]);

  return (
    <>
      <Navbar page={page} setPage={setPage} cartCount={cartCount} />
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
