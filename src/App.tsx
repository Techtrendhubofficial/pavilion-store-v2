import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  video?: string;
  desc: string;
}

const PRODUCTS: Product[] = [
  {
    id: "PV-US-06",
    category: "Electronics",
    name: "360° Rotating Magnetic Fast Charging Cable (Type-C, 3FT Black)",
    price: "16.90",
    oldPrice: "24.90",
    image: "https://cf.cjdropshipping.com/15452352/4425658622770.jpg",
    video: "",
    desc: "360-degree rotating magnetic connector Type-C fast charging cable for effortless one-hand connection and dust protection."
  },
  {
    id: "PV-US-07",
    category: "Electronics",
    name: "240W 2-in-1 Fast Charging Foldable Phone Stand Data Cable (Type-C to Type-C)",
    price: "22.90",
    oldPrice: "32.00",
    image: "https://cf.cjdropshipping.com/quick/product/17cb4deb-f608-4add-9276-61729d994e7b.jpg",
    video: "/videos/c5053ec2cbd54d46a0edaf1cfb62084e-d3dc9e7bfb52d7e09b8c6640734cf3dd-ld.mp4",
    desc: "240W high-speed Type-C to Type-C charging cable with built-in foldable desktop phone stand."
  },
  {
    id: "PV-US-08",
    category: "Electronics",
    name: "Gravity Bracket Car Wireless Charger & Auto-Clamping Phone Mount",
    price: "39.90",
    oldPrice: "55.00",
    image: "https://cf.cjdropshipping.com/15247008/804007468341.jpg",
    video: "",
    desc: "Smart gravity auto-clamping car air-vent phone holder with fast wireless charging support."
  },
  {
    id: "PV-US-09",
    category: "Fashion",
    name: "Funny Puppy Soldier Standing Costume Suit for Small & Medium Dogs",
    price: "32.90",
    oldPrice: "45.00",
    image: "https://oss-cf.cjdropshipping.com/product/2026/10/04/06/7c9decbb-21fb-4f92-ba39-03c2d9b09394_water.jpeg",
    video: "",
    desc: "Hilarious standing soldier uniform costume for dogs and cats, soft breathable fabric for parties and photos."
  },
  {
    id: "PV-US-10",
    category: "Fashion",
    name: "Large Capacity Foldable Convertible Suit Garment Travel Duffle Bag",
    price: "69.90",
    oldPrice: "95.00",
    image: "https://cf.cjdropshipping.com/4dd4c97d-2a6a-4842-b0f8-489e87cfdc5b.jpg",
    video: "/videos/346fd8e6cf3b4fc09746bb61c13abf67-c9ecf58f42330638044a637a27ff3056-ld.mp4",
    desc: "2-in-1 convertible hanging garment bag and carry-on travel duffle with dedicated shoe compartment."
  },
  {
    id: "PV-US-11",
    category: "Beauty & Care",
    name: "EMS Thermal Neck Lifting & Firming Microcurrent Facial Massager",
    price: "44.90",
    oldPrice: "64.00",
    image: "https://oss-cf.cjdropshipping.com/product/2026/04/10/09/7026c535-dccb-4ca5-85d6-03731e36a688.jpg",
    video: "/videos/711225415a034b35b8cbf7b629bde1c7-89d9a16e53244a9f29c42a1e61c7aff3-ld.mp4",
    desc: "3-mode sonic vibration, thermal warmth, and EMS microcurrent device for neck and jawline skin tightening."
  },
  {
    id: "PV-US-12",
    category: "Home & Auto",
    name: "Cordless Handheld High-Power Car & Home Mini Vacuum Cleaner",
    price: "34.90",
    oldPrice: "49.00",
    image: "https://cf.cjdropshipping.com/1623900076083.jpg",
    video: "/videos/1d01e949f75644599b98e98905c51ede-59444dc31a0d7d7e84a3a8ff62728b30-ld.mp4",
    desc: "Lightweight cordless portable vacuum cleaner with strong suction for car interiors, sofas, and keyboards."
  },
  {
    id: "PV-US-13",
    category: "Electronics",
    name: "Crystal Cylinder Lipstick Design 32GB High-Speed USB Flash Drive",
    price: "21.90",
    oldPrice: "29.90",
    image: "https://cf.cjdropshipping.com/2048/42836846567.jpg",
    video: "",
    desc: "Stylish crystal lipstick-shaped 32GB portable USB memory stick, waterproof and shockproof gift design."
  },
  {
    id: "PV-US-14",
    category: "Beauty & Care",
    name: "Multifunctional Ceramic Hair & Beard Straightener Comb Brush",
    price: "21.90",
    oldPrice: "31.00",
    image: "https://cf.cjdropshipping.com/1620871830175.jpg",
    video: "/videos/413b03660f824f96a9dca8b8a85dcbab-521f294b3a07e66f5d08718946b94c7a-ld.mp4",
    desc: "Anti-scald PTC fast-heating straightening brush for smooth hair and beard styling in minutes."
  },
  {
    id: "PV-US-15",
    category: "Home & Auto",
    name: "Mini Portable Handheld Garment Steamer & Travel Fabric Iron (US Plug)",
    price: "27.90",
    oldPrice: "39.90",
    image: "https://oss-cf.cjdropshipping.com/product/2026/09/08/09/fbb74ee0-173b-4eae-93c0-b2776242b70d.jpg",
    video: "/videos/af10001b08be4e4fadd552ce96c05857-457be73b9ca938a39fc50e4670ec4aee-ld.mp4",
    desc: "Compact rapid-heating handheld steam iron for wrinkles removal at home or on business trips."
  }
];

