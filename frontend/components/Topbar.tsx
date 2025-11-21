"use client";
import Link from 'next/link';
import { FaUserCircle } from 'react-icons/fa';

export function Topbar() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-4 bg-space-indigo-900/95 backdrop-blur border-b border-space-indigo-800 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <button className="flex items-center gap-2 text-white font-bold text-lg">
          Ibitinga
          <svg className="w-4 h-4 text-space-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative text-space-indigo-300 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-space-indigo-900"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 cursor-pointer">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="User"
            className="w-full h-full rounded-full object-cover border-2 border-space-indigo-900"
          />
        </div>
      </div>
    </header>
  );
}
