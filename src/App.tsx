import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  category: string;
  name: string;
  price: string;
  oldPrice: string;
  image: string;
  desc: string;
  brand: string;
}

const PRODUCTS: Product[] = [
  {
    id: "PV-US-02",
    category: "Fashion",
    name: "Women's Yoga Vest Halter Beautiful Back Tank-top",
    price: "19.56",
    oldPrice: "26.90",
    image: "https://cjdropshipping.com",
    desc: "Premium breathable women's halter yoga vest with cross beautiful back design, comfortable sports workout fitness athletic tank top.",
    brand: "Generic"
  },
  {
    id: "PV-US-03",
    category: "Watches",
    name: "POEDAGAR Multifunction Dual Display Luminous Quartz Men's Watch",
    price: "29.90",
    oldPrice: "45.00",
    image: "https://timeelegance.com.bd",
    desc: "POEDAGAR luxury multifunction analog and digital dual display watch with luminous hands, waterproof stainless steel strap.",
    brand: "POEDAGAR"
  },
  {
    id: "PV-US-04",
    category: "Electronics",
    name: "3 Batteries Pro Drone 4K Selfie Camera Wifi Fpv Foldable Rc Quadcopter",
    price: "165.55",
    oldPrice: "219.00",
    image: "https://cjdropshipping.com",
    desc: "Professional 4K dual camera foldable aerial drone with 3 high-capacity batteries, real-time WiFi FPV transmission and obstacle avoidance.",
    brand: "Generic"
  },
  {
    id: "PV-US-05",
    category: "Fashion",
    name: "Women's French-Style Asymmetrical One-Shoulder Vacation Casual Dress",
    price: "16.49",
    oldPrice: "24.50",
    image: "https://cjdropshipping.com",
    desc: "Chic French-inspired irregular one-shoulder solid color A-line dress with flattering drape. Ideal for vacations and parties.",
    brand: "Generic"
  }
];