export default function App() {
  const [cat, setCat] = useState('All');
  const [prod, setProd] = useState<Product | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const [cart, setCart] = useState<{ p: Product; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('product');
    if (id) setProd(PRODUCTS.find((p) => p.id === id) || null);

    const status = params.get('checkout');
    if (status === 'success' || status === 'cancel') {
      setCheckoutStatus(status);
      if (status === 'success') setCart([]);
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('checkout');
      window.history.replaceState({}, '', cleanUrl.toString());
    }
  }, []);

  const viewProd = (p: Product) => {
    setProd(p);
    setPage(null);
    const u = new URL(window.location.href);
    u.searchParams.set('product', p.id);
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const goHome = (c = 'All') => {
    setProd(null);
    setPage(null);
    setCat(c);
    const u = new URL(window.location.href);
    u.searchParams.delete('product');
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const addCart = (p: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.p.id === p.id);
      return ex ? prev.map((i) => (i.p.id === p.id ? { ...i, q: i.q + 1 } : i)) : [...prev, { p, q: 1 }];
    });
    setOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.p.id === id ? { ...i, q: i.q + delta } : i))
        .filter((i) => i.q > 0)
    );
  };

  const handleStripeCheckout = async () => {
    if (cart.length === 0 || loadingCheckout) return;
    setLoadingCheckout(true);
    try {
      const items = cart.map((i) => ({
        id: i.p.id,
        name: i.p.name,
        price: i.p.price,
        image: i.p.image,
        q: i.q,
      }));

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed: ' + (data.error || 'Please try again.'));
        setLoadingCheckout(false);
      }
    } catch (err) {
      alert('Network error connecting to Stripe. Please try again.');
      setLoadingCheckout(false);
    }
  };

  const total = cart.reduce((s, i) => s + parseFloat(i.p.price) * i.q, 0).toFixed(2);
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const policies: Record<string, { t: string; c: string }> = {
    about: {
      t: "About Us",
      c: "Pavilion Venture is an international online store serving customers across the United States, UK, Canada, Australia, and the Middle East with free tracked delivery."
    },
    shipping: {
      t: "Shipping Policy",
      c: "Destinations: US, UK, Canada, Australia, New Zealand, Ireland, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman.\nProcessing: 1–3 business days.\nDelivery: 6–12 business days via Free Tracked International Shipping."
    },
    refund: {
      t: "Return & Refund Policy",
      c: "30-Day Return Guarantee: Items may be returned within 30 days if unused and in original packaging. Refunds are processed in USD within 3–5 business days."
    },
    privacy: {
      t: "Privacy Policy",
      c: "We collect only the information needed to fulfill your order. All card transactions are securely processed and SSL encrypted via Stripe. We never sell personal data."
    },
    terms: {
      t: "Terms of Service",
      c: "All prices on https://shop.pavilionventure.com are in USD ($). Orders ship with international tracking to supported destinations."
    },
    contact: {
      t: "Contact Us",
      c: "Pavilion Venture Enterprise\nAddress: Block C-10-06, Setia City Residences, Persiaran Setia Dagang, Seksyen U13, 40170 Shah Alam, Selangor, Malaysia\nEmail: support@pavilionventure.com\nTel: +60166787883"
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111827', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div style={{ backgroundColor: '#111827', color: '#fff', textAlign: 'center', fontSize: '12px', padding: '8px' }}>
        Free Tracked Worldwide Shipping · All Prices in USD ($)
      </div>

      {checkoutStatus === 'success' && (
        <div style={{ backgroundColor: '#059669', color: '#fff', textAlign: 'center', fontSize: '13px', padding: '10px 16px', fontWeight: 600 }}>
          Payment Successful! Thank you for your order. A confirmation receipt has been sent to your email.
          <button onClick={() => setCheckoutStatus(null)} style={{ marginLeft: '12px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {checkoutStatus === 'cancel' && (
        <div style={{ backgroundColor: '#fef3c7', color: '#92400e', textAlign: 'center', fontSize: '13px', padding: '10px 16px', fontWeight: 600 }}>
          Checkout was cancelled. Your items are still saved in your cart.
          <button onClick={() => setCheckoutStatus(null)} style={{ marginLeft: '12px', background: 'none', border: '1px solid #92400e', color: '#92400e', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div onClick={() => goHome('All')} style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer' }}>PAVILION VENTURE</div>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => goHome(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: cat === c && !prod && !page ? 700 : 500, color: cat === c ? '#111827' : '#6b7280' }}>
                {c === 'All' ? 'All Products' : c}
              </button>
            ))}
          </nav>
          <button onClick={() => setOpen(true)} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <img src={prod.image} alt={prod.name} style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#f3f4f6', padding: '12px', boxSizing: 'border-box' }} />
                {prod.video && (
                  <video
                    src={prod.video}
                    controls
                    muted
                    playsInline
                    onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }}
                    style={{ width: '100%', maxHeight: '320px', borderRadius: '10px', backgroundColor: '#000' }}
                  />
                )}
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{prod.category} · SKU: {prod.id}</div>
                <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '8px 0 12px 0' }}>{prod.name}</h1>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginBottom: '12px' }}>
                  ${prod.price} USD <span style={{ fontSize: '15px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${prod.oldPrice}</span>
                </div>
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
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', marginBottom: '10px' }}>
                    ${p.price} USD <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${p.oldPrice}</span>
                  </div>
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
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '360px', height: '100%', padding: '20px', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Shopping Cart</h2>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>
              {cart.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
              ) : (
                cart.map((i) => (
                  <div key={i.p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6', gap: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{i.p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => updateQty(i.p.id, -1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{i.q}</span>
                      <button onClick={() => updateQty(i.p.id, 1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>+</button>
                    </div>
                    <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700, minWidth: '58px', textAlign: 'right' }}>
                      ${(parseFloat(i.p.price) * i.q).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
                  <span>Tracked International Shipping</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', marginBottom: '14px' }}>
                  <span>Total</span>
                  <span>${total} USD</span>
                </div>
                <button
                  onClick={handleStripeCheckout}
                  disabled={loadingCheckout}
                  style={{
                    width: '100%',
                    backgroundColor: loadingCheckout ? '#6b7280' : '#111827',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '13px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: loadingCheckout ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loadingCheckout ? 'Redirecting to Stripe...' : `Secure Checkout ($${total} USD)`}
                </button>
                <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280', marginTop: '8px' }}>
                  Encrypted Card, Apple Pay &amp; Google Pay via Stripe
                </div>
              </div>
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
                       }import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  video?: string;
  desc: string;
}

const PRODUCTS: Product[] = [
  {
    id: "PV-US-06",
    category: "Electronics",
    name: "360° Rotating Magnetic Fast Charging Cable (Type-C, 3FT Black)",
    price: "16.90",
    oldPrice: "24.90",
    image: "https://cf.cjdropshipping.com/15452352/4425658622770.jpg",
    video: "",
    desc: "360-degree rotating magnetic connector Type-C fast charging cable for effortless one-hand connection and dust protection."
  },
  {
    id: "PV-US-07",
    category: "Electronics",
    name: "240W 2-in-1 Fast Charging Foldable Phone Stand Data Cable (Type-C to Type-C)",
    price: "22.90",
    oldPrice: "32.00",
    image: "https://cf.cjdropshipping.com/quick/product/17cb4deb-f608-4add-9276-61729d994e7b.jpg",
    video: "/videos/c5053ec2cbd54d46a0edaf1cfb62084e-d3dc9e7bfb52d7e09b8c6640734cf3dd-ld.mp4",
    desc: "240W high-speed Type-C to Type-C charging cable with built-in foldable desktop phone stand."
  },
  {
    id: "PV-US-08",
    category: "Electronics",
    name: "Gravity Bracket Car Wireless Charger & Auto-Clamping Phone Mount",
    price: "39.90",
    oldPrice: "55.00",
    image: "https://cf.cjdropshipping.com/15247008/804007468341.jpg",
    video: "",
    desc: "Smart gravity auto-clamping car air-vent phone holder with fast wireless charging support."
  },
  {
    id: "PV-US-09",
    category: "Fashion",
    name: "Funny Puppy Soldier Standing Costume Suit for Small & Medium Dogs",
    price: "32.90",
    oldPrice: "45.00",
    image: "https://oss-cf.cjdropshipping.com/product/2026/10/04/06/7c9decbb-21fb-4f92-ba39-03c2d9b09394_water.jpeg",
    video: "",
    desc: "Hilarious standing soldier uniform costume for dogs and cats, soft breathable fabric for parties and photos."
  },
  {
    id: "PV-US-10",
    category: "Fashion",
    name: "Large Capacity Foldable Convertible Suit Garment Travel Duffle Bag",
    price: "69.90",
    oldPrice: "95.00",
    image: "https://cf.cjdropshipping.com/4dd4c97d-2a6a-4842-b0f8-489e87cfdc5b.jpg",
    video: "/videos/346fd8e6cf3b4fc09746bb61c13abf67-c9ecf58f42330638044a637a27ff3056-ld.mp4",
    desc: "2-in-1 convertible hanging garment bag and carry-on travel duffle with dedicated shoe compartment."
  },
  {
    id: "PV-US-11",
    category: "Beauty & Care",
    name: "EMS Thermal Neck Lifting & Firming Microcurrent Facial Massager",
    price: "44.90",
    oldPrice: "64.00",
    image: "https://oss-cf.cjdropshipping.com/product/2026/04/10/09/7026c535-dccb-4ca5-85d6-03731e36a688.jpg",
    video: "/videos/711225415a034b35b8cbf7b629bde1c7-89d9a16e53244a9f29c42a1e61c7aff3-ld.mp4",
    desc: "3-mode sonic vibration, thermal warmth, and EMS microcurrent device for neck and jawline skin tightening."
  },
  {
    id: "PV-US-12",
    category: "Home & Auto",
    name: "Cordless Handheld High-Power Car & Home Mini Vacuum Cleaner",
    price: "34.90",
    oldPrice: "49.00",
    image: "https://cf.cjdropshipping.com/1623900076083.jpg",
    video: "/videos/1d01e949f75644599b98e98905c51ede-59444dc31a0d7d7e84a3a8ff62728b30-ld.mp4",
    desc: "Lightweight cordless portable vacuum cleaner with strong suction for car interiors, sofas, and keyboards."
  },
  {
    id: "PV-US-13",
    category: "Electronics",
    name: "Crystal Cylinder Lipstick Design 32GB High-Speed USB Flash Drive",
    price: "21.90",
    oldPrice: "29.90",
    image: "https://cf.cjdropshipping.com/2048/42836846567.jpg",
    video: "",
    desc: "Stylish crystal lipstick-shaped 32GB portable USB memory stick, waterproof and shockproof gift design."
  },
  {
    id: "PV-US-14",
    category: "Beauty & Care",
    name: "Multifunctional Ceramic Hair & Beard Straightener Comb Brush",
    price: "21.90",
    oldPrice: "31.00",
    image: "https://cf.cjdropshipping.com/1620871830175.jpg",
    video: "/videos/413b03660f824f96a9dca8b8a85dcbab-521f294b3a07e66f5d08718946b94c7a-ld.mp4",
    desc: "Anti-scald PTC fast-heating straightening brush for smooth hair and beard styling in minutes."
  },
  {
    id: "PV-US-15",
    category: "Home & Auto",
    name: "Mini Portable Handheld Garment Steamer & Travel Fabric Iron (US Plug)",
    price: "27.90",
    oldPrice: "39.90",
    image: "https://oss-cf.cjdropshipping.com/product/2026/09/08/09/fbb74ee0-173b-4eae-93c0-b2776242b70d.jpg",
    video: "/videos/af10001b08be4e4fadd552ce96c05857-457be73b9ca938a39fc50e4670ec4aee-ld.mp4",
    desc: "Compact rapid-heating handheld steam iron for wrinkles removal at home or on business trips."
  }
];

export default function App() {
  const [cat, setCat] = useState('All');
  const [prod, setProd] = useState<Product | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const [cart, setCart] = useState<{ p: Product; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('product');
    if (id) setProd(PRODUCTS.find((p) => p.id === id) || null);

    const status = params.get('checkout');
    if (status === 'success' || status === 'cancel') {
      setCheckoutStatus(status);
      if (status === 'success') setCart([]);
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('checkout');
      window.history.replaceState({}, '', cleanUrl.toString());
    }
  }, []);

  const viewProd = (p: Product) => {
    setProd(p);
    setPage(null);
    const u = new URL(window.location.href);
    u.searchParams.set('product', p.id);
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const goHome = (c = 'All') => {
    setProd(null);
    setPage(null);
    setCat(c);
    const u = new URL(window.location.href);
    u.searchParams.delete('product');
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const addCart = (p: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.p.id === p.id);
      return ex ? prev.map((i) => (i.p.id === p.id ? { ...i, q: i.q + 1 } : i)) : [...prev, { p, q: 1 }];
    });
    setOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.p.id === id ? { ...i, q: i.q + delta } : i))
        .filter((i) => i.q > 0)
    );
  };

  const handleStripeCheckout = async () => {
    if (cart.length === 0 || loadingCheckout) return;
    setLoadingCheckout(true);
    try {
      const items = cart.map((i) => ({
        id: i.p.id,
        name: i.p.name,
        price: i.p.price,
        image: i.p.image,
        q: i.q,
      }));

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed: ' + (data.error || 'Please try again.'));
        setLoadingCheckout(false);
      }
    } catch (err) {
      alert('Network error connecting to Stripe. Please try again.');
      setLoadingCheckout(false);
    }
  };

  const total = cart.reduce((s, i) => s + parseFloat(i.p.price) * i.q, 0).toFixed(2);
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const policies: Record<string, { t: string; c: string }> = {
    about: {
      t: "About Us",
      c: "Pavilion Venture is an international online store serving customers across the United States, UK, Canada, Australia, and the Middle East with free tracked delivery."
    },
    shipping: {
      t: "Shipping Policy",
      c: "Destinations: US, UK, Canada, Australia, New Zealand, Ireland, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman.\nProcessing: 1–3 business days.\nDelivery: 6–12 business days via Free Tracked International Shipping."
    },
    refund: {
      t: "Return & Refund Policy",
      c: "30-Day Return Guarantee: Items may be returned within 30 days if unused and in original packaging. Refunds are processed in USD within 3–5 business days."
    },
    privacy: {
      t: "Privacy Policy",
      c: "We collect only the information needed to fulfill your order. All card transactions are securely processed and SSL encrypted via Stripe. We never sell personal data."
    },
    terms: {
      t: "Terms of Service",
      c: "All prices on https://shop.pavilionventure.com are in USD ($). Orders ship with international tracking to supported destinations."
    },
    contact: {
      t: "Contact Us",
      c: "Pavilion Venture Enterprise\nAddress: Block C-10-06, Setia City Residences, Persiaran Setia Dagang, Seksyen U13, 40170 Shah Alam, Selangor, Malaysia\nEmail: support@pavilionventure.com\nTel: +60166787883"
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111827', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div style={{ backgroundColor: '#111827', color: '#fff', textAlign: 'center', fontSize: '12px', padding: '8px' }}>
        Free Tracked Worldwide Shipping · All Prices in USD ($)
      </div>

      {checkoutStatus === 'success' && (
        <div style={{ backgroundColor: '#059669', color: '#fff', textAlign: 'center', fontSize: '13px', padding: '10px 16px', fontWeight: 600 }}>
          Payment Successful! Thank you for your order. A confirmation receipt has been sent to your email.
          <button onClick={() => setCheckoutStatus(null)} style={{ marginLeft: '12px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {checkoutStatus === 'cancel' && (
        <div style={{ backgroundColor: '#fef3c7', color: '#92400e', textAlign: 'center', fontSize: '13px', padding: '10px 16px', fontWeight: 600 }}>
          Checkout was cancelled. Your items are still saved in your cart.
          <button onClick={() => setCheckoutStatus(null)} style={{ marginLeft: '12px', background: 'none', border: '1px solid #92400e', color: '#92400e', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div onClick={() => goHome('All')} style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer' }}>PAVILION VENTURE</div>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => goHome(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: cat === c && !prod && !page ? 700 : 500, color: cat === c ? '#111827' : '#6b7280' }}>
                {c === 'All' ? 'All Products' : c}
              </button>
            ))}
          </nav>
          <button onClick={() => setOpen(true)} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <img src={prod.image} alt={prod.name} style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#f3f4f6', padding: '12px', boxSizing: 'border-box' }} />
                {prod.video && (
                  <video
                    src={prod.video}
                    controls
                    muted
                    playsInline
                    onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }}
                    style={{ width: '100%', maxHeight: '320px', borderRadius: '10px', backgroundColor: '#000' }}
                  />
                )}
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{prod.category} · SKU: {prod.id}</div>
                <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '8px 0 12px 0' }}>{prod.name}</h1>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginBottom: '12px' }}>
                  ${prod.price} USD <span style={{ fontSize: '15px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${prod.oldPrice}</span>
                </div>
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
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', marginBottom: '10px' }}>
                    ${p.price} USD <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${p.oldPrice}</span>
                  </div>
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
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '360px', height: '100%', padding: '20px', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Shopping Cart</h2>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>
              {cart.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
              ) : (
                cart.map((i) => (
                  <div key={i.p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6', gap: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{i.p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => updateQty(i.p.id, -1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{i.q}</span>
                      <button onClick={() => updateQty(i.p.id, 1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>+</button>
                    </div>
                    <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700, minWidth: '58px', textAlign: 'right' }}>
                      ${(parseFloat(i.p.price) * i.q).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
                  <span>Tracked International Shipping</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', marginBottom: '14px' }}>
                  <span>Total</span>
                  <span>${total} USD</span>
                </div>
                <button
                  onClick={handleStripeCheckout}
                  disabled={loadingCheckout}
                  style={{
                    width: '100%',
                    backgroundColor: loadingCheckout ? '#6b7280' : '#111827',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '13px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: loadingCheckout ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loadingCheckout ? 'Redirecting to Stripe...' : `Secure Checkout ($${total} USD)`}
                </button>
                <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280', marginTop: '8px' }}>
                  Encrypted Card, Apple Pay &amp; Google Pay via Stripe
                </div>
              </div>
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
          }import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  video?: string;
  desc: string;
}

const PRODUCTS: Product[] = [
  {
    id: "PV-US-06",
    category: "Electronics",
    name: "360° Rotating Magnetic Fast Charging Cable (Type-C, 3FT Black)",
    price: "16.90",
    oldPrice: "24.90",
    image: "https://cf.cjdropshipping.com/15452352/4425658622770.jpg",
    video: "",
    desc: "360-degree rotating magnetic connector Type-C fast charging cable for effortless one-hand connection and dust protection."
  },
  {
    id: "PV-US-07",
    category: "Electronics",
    name: "240W 2-in-1 Fast Charging Foldable Phone Stand Data Cable (Type-C to Type-C)",
    price: "22.90",
    oldPrice: "32.00",
    image: "https://cf.cjdropshipping.com/quick/product/17cb4deb-f608-4add-9276-61729d994e7b.jpg",
    video: "/videos/c5053ec2cbd54d46a0edaf1cfb62084e-d3dc9e7bfb52d7e09b8c6640734cf3dd-ld.mp4",
    desc: "240W high-speed Type-C to Type-C charging cable with built-in foldable desktop phone stand."
  },
  {
    id: "PV-US-08",
    category: "Electronics",
    name: "Gravity Bracket Car Wireless Charger & Auto-Clamping Phone Mount",
    price: "39.90",
    oldPrice: "55.00",
    image: "https://cf.cjdropshipping.com/15247008/804007468341.jpg",
    video: "",
    desc: "Smart gravity auto-clamping car air-vent phone holder with fast wireless charging support."
  },
  {
    id: "PV-US-09",
    category: "Fashion",
    name: "Funny Puppy Soldier Standing Costume Suit for Small & Medium Dogs",
    price: "32.90",
    oldPrice: "45.00",
    image: "https://oss-cf.cjdropshipping.com/product/2026/10/04/06/7c9decbb-21fb-4f92-ba39-03c2d9b09394_water.jpeg",
    video: "",
    desc: "Hilarious standing soldier uniform costume for dogs and cats, soft breathable fabric for parties and photos."
  },
  {
    id: "PV-US-10",
    category: "Fashion",
    name: "Large Capacity Foldable Convertible Suit Garment Travel Duffle Bag",
    price: "69.90",
    oldPrice: "95.00",
    image: "https://cf.cjdropshipping.com/4dd4c97d-2a6a-4842-b0f8-489e87cfdc5b.jpg",
    video: "/videos/346fd8e6cf3b4fc09746bb61c13abf67-c9ecf58f42330638044a637a27ff3056-ld.mp4",
    desc: "2-in-1 convertible hanging garment bag and carry-on travel duffle with dedicated shoe compartment."
  },
  {
    id: "PV-US-11",
    category: "Beauty & Care",
    name: "EMS Thermal Neck Lifting & Firming Microcurrent Facial Massager",
    price: "44.90",
    oldPrice: "64.00",
    image: "https://oss-cf.cjdropshipping.com/product/2026/04/10/09/7026c535-dccb-4ca5-85d6-03731e36a688.jpg",
    video: "/videos/711225415a034b35b8cbf7b629bde1c7-89d9a16e53244a9f29c42a1e61c7aff3-ld.mp4",
    desc: "3-mode sonic vibration, thermal warmth, and EMS microcurrent device for neck and jawline skin tightening."
  },
  {
    id: "PV-US-12",
    category: "Home & Auto",
    name: "Cordless Handheld High-Power Car & Home Mini Vacuum Cleaner",
    price: "34.90",
    oldPrice: "49.00",
    image: "https://cf.cjdropshipping.com/1623900076083.jpg",
    video: "/videos/1d01e949f75644599b98e98905c51ede-59444dc31a0d7d7e84a3a8ff62728b30-ld.mp4",
    desc: "Lightweight cordless portable vacuum cleaner with strong suction for car interiors, sofas, and keyboards."
  },
  {
    id: "PV-US-13",
    category: "Electronics",
    name: "Crystal Cylinder Lipstick Design 32GB High-Speed USB Flash Drive",
    price: "21.90",
    oldPrice: "29.90",
    image: "https://cf.cjdropshipping.com/2048/42836846567.jpg",
    video: "",
    desc: "Stylish crystal lipstick-shaped 32GB portable USB memory stick, waterproof and shockproof gift design."
  },
  {
    id: "PV-US-14",
    category: "Beauty & Care",
    name: "Multifunctional Ceramic Hair & Beard Straightener Comb Brush",
    price: "21.90",
    oldPrice: "31.00",
    image: "https://cf.cjdropshipping.com/1620871830175.jpg",
    video: "/videos/413b03660f824f96a9dca8b8a85dcbab-521f294b3a07e66f5d08718946b94c7a-ld.mp4",
    desc: "Anti-scald PTC fast-heating straightening brush for smooth hair and beard styling in minutes."
  },
  {
    id: "PV-US-15",
    category: "Home & Auto",
    name: "Mini Portable Handheld Garment Steamer & Travel Fabric Iron (US Plug)",
    price: "27.90",
    oldPrice: "39.90",
    image: "https://oss-cf.cjdropshipping.com/product/2026/09/08/09/fbb74ee0-173b-4eae-93c0-b2776242b70d.jpg",
    video: "/videos/af10001b08be4e4fadd552ce96c05857-457be73b9ca938a39fc50e4670ec4aee-ld.mp4",
    desc: "Compact rapid-heating handheld steam iron for wrinkles removal at home or on business trips."
  }
];

export default function App() {
  const [cat, setCat] = useState('All');
  const [prod, setProd] = useState<Product | null>(null);
  const [page, setPage] = useState<string | null>(null);
  const [cart, setCart] = useState<{ p: Product; q: number }[]>([]);
  const [open, setOpen] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<'success' | 'cancel' | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('product');
    if (id) setProd(PRODUCTS.find((p) => p.id === id) || null);

    const status = params.get('checkout');
    if (status === 'success' || status === 'cancel') {
      setCheckoutStatus(status);
      if (status === 'success') setCart([]);
      const cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete('checkout');
      window.history.replaceState({}, '', cleanUrl.toString());
    }
  }, []);

  const viewProd = (p: Product) => {
    setProd(p);
    setPage(null);
    const u = new URL(window.location.href);
    u.searchParams.set('product', p.id);
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const goHome = (c = 'All') => {
    setProd(null);
    setPage(null);
    setCat(c);
    const u = new URL(window.location.href);
    u.searchParams.delete('product');
    window.history.pushState({}, '', u.toString());
    window.scrollTo(0, 0);
  };

  const addCart = (p: Product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.p.id === p.id);
      return ex ? prev.map((i) => (i.p.id === p.id ? { ...i, q: i.q + 1 } : i)) : [...prev, { p, q: 1 }];
    });
    setOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.p.id === id ? { ...i, q: i.q + delta } : i))
        .filter((i) => i.q > 0)
    );
  };

  const handleStripeCheckout = async () => {
    if (cart.length === 0 || loadingCheckout) return;
    setLoadingCheckout(true);
    try {
      const items = cart.map((i) => ({
        id: i.p.id,
        name: i.p.name,
        price: i.p.price,
        image: i.p.image,
        q: i.q,
      }));

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout failed: ' + (data.error || 'Please try again.'));
        setLoadingCheckout(false);
      }
    } catch (err) {
      alert('Network error connecting to Stripe. Please try again.');
      setLoadingCheckout(false);
    }
  };

  const total = cart.reduce((s, i) => s + parseFloat(i.p.price) * i.q, 0).toFixed(2);
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
  const list = cat === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  const policies: Record<string, { t: string; c: string }> = {
    about: {
      t: "About Us",
      c: "Pavilion Venture is an international online store serving customers across the United States, UK, Canada, Australia, and the Middle East with free tracked delivery."
    },
    shipping: {
      t: "Shipping Policy",
      c: "Destinations: US, UK, Canada, Australia, New Zealand, Ireland, UAE, Saudi Arabia, Kuwait, Qatar, Bahrain, Oman.\nProcessing: 1–3 business days.\nDelivery: 6–12 business days via Free Tracked International Shipping."
    },
    refund: {
      t: "Return & Refund Policy",
      c: "30-Day Return Guarantee: Items may be returned within 30 days if unused and in original packaging. Refunds are processed in USD within 3–5 business days."
    },
    privacy: {
      t: "Privacy Policy",
      c: "We collect only the information needed to fulfill your order. All card transactions are securely processed and SSL encrypted via Stripe. We never sell personal data."
    },
    terms: {
      t: "Terms of Service",
      c: "All prices on https://shop.pavilionventure.com are in USD ($). Orders ship with international tracking to supported destinations."
    },
    contact: {
      t: "Contact Us",
      c: "Pavilion Venture Enterprise\nAddress: Block C-10-06, Setia City Residences, Persiaran Setia Dagang, Seksyen U13, 40170 Shah Alam, Selangor, Malaysia\nEmail: support@pavilionventure.com\nTel: +60166787883"
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', color: '#111827', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div style={{ backgroundColor: '#111827', color: '#fff', textAlign: 'center', fontSize: '12px', padding: '8px' }}>
        Free Tracked Worldwide Shipping · All Prices in USD ($)
      </div>

      {checkoutStatus === 'success' && (
        <div style={{ backgroundColor: '#059669', color: '#fff', textAlign: 'center', fontSize: '13px', padding: '10px 16px', fontWeight: 600 }}>
          Payment Successful! Thank you for your order. A confirmation receipt has been sent to your email.
          <button onClick={() => setCheckoutStatus(null)} style={{ marginLeft: '12px', background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {checkoutStatus === 'cancel' && (
        <div style={{ backgroundColor: '#fef3c7', color: '#92400e', textAlign: 'center', fontSize: '13px', padding: '10px 16px', fontWeight: 600 }}>
          Checkout was cancelled. Your items are still saved in your cart.
          <button onClick={() => setCheckoutStatus(null)} style={{ marginLeft: '12px', background: 'none', border: '1px solid #92400e', color: '#92400e', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer' }}>✕</button>
        </div>
      )}

      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div onClick={() => goHome('All')} style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer' }}>PAVILION VENTURE</div>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '14px' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => goHome(c)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: cat === c && !prod && !page ? 700 : 500, color: cat === c ? '#111827' : '#6b7280' }}>
                {c === 'All' ? 'All Products' : c}
              </button>
            ))}
          </nav>
          <button onClick={() => setOpen(true)} style={{ backgroundColor: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <img src={prod.image} alt={prod.name} style={{ width: '100%', maxHeight: '360px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#f3f4f6', padding: '12px', boxSizing: 'border-box' }} />
                {prod.video && (
                  <video
                    src={prod.video}
                    controls
                    muted
                    playsInline
                    onError={(e) => { (e.currentTarget as HTMLVideoElement).style.display = 'none'; }}
                    style={{ width: '100%', maxHeight: '320px', borderRadius: '10px', backgroundColor: '#000' }}
                  />
                )}
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 600 }}>{prod.category} · SKU: {prod.id}</div>
                <h1 style={{ fontSize: '22px', fontWeight: 700, margin: '8px 0 12px 0' }}>{prod.name}</h1>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#dc2626', marginBottom: '12px' }}>
                  ${prod.price} USD <span style={{ fontSize: '15px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${prod.oldPrice}</span>
                </div>
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
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', marginBottom: '10px' }}>
                    ${p.price} USD <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through', fontWeight: 400 }}>${p.oldPrice}</span>
                  </div>
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
          <div style={{ backgroundColor: '#fff', width: '100%', maxWidth: '360px', height: '100%', padding: '20px', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Shopping Cart</h2>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>
              {cart.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
              ) : (
                cart.map((i) => (
                  <div key={i.p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6', gap: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, flex: 1 }}>{i.p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button onClick={() => updateQty(i.p.id, -1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>-</button>
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{i.q}</span>
                      <button onClick={() => updateQty(i.p.id, 1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>+</button>
                    </div>
                    <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 700, minWidth: '58px', textAlign: 'right' }}>
                      ${(parseFloat(i.p.price) * i.q).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>
                  <span>Tracked International Shipping</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '16px', marginBottom: '14px' }}>
                  <span>Total</span>
                  <span>${total} USD</span>
                </div>
                <button
                  onClick={handleStripeCheckout}
                  disabled={loadingCheckout}
                  style={{
                    width: '100%',
                    backgroundColor: loadingCheckout ? '#6b7280' : '#111827',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '13px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: loadingCheckout ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loadingCheckout ? 'Redirecting to Stripe...' : `Secure Checkout ($${total} USD)`}
                </button>
                <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280', marginTop: '8px' }}>
                  Encrypted Card, Apple Pay &amp; Google Pay via Stripe
                </div>
              </div>
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
