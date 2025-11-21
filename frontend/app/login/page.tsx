"use client";
import { Topbar } from '../../components/Topbar';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm bg-space-indigo-800/60 p-6 rounded-xl border border-space-indigo-700">
          <h2 className="text-lg font-semibold mb-4">Entrar</h2>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" className="w-full mb-3 px-3 py-2 rounded-lg bg-space-indigo-900 border border-space-indigo-700 text-sm outline-none focus:border-lavender-purple-500" />
          <button
            onClick={()=> { login(name || 'Visitante'); router.push('/'); }}
            className="w-full py-2 rounded-lg bg-azure-blue-600 hover:bg-azure-blue-500 text-sm font-medium"
          >Continuar</button>
        </div>
      </div>
    </main>
  );
}
