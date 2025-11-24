'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Tab } from '@headlessui/react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

// --- CONFIG FIREBASE ---
// Initialize Firebase lazily to avoid issues during SSR/build
let auth: any = null;
let provider: GoogleAuthProvider | null = null;

function initializeFirebase() {
  if (auth) return { auth, provider: provider! };
  
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  
  return { auth, provider };
}

// Use environment variable for API URL, with fallback to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LoginTabsPage() {
  const router = useRouter();

  // GOOGLE LOGIN STATES
  const [googleName, setGoogleName] = useState('');
  const [googleBirth, setGoogleBirth] = useState('');
  const [googleError, setGoogleError] = useState('');

  // MANUAL REGISTER STATES
  const [manualData, setManualData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    password: '',
  });
  const [manualError, setManualError] = useState('');

  // ***********************
  // GOOGLE LOGIN HANDLER
  // ***********************
  const handleGoogleLogin = async () => {
    setGoogleError('');

    if (!googleName || !googleBirth) {
      setGoogleError('Preencha nome e data de nascimento antes de continuar.');
      return;
    }

    try {
      const { auth, provider } = initializeFirebase();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await axios.post(`${API_BASE_URL}/users`, {
        name: googleName,
        email: user.email,
        dateOfBirth: googleBirth,
        city: 'Ibitinga',
      });

      router.push('/');
    } catch (err) {
      console.error(err);
      setGoogleError('Erro ao realizar login com Google.');
    }
  };

  // ***********************
  // MANUAL REGISTER HANDLER
  // ***********************
  const handleManualChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManualData({ ...manualData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setManualError('');

    const { name, email, dateOfBirth, password } = manualData;

    if (!name || !email || !dateOfBirth || !password) {
      setManualError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/users`, {
        name,
        email,
        dateOfBirth,
        password,
        city: 'Ibitinga',
      });

      router.push('/');
    } catch (err) {
      console.error(err);
      setManualError('Erro ao cadastrar usuário.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0B0A14] text-white px-6 py-10">
      <div className="w-full max-w-md bg-[#131124] p-6 rounded-xl shadow-xl border border-[#1f1b38]">

        <h1 className="text-center text-xl font-semibold text-gray-300 mb-6">
          Acesse sua conta para começar
        </h1>

        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-[#1C1A2E] p-1 rounded-xl">
            
            {/* TAB ENTRAR */}
            <Tab
              className={({ selected }: { selected: boolean }) =>
                clsx(
                  'w-full py-2 rounded-lg text-sm font-medium transition',
                  selected
                    ? 'bg-[#2D2A45] text-white'
                    : 'text-gray-400 hover:bg-[#242238]'
                )
              }
            >
              Entrar
            </Tab>

            {/* TAB CADASTRAR */}
            <Tab
              className={({ selected }: { selected: boolean }) =>
                clsx(
                  'w-full py-2 rounded-lg text-sm font-medium transition',
                  selected
                    ? 'bg-[#2D2A45] text-white'
                    : 'text-gray-400 hover:bg-[#242238]'
                )
              }
            >
              Cadastrar
            </Tab>
          </Tab.List>

          {/* PAINEL DAS ABAS */}
          <Tab.Panels className="mt-6">

            {/* ****************************
                ABA 1 — LOGIN COM GOOGLE
            **************************** */}
            <Tab.Panel>
              <h2 className="text-lg font-bold mb-4">Login</h2>

              <label className="block mb-3">
                <span className="text-sm">Nome</span>
                <input
                  type="text"
                  className="mt-1 w-full px-3 py-3 text-sm rounded-lg bg-[#0F0D1F] border border-[#292547]"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  placeholder="Seu nome"
                />
              </label>

              <label className="block mb-3">
                <span className="text-sm">Data de Nascimento</span>
                <input
                  type="date"
                  className="mt-1 w-full px-3 py-3 text-sm rounded-lg bg-[#0F0D1F] border border-[#292547]"
                  value={googleBirth}
                  onChange={(e) => setGoogleBirth(e.target.value)}
                />
              </label>

              {googleError && (
                <p className="text-red-400 text-sm mb-3">{googleError}</p>
              )}

              <button
                onClick={handleGoogleLogin}
                className={clsx(
                  'w-full py-3 rounded-lg text-sm font-medium mt-2 transition',
                  googleName && googleBirth
                    ? 'bg-blue-600 hover:bg-blue-500'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                )}
                disabled={!googleName || !googleBirth}
              >
                Entrar com Google
              </button>
            </Tab.Panel>

            {/* ****************************
               ABA 2 — CADASTRO MANUAL
            **************************** */}
            <Tab.Panel>
              <h2 className="text-lg font-bold mb-4">Criar Conta</h2>

              <form onSubmit={handleManualSubmit} className="space-y-4">

                <label className="block">
                  <span className="text-sm">Nome</span>
                  <input
                    name="name"
                    type="text"
                    className="mt-1 w-full px-3 py-3 text-sm rounded-lg bg-[#0F0D1F] border border-[#292547]"
                    value={manualData.name}
                    onChange={handleManualChange}
                  />
                </label>

                <label className="block">
                  <span className="text-sm">E-mail</span>
                  <input
                    name="email"
                    type="email"
                    className="mt-1 w-full px-3 py-3 text-sm rounded-lg bg-[#0F0D1F] border border-[#292547]"
                    value={manualData.email}
                    onChange={handleManualChange}
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Data de Nascimento</span>
                  <input
                    name="dateOfBirth"
                    type="date"
                    className="mt-1 w-full px-3 py-3 text-sm rounded-lg bg-[#0F0D1F] border border-[#292547]"
                    value={manualData.dateOfBirth}
                    onChange={handleManualChange}
                  />
                </label>

                <label className="block">
                  <span className="text-sm">Senha</span>
                  <input
                    name="password"
                    type="password"
                    className="mt-1 w-full px-3 py-3 text-sm rounded-lg bg-[#0F0D1F] border border-[#292547]"
                    value={manualData.password}
                    onChange={handleManualChange}
                  />
                </label>

                {manualError && (
                  <p className="text-red-400 text-sm">{manualError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium mt-3"
                >
                  Cadastrar
                </button>

              </form>
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  );
}
