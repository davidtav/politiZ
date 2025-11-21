"use client";
import Link from 'next/link';
import { FaHome, FaSearch, FaPlus, FaTrophy, FaUser } from 'react-icons/fa';

const items = [
  { href: '/feed', icon: <FaHome />, label: 'Início' },
  { href: '/explorar', icon: <FaSearch />, label: 'Explorar' },
  { href: '/novo', icon: <FaPlus />, label: 'Novo', isFab: true },
  { href: '/ranking', icon: <FaTrophy />, label: 'Ranking' },
  { href: '/perfil', icon: <FaUser />, label: 'Perfil' }
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-space-indigo-900/95 backdrop-blur border-t border-space-indigo-800 flex justify-around items-end pb-4 pt-2 md:hidden z-40 px-2">
      {items.map((i, idx) => {
        if (i.isFab) {
          return (
            <Link key={i.href} href={i.href} className="relative -top-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/40 border-4 border-space-indigo-900 transform hover:scale-105 transition">
                <span className="text-xl">{i.icon}</span>
              </div>
            </Link>
          );
        }
        return (
          <Link key={i.href} href={i.href} className="flex flex-col items-center gap-1 min-w-[60px] group">
            <span className={`text-xl ${idx === 0 ? 'text-blue-500' : 'text-space-indigo-400 group-hover:text-white'} transition`}>
              {i.icon}
            </span>
            <span className={`text-[10px] font-medium ${idx === 0 ? 'text-blue-500' : 'text-space-indigo-400 group-hover:text-white'} transition`}>
              {i.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
