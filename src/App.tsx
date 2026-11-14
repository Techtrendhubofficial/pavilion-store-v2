import React, { useState } from 'react';

const products = [
  { id: 1, name: "Hotel Camera Detection Wireless Signal Detector", price: "135.00", oldPrice: "180.00", image: "https://oss-cf.cjdropshipping.com/product/2024/12/04/08/df70d3f5-5e5e-434f-ba9d-8229f04d2925_trans.jpeg", desc: "High precision RF signal detector for hotel privacy protection." },
  { id: 2, name: "Women's Yoga Vest Halter Tank-top", price: "88.00", oldPrice: "120.00", image: "https://cf.cjdropshipping.com/quick/product/003a8c75-de1c-47a9-a976-18fdfaeabe97.jpg", desc: "Premium breathable halter yoga vest with cross back design." },
  { id: 3, name: "POEDAGAR Dual Display Luminous Watch", price: "129.00", oldPrice: "199.00", image: "https://timeelegance.com.bd/cdn/shop/files/web_1_9e67c706-d41a-48de-9432-3685c4792625.jpg", desc: "Luxury analog+digital dual display, waterproof stainless strap." },
  { id: 4, name: "4K Foldable RC Drone with 3 Batteries", price: "745.00", oldPrice: "999.00", image: "https://cf.cjdropshipping.com/38719179-6fbd-4822-8b8c-cf3aad912581.jpg", desc: "Pro dual camera drone with WiFi FPV and obstacle avoidance." },
  { id: 5, name: "French-Style One-Shoulder Vacation Dress", price: "74.00", oldPrice: "110.00", image: "https://cf.cjdropshipping.com/quick/product/2be89b01-404d-4276-9058-f1ad1e9c54d5.jpg", desc: "Chic asymmetrical A-line dress for parties and streetwear." },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState<number[]>([]);
  
  const addToCart = (id: number) => { 
    setCart([...cart, id]); 
    alert("Added to cart!"); 
  };
  
  const go = (p: string) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const info: any = {
    about: ["About Us", "Pavilion Venture is an authorized online retailer based in Shah Alam, Malaysia, specializing in tech gadgets, fashion apparel, watches, and lifestyle accessories. We partner with verified suppliers to deliver quality products worldwide with full tracking."],
    terms: ["Terms of Service", "By using this website, you agree to our terms. All prices are in MYR. Orders are confirmed after payment is received. We reserve the right to update product prices and availability without prior notice."],
    privacy: ["Privacy Policy", "We collect only the data necessary to fulfill your order. We never sell or share your personal data with third parties. All transactions are encrypted via SSL. Payment details are processed securely."],
    contact: ["Contact Us", "Email: support@pavilionventure.com\nLocation: Shah Alam, Selangor, Malaysia\nBusiness Hours: Mon-Fri, 9:00 AM - 6:00 PM (MYT)\nWe guarantee a reply within 1-2 working days."],
    shipping: ["Shipping & Returns", "Domestic (Malaysia): 1-3 business days via J&T / Pos Laju. Free shipping on orders over RM 100.\nInternational: 7-15 business days via tracked courier.\nReturns: Items may be returned within 7 days of delivery if unused, in original packaging."],
    refund: ["Refund Policy", "We offer a 30-day refund guarantee. If your item is defective or wrong, we will issue a full refund or free replacement. Refunds are processed within 3-5 business days after we receive the returned item."],
  };

  if (page !== 'home') {
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        <header className="p-4 border-b text-center bg-white sticky top-0 z-50">
          <h1 className="font-bold text-xl text-black cursor-pointer" onClick={() => go('home')}>Pavilion Venture</h1>
          <button onClick={() => go('home')} className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Back Home</button>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-black mb-4">{info[page][0]}</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{info[page][1]}</p>
        </div>
        <footer className="bg-gray-50 border-t py-8 text-center text-sm text-gray-500">
          <p>© 2026 Pavilion Venture. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans flex flex-col">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold text-black whitespace-nowrap">Pavilion Venture</h1>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-700">
            <button onClick={() => go('about')} className="hover:text-black">About</button>
            <button onClick={() => go('terms')} className="hover:text-black">Terms</button>
            <button onClick={() => go('privacy')} className="hover:text-black">Privacy</button>
            <button onClick={() => go('contact')} className="hover:text-black">Contact</button>
            <button onClick={() => go('shipping')} className="hover:text-black">Shipping</button>
            <button onClick={() => go('refund')} className="hover:text-black">Refund</button>
            <span className="text-black font-bold whitespace-nowrap">🛒 Cart ({cart.length})</span>
          </div>
        </div>
      </header>

      <div className="bg-black text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-2">Trusted Tech & Lifestyle Store</h2>
        <p className="text-gray-300">Secure checkout · 7-day returns · Tracked worldwide delivery</p>
      </div>

      <main className="flex-1 max-w-6xl mx-auto p-4 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-4 shadow hover:shadow-md transition flex flex-col">
              <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="font-bold text-black text-sm mb-1 line-clamp-2">{p.name}</h3>
              <p className="text-gray-500 text-xs mb-3 flex-1">{p.desc}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-red-600 font-bold text-lg">RM {p.price}</p>
                <p className="text-gray-400 line-through text-sm">RM {p.oldPrice}</p>
              </div>
              <button onClick={() => addToCart(p.id)} className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t py-10 text-center text-sm text-gray-500">
        <p className="font-medium text-black mb-2">© 2026 Pavilion Venture. All rights reserved.</p>
        <p className="mb-4">Email: support@pavilionventure.com | Shah Alam, Selangor, Malaysia</p>
      </footer>
    </div>
  );
}
