import React, { useState, useEffect } from 'react';

const PRODUCTS = [
  {
    id: "PV-US-02",
    category: "Fashion",
    name: "Women's Yoga Vest Halter Beautiful Back Tank-top",
    price: "19.56",
    oldPrice: "26.90",
    image: "https://cjdropshipping.com",
    payUrl: "https://stripe.com",
    desc: "Premium breathable women's halter yoga vest with cross back design."
  },
  {
    id: "PV-US-03",
    category: "Watches",
    name: "POEDAGAR Multifunction Dual Display Luminous Quartz Men's Watch",
    price: "29.90",
    oldPrice: "45.00",
    image: "https://timeelegance.com.bd",
    payUrl: "https://stripe.com",
    desc: "Luxury analog and digital dual display watch with stainless steel strap."
  },
  {
    id: "PV-US-04",
    category: "Electronics",
    name: "3 Batteries Pro Drone 4K Selfie Camera Wifi Fpv Foldable Rc Quadcopter",
    price: "165.55",
    oldPrice: "219.00",
    image: "https://cjdropshipping.com",
    payUrl: "https://stripe.com",
    desc: "4K dual camera foldable drone with 3 batteries and WiFi FPV."
  },
  {
    id: "PV-US-05",
    category: "Fashion",
    name: "Women's French-Style Asymmetrical One-Shoulder Vacation Casual Dress",
    price: "16.49",
    oldPrice: "24.50",
    image: "https://cjdropshipping.com",
    payUrl: "https://stripe.com",
    desc: "Chic French-inspired one-shoulder solid color A-line dress."
  }
];


const COUNTRIES = ["United States", "United Arab Emirates", "Saudi Arabia", "Kuwait", "Qatar", "Bahrain", "Oman"];

