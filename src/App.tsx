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
    image: "https://cf.cjdropshipping.com/quick/product/003a8c75-de1c-47a9-a976-18fdfaeabe97.jpg",
    desc: "Premium breathable women's halter yoga vest with cross beautiful back design, comfortable sports workout fitness athletic tank top.",
    brand: "Generic"
  },
  {
    id: "PV-US-03",
    category: "Watches",
    name: "POEDAGAR Multifunction Dual Display Luminous Quartz Men's Watch",
    price: "29.90",
    oldPrice: "45.00",
    image: "https://timeelegance.com.bd/cdn/shop/files/web_1_9e67c706-d41a-48de-9432-3685c4792625.jpg",
    desc: "POEDAGAR luxury multifunction analog and digital dual display watch with luminous hands, waterproof stainless steel strap.",
    brand: "POEDAGAR"
  },
  {
    id: "PV-US-04",
    category: "Electronics",
    name: "3 Batteries Pro Drone 4K Selfie Camera Wifi Fpv Foldable Rc Quadcopter",
    price: "165.55",
    oldPrice: "219.00",
    image: "https://cf.cjdropshipping.com/38719179-6fbd-4822-8b8c-cf3aad912581.jpg",
    desc: "Professional 4K dual camera foldable aerial drone with 3 high-capacity batteries, real-time WiFi FPV transmission and obstacle avoidance.",
    brand: "Generic"
  },
  {
    id: "PV-US-05",
    category: "Fashion",
    name: "Women's French-Style Asymmetrical One-Shoulder Vacation Casual Dress",
    price: "16.49",
    oldPrice: "24.50",
    image: "https://cf.cjdropshipping.com/quick/product/2be89b01-404d-4276-9058-f1ad1e9c54d5.jpg",
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

  // 支持独立单品URL参数 ?product=PV-US-02，确保GMC爬虫抓到精确单品页
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
      {/* 顶部通知栏 */}
      <div style={{ backgroundColor: '#111827', color: '#ffffff', textAlign: 'center', fontSize: '12px', padding: '8px 16px', letterSpacing: '0.3px' }}>
        Free Tracked Shipping to the United States &amp; Middle East · Prices in USD ($)
      </div>

      {/* 顶部导航栏 */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: '1150px', margin: '0 auto', padding: '14px 20px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div onClick={() => goHome('All')} style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer', letterSpacing: '-0.5px' }}>
            PAVILION VENTURE
          </div>

          {/* 分类导航 */}
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
                }}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </nav>

          {/* 购物车按钮 */}
          <button
            onClick={() => { setCartOpen(true); setOrderSubmitted(false); }}
            style={{ backgroundColor: '#111827', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
          >
            Cart ({totalItems}) · ${totalAmount}
          </button>
        </div>
      </header>

      {/* 轻提示 Toast */}
      {toast && (
