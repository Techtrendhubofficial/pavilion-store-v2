import React, { useState } from 'react';
const products = [
  { id: 1, name: "Laptop", price: 2999, oldPrice: 3599, img: "💻", desc: "High performance laptop for work and study" },
  { id: 2, name: "Smartphone", price: 1899, oldPrice: 2199, img: "📱", desc: "Latest smartphone with great camera" },
  { id: 3, name: "Headphones", price: 299, oldPrice: 399, img: "🎧", desc: "Wireless noise cancelling headphones" },
  { id: 4, name: "Smart Watch", price: 799, oldPrice: 999, img: "⌚", desc: "Smart watch with health tracking" },
];
export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState<number[]>([]);
  const addToCart = (id: number) => { setCart([...cart, id]); alert("Added to cart!"); };
  const go = (p: string) => setPage(p);
  const info: any = {
    about: ["About Us", "Pavilion Venture is an online retailer based in Shah Alam, Malaysia. We sell quality electronics and lifestyle products at fair prices. We focus on fast delivery, honest pricing and good after-sales service."],
    terms: ["Terms of Service", "By using this website, you agree to our terms. All prices are in MYR. We reserve the right to update product prices and availability without prior notice. Orders are confirmed after payment is received."],
    privacy: ["Privacy Policy", "We collect only the information needed to process your order, such as name, address and contact number. We do not sell your personal data to third parties."],
    contact: ["Contact Us", "Email: pavilionventure@gmail.com. Location: Shah Alam, Selangor, Malaysia. We reply within 1-2 working days."],
  };
  if (page !== 'home') {
    return (
      <div className="min-h-screen bg-white text-black">
        <header className="p-4 border-b text-center"><h1 className="font-bold text-xl text-black" onClick={() => go('home')}>Pavilion Venture</h1><button onClick={() => go('home')} className="mt-2 bg-black text-white px-4 py-2 rounded">Back Home</button></header>
        <div className="max-w-4xl mx-auto px-4 py-10"><h2 className="text-2xl font-bold text-black">{info[page][0]}</h2><p className="mt-4 text-gray-700 leading-relaxed">{info[page][1]}</p></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-white shadow sticky top-0 z-10"><div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center gap-2"><h1 className="text-xl font-bold text-black whitespace-nowrap">Pavilion Venture</h1><div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-black"><button onClick={() => go('about')}>About</button><button onClick={() => go('terms')}>Terms</button><button onClick={() => go('privacy')}>Privacy</button><button onClick={() => go('contact')}>Contact</button><span className="whitespace-nowrap">🛒 Cart ({cart.length})</span></div></div></header>
      <div className="bg-black text-white text-center py-16 px-4"><h2 className="text-4xl font-bold text-white">Quality Products, Fair Prices</h2><p className="text-gray-300 mt-2">Shop electronics and lifestyle products in Malaysia</p></div>
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">{products.map((p) => (
        <div key={p.id} className="bg-white rounded-xl p-4 shadow text-center"><div className="text-5xl mb-3">{p.img}</div><h3 className="font-bold text-black">{p.name}</h3><p className="text-xs text-gray-500 my-2">{p.desc}</p><p className="text-red-600 font-bold">RM {p.price}</p><p className="text-gray-400 line-through text-sm">RM {p.oldPrice}</p><button onClick={() => addToCart(p.id)} className="mt-3 w-full bg-black text-white py-2 rounded-lg">Add to Cart</button></div>
      ))}</div>
      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500"><p>© 2026 Pavilion Venture. All rights reserved.</p><p className="mt-2">Email: pavilionventure@gmail.com | Shah Alam, Selangor, Malaysia</p><div className="mt-2 flex flex-wrap justify-center gap-4"><button onClick={() => go('about')}>About</button><button onClick={() => go('terms')}>Terms</button><button onClick={() => go('privacy')}>Privacy</button><button onClick={() => go('contact')}>Contact</button></div></footer>
    </div>
  );
}
