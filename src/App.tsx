import React, { useState } from 'react';

// 你的 5 个真实商品（已换成真实图片）
const products = [
  { id: 1, name: "Hotel Camera Detector", price: 135, oldPrice: 180, img: "https://oss-cf.cjdropshipping.com/product/2024/12/04/08/df70d3f5-5e5e-434f-ba9d-8229f04d2925_trans.jpeg", desc: "RF signal detector for hotel privacy" },
  { id: 2, name: "Yoga Vest Halter Top", price: 88, oldPrice: 120, img: "https://cf.cjdropshipping.com/quick/product/003a8c75-de1c-47a9-a976-18fdfaeabe97.jpg", desc: "Breathable cross-back fitness tank" },
  { id: 3, name: "POEDAGAR Dual Watch", price: 129, oldPrice: 199, img: "https://timeelegance.com.bd/cdn/shop/files/web_1_9e67c706-d41a-48de-9432-3685c4792625.jpg", desc: "Analog+digital luminous watch" },
  { id: 4, name: "4K Foldable Drone", price: 745, oldPrice: 999, img: "https://cf.cjdropshipping.com/38719179-6fbd-4822-8b8c-cf3aad912581.jpg", desc: "Pro drone with 3 batteries" },
  { id: 5, name: "French One-Shoulder Dress", price: 74, oldPrice: 110, img: "https://cf.cjdropshipping.com/quick/product/2be89b01-404d-4276-9058-f1ad1e9c54d5.jpg", desc: "Asymmetrical vacation dress" },
];

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState<number[]>([]);
  const addToCart = (id: number) => { setCart([...cart, id]); alert("Added to cart!"); };
  const go = (p: string) => setPage(p);

  // 包含 GMC 审核必需的所有政策
  const info: any = {
    about: ["About Us", "Pavilion Venture is an online retailer based in Shah Alam, Malaysia. We sell quality electronics and lifestyle products at fair prices."],
    terms: ["Terms of Service", "By using this website, you agree to our terms. All prices are in MYR. Orders are confirmed after payment is received."],
    privacy: ["Privacy Policy", "We collect only the information needed to process your order. We do not sell your personal data to third parties."],
    contact: ["Contact Us", "Email: pavilionventure@gmail.com. Location: Shah Alam, Selangor, Malaysia. We reply within 1-2 working days."],
    shipping: ["Shipping & Returns", "Domestic (Malaysia): 1-3 working days. Free shipping over RM 100. International: 7-15 working days. Returns accepted within 7 days if unused."],
    refund: ["Refund Policy", "We offer a 30-day refund guarantee. If your item is defective, we will issue a full refund. Refunds processed within 3-5 working days."],
  };

  if (page !== 'home') {
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="p-4 border-b text-center">
          <h1 className="font-bold text-xl text-black" onClick={() => go('home')}>Pavilion Venture</h1>
          <button onClick={() => go('home')} className="mt-2 bg-black text-white px-4 py-2 rounded">Back Home</button>
        </header>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-black">{info[page][0]}</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{info[page][1]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center gap-2">
          <h1 className="text-xl font-bold text-black whitespace-nowrap">Pavilion Venture</h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-black">
            <button onClick={() => go('about')}>About</button>
            <button onClick={() => go('terms')}>Terms</button>
            <button onClick={() => go('privacy')}>Privacy</button>
            <button onClick={() => go('contact')}>Contact</button>
            <button onClick={() => go('shipping')}>Shipping</button>
            <button onClick={() => go('refund')}>Refund</button>
            <span className="whitespace-nowrap">🛒 Cart ({cart.length})</span>
          </div>
        </div>
      </header>

      <div className="bg-black text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold text-white">Quality Products, Fair Prices</h2>
        <p className="text-gray-300 mt-2">Shop electronics and lifestyle products in Malaysia</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow text-center">
            <img src={p.img} alt={p.name} className="w-full h-32 object-cover rounded mb-3" />
            <h3 className="font-bold text-black text-sm">{p.name}</h3>
            <p className="text-xs text-gray-500 my-2">{p.desc}</p>
            <p className="text-red-600 font-bold">RM {p.price}</p>
            <p className="text-gray-400 line-through text-sm">RM {p.oldPrice}</p>
            <button onClick={() => addToCart(p.id)} className="mt-3 w-full bg-black text-white py-2 rounded-lg">Add to Cart</button>
          </div>
        ))}
      </div>

      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        <p>© 2026 Pavilion Venture. All rights reserved.</p>
        <p className="mt-2">Email: pavilionventure@gmail.com | Shah Alam, Selangor, Malaysia</p>
      </footer>
    </div>
  );
}
