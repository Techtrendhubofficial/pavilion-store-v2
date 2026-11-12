import React, { useState } from 'react';

const products = [
  { id: 1, name: "Laptop", price: 2999, oldPrice: 3599, img: "💻", desc: "High performance laptop for work and study" },
  { id: 2, name: "Smartphone", price: 1899, oldPrice: 2199, img: "📱", desc: "Latest smartphone with great camera" },
  { id: 3, name: "Headphones", price: 299, oldPrice: 399, img: "🎧", desc: "Wireless noise cancelling headphones" },
  { id: 4, name: "Smart Watch", price: 799, oldPrice: 999, img: "⌚", desc: "Smart watch with health tracking" },
];

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState<number[]>([]);

  const addToCart = (id: number) => {
    setCart([...cart, id]);
    alert("Added to cart!");
  };

  if (page !== 'home') {
    return (
      <div className="min-h-screen bg-white">
        <header className="p-4 border-b flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="font-bold text-xl cursor-pointer" onClick={() => setPage('home')}>Pavilion Venture</h1>
          <button onClick={() => setPage('home')} className="bg-black text-white px-4 py-2 rounded">Back Home</button>
        </header>
        {page === 'about' && (
          <Section title="About Us">
            <p>Pavilion Venture is an online retailer based in Shah Alam, Malaysia. We sell quality electronics and lifestyle products at fair prices.</p>
            <p>We focus on fast delivery, honest pricing and good after-sales service.</p>
          </Section>
        )}
        {page === 'terms' && (
          <Section title="Terms of Service">
            <p>By using this website, you agree to our terms. All prices are in MYR. We reserve the right to update product prices and availability without prior notice.</p>
            <p>Orders are confirmed after payment is received. Delivery time depends on location.</p>
          </Section>
        )}
        {page === 'privacy' && (
          <Section title="Privacy Policy">
            <p>We collect only the information needed to process your order, such as name, address and contact number.</p>
            <p>We do not sell your personal data to third parties. Your information is used only for order delivery and customer support.</p>
          </Section>
        )}
        {page === 'contact' && (
          <Section title="Contact Us">
            <p>Email: pavilionventure@gmail.com</p>
            <p>Location: Shah Alam, Selangor, Malaysia</p>
            <p>We reply within 1-2 working days.</p>
          </Section>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pavilion Venture</h1>
          <div className="flex gap-4 text-sm">
            <button onClick={() => setPage('about')}>About</button>
            <button onClick={() => setPage('terms')}>Terms</button>
            <button onClick={() => setPage('privacy')}>Privacy</button>
            <button onClick={() => setPage('contact')}>Contact</button>
            <span>🛒 Cart ({cart.length})</span>
          </div>
        </div>
      </header>

      <div className="bg-black text-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Quality Products, Fair Prices</h2>
        <p className="text-gray-300">Shop electronics and lifestyle products in Malaysia</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-4 shadow text-center">
            <div className="text-5xl mb-3">{p.img}</div>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-xs text-gray-500 my-2">{p.desc}</p>
            <p className="text-red-600 font-bold">RM {p.price} <span className="text-gray-400 line-through text-sm font-normal">RM {p.oldPrice}</span></p>
            <button onClick={() => addToCart(p.id)} className="mt-3 w-full bg-black text-white py-2 rounded-lg">Add to Cart</button>
          </div>
        ))}
      </div>

      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        <p>© 2026 Pavilion Venture. All rights reserved.</p>
        <p className="mt-2">Email: pavilionventure@gmail.com | Shah Alam, Selangor, Malaysia</p>
        <div className="mt-2 flex justify-center gap-4">
          <button onClick={() => setPage('about')}>About</button>
          <button onClick={() => setPage('terms')}>Terms</button>
          <button onClick={() => setPage('privacy')}>Privacy</button>
          <button onClick={() => setPage('contact')}>Contact</button>
        </div>
      </footer>
    </div>
  );
}