const ALLOWED_COUNTRIES = [
  "United States",
  "United Arab Emirates",
  "Saudi Arabia",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman"
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [policyPage, setPolicyPage] = useState<string | null>(null);
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const [country, setCountry] = useState<string>('United States');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get('product');
    if (prodId) {
      const found = PRODUCTS.find((p) => p.id === prodId);
      if (found) setSelectedProduct(found);
    }
  }, []);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setPolicyPage(null);
    const url = new URL(window.location.href);
    url.searchParams.set('product', product.id);
    window.history.pushState({}, '', url.toString());
    window.scrollTo(0, 0);
  };

  const goHome = (cat = 'All') => {
    setSelectedProduct(null);
    setPolicyPage(null);
    setSelectedCategory(cat);
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
    window.scrollTo(0, 0);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.product.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart
    .reduce((sum, item) => sum + parseFloat(item.product.price) * item.qty, 0)
    .toFixed(2);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !shippingAddress) {
      showToast("Please fill in your email and shipping address.");
      return;
    }
    setOrderSubmitted(true);
    setCart([]);
  };

  const policies: Record<string, { title: string; content: string }> = {
    about: {
      title: "About Pavilion Venture",
      content:
        "Pavilion Venture is an international online store specializing in quality consumer electronics, timepieces, and contemporary fashion. We serve customers exclusively across the United States and selected Middle East countries with tracked international shipping and dedicated customer support."
    },
    shipping: {
      title: "Shipping Policy (US & Middle East Only)",
      content:
        "• Eligible Destinations: We ship exclusively to the United States, United Arab Emirates, Saudi Arabia, Kuwait, Qatar, Bahrain, and Oman.\n• Processing Time: Orders are processed within 1–3 business days.\n• Delivery Time: Standard tracked delivery takes 6–12 business days to the US and Middle East.\n• Shipping Cost: Free Standard Tracked Shipping on all orders."
    },
    refund: {
      title: "Return & Refund Policy",
      content:
        "• 30-Day Return Guarantee: You may request a return within 30 days of receiving your item.\n• Eligibility: Items must be unused, in original condition and packaging.\n• Refund Processing: Once your return is received and inspected, refunds are issued back to your original payment method in USD within 3–5 business days."
    },
    privacy: {
      title: "Privacy Policy",
      content:
        "We respect your privacy and collect only the information necessary to process and ship your order (name, shipping address, and email). All checkout data is protected with SSL encryption. We never sell or rent customer information to third parties."
    },
    terms: {
      title: "Terms of Service",
      content:
        "All prices listed on shop.pavilionventure.com are in United States Dollars (USD). By placing an order, you confirm that your shipping address is within our supported regions (United States or eligible Middle East countries)."
    },
    contact: {
      title: "Contact Us",
      content:
        "Need help with your order or product details? Reach out to our support team:\n• Email: support@pavilionventure.com\n• Operating Hours: Monday – Friday, 9:00 AM – 6:00 PM (GMT+8)\n• Response Time: Within 24 business hours."
    }
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#111827', backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0 }}>
      <div style={{ backgroundColor: '#111827', color: '#ffffff', textAlign: 'center', fontSize: '12px', padding: '8px 16px', letterSpacing: '0.3px' }}>
        Free Tracked Shipping to the United States &amp; Middle East · Prices in USD ($)
      </div>

      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div onClick={() => goHome('All')} style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.5px' }}>
            PAVILION VENTURE
          </div>

          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', fontSize: '14px', fontWeight: 500 }}>
            {['All', 'Electronics', 'Watches', 'Fashion'].map((cat) => (
              <button
                key={cat}
                onClick={() => goHome(cat)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 2px',
                  fontWeight: selectedCategory === cat && !selectedProduct && !policyPage ? 700 : 500,
                  color: selectedCategory === cat && !selectedProduct && !policyPage ? '#111827' : '#6b7280',
                  borderBottom: selectedCategory === cat && !selectedProduct && !policyPage ? '2px solid #111827' : '2px solid transparent'
                }}^
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </nav>

          <button
            onClick={() => { setCartOpen(true); setOrderSubmitted(false); }}
            style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Cart ({totalItems}) · ${totalAmount}
          </button>
        </div>
      </header>
      {toast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', backgroundColor: '#111827', color: '#fff', padding: '12px 18px', borderRadius: '8px', fontSize: '13px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)', zIndex: 60 }}>
          {toast}
        </div>
      )}

      <main style={{ flex: 1, maxWidth: '1150px', width: '100%', margin: '0 auto', padding: '28px 20px', boxSizing: 'border-box' }}>
        {policyPage && policies[policyPage] ? (
          <div style={{ backgroundColor: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #e5e7eb', maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => goHome('All')} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: '14px', marginBottom: '16px', padding: 0 }}>
              ← Back to Store
            </button>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>{policies[policyPage].title}</h1>
            <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#374151', whiteSpace: 'pre-line' }}>
              {policies[policyPage].content}
            </p>
          </div>
        ) : selectedProduct ? (
          <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <button onClick={() => goHome('All')} style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', fontSize: '14px', marginBottom: '20px', padding: 0 }}>
              ← Back to Products
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', borderRadius: '10px', backgroundColor: '#f3f4f6', padding: '12px', boxSizing: 'border-box' }}
              />
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                  {selectedProduct.category} · SKU: {selectedProduct.id}
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1.3, margin: '0 0 14px 0' }}>{selectedProduct.name}</h1>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 800, color: '#dc2626' }}>${selectedProduct.price} USD</span>
                  <span style={{ fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through' }}>${selectedProduct.oldPrice} USD</span>
                </div>
                <div style={{ display: 'inline-block', backgroundColor: '#ecfdf5', color: '#065f46', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', marginBottom: '18px' }}>
                  ✓ In Stock · Free Tracked Shipping to US &amp; Middle East
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#4b5563', marginBottom: '24px' }}>{selectedProduct.desc}</p>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  style={{ width: '100%', maxWidth: '320px', backgroundColor: '#111827', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '14px 20px', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Add to Cart — ${selectedProduct.price} USD
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div style={{ backgroundColor: '#111827', color: '#ffffff', borderRadius: '14px', padding: '36px 24px', textAlign: 'center', marginBottom: '28px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 8px 0' }}>Curated Tech, Watches &amp; Lifestyle</h1>
              <p style={{ fontSize: '14px', color: '#d1d5db', margin: 0 }}>
                Exclusively Serving the United States &amp; Middle East · 30-Day Returns · Tracked Delivery
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <img
                      src={p.image}
                      alt={p.name}
                      onClick={() => openProduct(p)}
                      style={{ width: '100%', height: '210px', objectFit: 'contain', backgroundColor: '#f9fafb', borderRadius: '8px', marginBottom: '12px', cursor: 'pointer' }}
                    />
                    <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600, marginBottom: '4px' }}>{p.category}</div>
                    <h3
                      onClick={() => openProduct(p)}
                      style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 8px 0', lineHeight: 1.4, cursor: 'pointer' }}
                    >
                      {p.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, margin: '0 0 14px 0' }}>{p.desc}</p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626' }}>${p.price} USD</span>
                      <span style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through' }}>${p.oldPrice}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => addToCart(p)}
                        style={{ flex: 1, backgroundColor: '#111827', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => openProduct(p)}
                        style={{ backgroundColor: '#f3f4f6', color: '#111827', border: '1px solid #d1d5db', borderRadius: '8px', padding: '10px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '400px', height: '100%', padding: '24px', boxSizing: 'border-box', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '14px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>Shopping Cart ({totalItems})</h2>
                <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
              </div>

              {orderSubmitted ? (
                <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', padding: '20px', borderRadius: '10px', color: '#065f46' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Order Request Received!</h3>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>
                    Thank you! An invoice and secure USD payment link have been sent to <strong>{customerEmail}</strong> for delivery to <strong>{country}</strong>.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <p style={{ color: '#6b7280', fontSize: '14px', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.product.name}</div>
                        <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: 700 }}>${item.product.price} USD</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button onClick={() => updateQty(item.product.id, -1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>-</button>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.product.id, 1)} style={{ width: '24px', height: '24px', border: '1px solid #d1d5db', borderRadius: '4px', background: '#fff', cursor: 'pointer' }}>+</button>
                      </div>
                    </div>
                  ))}