export default function App() {
  const [cat, setCat] = useState('All');
  const [prod, setProd] = useState<any>(null);
  const [page, setPage] = useState<string | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('United States');
  const [email, setEmail] = useState('');
  const [addr, setAddr] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('product');
    if (id) setProd(PRODUCTS.find((p) => p.id === id) || null);
  }, []);

  const viewProd = (p: any) => {
    setProd(p); setPage(null);
    const u = new URL(window.location.href);
    u.searchParams.set('product', p.id);
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const goHome = (c = 'All') => {
    setProd(null); setPage(null); setCat(c);
    const u = new URL(window.location.href);
    u.searchParams.delete('product');
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const addCart = (p: any) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.p.id === p.id);
      return ex ? prev.map((i) => i.p.id === p.id ? { ...i, q: i.q + 1 } : i) : [...prev, { p, q: 1 }];
    });
    setOpen(true); setDone(false);
  };

  const total = cart.reduce((s, i) => s + parseFloat(i.p.price) * i.q, 0).toFixed(2);
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  const policies: Record<string, { t: string; c: string }> = {
    about: { t: "About Us", c: "Pavilion Venture is an international online store serving customers across the United States and Middle East with tracked delivery." },
    shipping: { t: "Shipping Policy", c: "Destinations: US, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman.\nProcessing: 1–3 business days.\nDelivery: 6–12 business days. Free Standard Tracked Shipping." },
    refund: { t: "Return & Refund Policy", c: "30-Day Return Guarantee: Items may be returned within 30 days if unused and in original packaging. Refunds are processed in USD within 3–5 business days." },
    privacy: { t: "Privacy Policy", c: "We collect only the information needed to fulfill your order. All transactions are SSL encrypted. We never sell personal data." },
    terms: { t: "Terms of Service", c: "All prices on ://pavilionventure.com are in USD. Orders ship exclusively to the US and eligible Middle East countries." },
    contact: { t: "Contact Us", c: "Pavilion Venture Enterprise\nAddress: Block C-10-06, Setia City Residences, Persiaran Setia Dagang, Seksyen U13, 40170 Shah Alam, Selangor, Malaysia\nEmail: support@pavilionventure.com\nTel: +60166787883" }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111827', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div style={{ backgroundColor: '#111827', color: '#fff', textAlign: 'center', fontSize: '12px', padding: '8px' }}>
        Free Tracked Shipping to US &amp; Middle East · All Prices in USD ($)
      </div>

      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div onClick={() => goHome('All')} style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer' }}>PAVILION VENTURE</div>
          <nav style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
            {['All', 'Electronics', 'Watches', 'Fashion'].map((c) => (
              <button key={c} onClick={() => goHome(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: cat === c && !prod && !page ? 700 : 500, color: cat === c ? '#111827' : '#6b7280' }}>
                {c === 'All' ? 'All Products' : c}
              </button>
            ))}
          </nav>
          <button onClick={() => { setOpen(true); setDone(false); }} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
            Cart ({cart.reduce((s, i) => s + i.q, 0)}) · ${total}
          </button>
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '24px 20px', boxSizing: 'border-box' }}>
        {page && policies[page] ? (
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', maxWidth: '760px', margin: '0 auto' }}>
            <button onClick={() => goHome('All')} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', marginBottom: '12px' }}>← Back to Store</button>
            <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>{policies[page].t}</h1>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-line' }}>{policies[page].c}</p>
          </div>
        ) : prod ? (
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <button onClick={() => goHome('All')} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', marginBottom: '16px' }}>← Back to Products</button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'start' }}>
              <img src={prod.image} alt={prod.name} style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#f3f4f6', padding: '12px', boxSizing: 'border-box' }} />
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{prod.category} · SKU: {prod.id}</div>
                <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '8px 0 12px 0' }}>{prod.name}</h1>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginBottom: '12px' }}>${prod.price} USD <span style={{ fontSize: '15px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${prod.oldPrice}</span></div>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#4b5563', marginBottom: '20px' }}>{prod.desc}</p>
                <button onClick={() => addCart(prod)} style={{ width: '100%', maxWidth: '280px', backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                  Add to Cart — ${prod.price} USD
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '18px' }}>
            {list.map((p) => (
              <div key={p.id} style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <img src={p.image} alt={p.name} onClick={() => viewProd(p)} style={{ width: '100%', height: '200px', objectFit: 'contain', backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer' }} />
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600 }}>{p.category}</div>
                  <h3 onClick={() => viewProd(p)} style={{ fontSize: '15px', fontWeight: 700, margin: '4px 0 8px 0', cursor: 'pointer' }}>{p.name}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>{p.desc}</p>
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', marginBottom: '10px' }}>${p.price} USD <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${p.oldPrice}</span></div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => addCart(p)} style={{ flex: 1, backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Add to Cart</button>
                    <button onClick={() => viewProd(p)} style={{ backgroundColor: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {open && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '360px', height: '100%', padding: '20px', boxSizing: 'border-box', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Shopping Cart</h2>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            {done ? (
              <div style={{ backgroundColor: '#ecfdf5', padding: '16px', borderRadius: '8px', color: '#065f46', fontSize: '13px' }}>
                <strong>Order Received!</strong> A USD payment link has been sent to <strong>{email}</strong> for delivery to <strong>{country}</strong>.
              </div>
            ) : cart.length === 0 ? (
              <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((i) => (
                  <div key={i.p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{i.p.name} (x{i.q})</div>
                    <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700 }}>${(parseFloat(i.p.price) * i.q).toFixed(2)}</div>
                  </div>
                ))}
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); setCart([]); }} style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px' }}>Total (Free Shipping): ${total} USD</div>
                  <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                    {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                  <input type="email" required placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                  <textarea required rows={2} placeholder="Street, City, State/Emirate, Postal Code" value={addr} onChange={(e) => setAddr(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                  <button type="submit" style={{ width: '100%', backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
                    Checkout (${total} USD)
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <footer style={{ backgroundColor: '#fff', borderTop: '1px solid #e5e7eb', padding: '24px 20px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '12px' }}>
          {[{ k: 'about', l: 'About Us' }, { k: 'shipping', l: 'Shipping Policy' }, { k: 'refund', l: 'Return & Refund' }, { k: 'privacy', l: 'Privacy Policy' }, { k: 'terms', l: 'Terms' }, { k: 'contact', l: 'Contact Us' }].map((item) => (
            <button key={item.k} onClick={() => { setPage(item.k); setProd(null); window.scrollTo(0, 0); }} style={{ background: 'none', border: 'none', color: '#374151', cursor: 'pointer', fontSize: '13px' }}>
              {item.l}
            </button>
          ))}
        </div>
        <p style={{ margin: '0 0 4px 0', color: '#111827', fontWeight: 700 }}>© 2026 Pavilion Venture Enterprise. All rights reserved.</p>
        <p style={{ margin: '0 0 4px 0' }}>Block C-10-06, Setia City Residences, Persiaran Setia Dagang, Seksyen U13, 40170 Shah Alam, Selangor, Malaysia</p>
        <p style={{ margin: 0 }}>Email: support@pavilionventure.com · Tel: +60166787883 · Currency: USD ($)</p>
      </footer>
    </div>
  );
}
