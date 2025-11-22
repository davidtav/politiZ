'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation'; 
import axios from 'axios';;
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';


// --- DEFINIÇÕES DE TIPOS ---
interface UserAuth extends User {
    displayName: string | null;
    email: string | null;
}

interface RegistrationData {
    name: string;
    email: string;
    dateOfBirth: string;
    city: string;
    password?: string;
}

// --- CONFIGURAÇÃO DE AMBIENTE E VARIÁVEIS GLOBAIS ---
const API_BASE_URL: string = 'http://localhost:3001';

// Definindo a variável global para o TypeScript
declare const __firebase_config: string;

// Inicialização segura do Firebase
// Carregando as chaves do .env.local do Next.js
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID as string,
};

// DEBUG: Log para verificar se a chave está sendo lida do .env.local
console.log(`[Firebase Debug] API Key sendo usada: ${firebaseConfig.apiKey}`);
// --- FIM DEBUG ---


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- 1. HOOK DE AUTENTICAÇÃO ---
const useAuthFlow = () => {
  const [currentUser, setCurrentUser] = useState<UserAuth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Faz o casting do tipo para UserAuth
      setCurrentUser(user as UserAuth | null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Login do Google bem-sucedido!', result.user);
    } catch (err: any) {
      console.error('Erro no login do Google:', err);
      setError('Falha ao autenticar com o Google. Tente novamente.');
      setLoading(false);
    }
  }, []);

  return { currentUser, loading, error, signInWithGoogle };
};

// --- 2. COMPONENTE Topbar SIMULADO ---
const Topbar: React.FC = () => (
  <header className="w-full p-4 border-b border-space-indigo-700 bg-space-indigo-900/50">
    <div className="max-w-7xl mx-auto text-xl font-bold text-lavender-purple-300">
      politiZ
    </div>
  </header>
);

// --- 3. COMPONENTE FORMULÁRIO DE REGISTRO ---
interface RegistrationFormProps {
    user: UserAuth;
    onRegistrationSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ user, onRegistrationSuccess }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    name: user.displayName || '',
    email: user.email || '',
    dateOfBirth: '',
    city: 'Ibitinga', // Cidade Fixa
    password: '', 
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    // Validação básica
    if (!formData.name || !formData.email || !formData.dateOfBirth) {
      setSubmitError('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

    const userData: RegistrationData = {
      name: formData.name,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      city: formData.city,
      ...(formData.password && { password: formData.password }),
    };

    try {
      // Envia os dados para o endpoint POST /users
      await axios.post(`${API_BASE_URL}/users`, userData);
      
      console.log('Registro de usuário no Backend bem-sucedido.');
      onRegistrationSuccess();

    } catch (err: any) {
      console.error('Erro ao registrar usuário no backend:', err.response?.data || err.message);
      setSubmitError(err.response?.data?.message || 'Falha ao registrar usuário. Verifique o console do backend.');
    } finally {
      setLoading(false);
    }
  };
  
  const today = new Date();
  const maxDate = new Date(today.setFullYear(today.getFullYear() - 13)).toISOString().split('T')[0];

  return (
    <div className="w-full max-w-lg bg-space-indigo-800/60 p-8 rounded-xl border border-space-indigo-700 shadow-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-lavender-purple-300">
        Finalizar Registro
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        Precisamos de mais alguns dados para ativar sua conta no politiZ.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-space-indigo-900 border border-space-indigo-700 text-sm outline-none focus:border-azure-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 rounded-lg bg-space-indigo-900 border border-space-indigo-700 text-sm outline-none cursor-not-allowed text-gray-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Data de Nascimento</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            max={maxDate}
            className="w-full px-4 py-2 rounded-lg bg-space-indigo-900 border border-space-indigo-700 text-sm outline-none focus:border-azure-blue-500 appearance-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Cidade</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            readOnly
            className="w-full px-4 py-2 rounded-lg bg-space-indigo-900 border border-space-indigo-700 text-sm outline-none cursor-not-allowed text-gray-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Senha (Opcional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Deixe em branco se não quiser adicionar senha"
            className="w-full px-4 py-2 rounded-lg bg-space-indigo-900 border border-space-indigo-700 text-sm outline-none focus:border-azure-blue-500"
          />
        </div>

        {submitError && (
          <p className="text-sm text-red-400 mt-3">{submitError}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 mt-4 rounded-lg bg-azure-blue-600 hover:bg-azure-blue-500 text-sm font-medium transition duration-200 disabled:bg-gray-600 disabled:text-gray-400"
        >
          {loading ? 'Registrando...' : 'Concluir Registro'}
        </button>
      </form>
    </div>
  );
};


// --- 4. COMPONENTE PRINCIPAL (LoginPage) ---
const GoogleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-5 w-5">
      <path d="M12.0001 4.582c2.016 0 3.737.697 4.976 1.834l3.14-3.14C17.756 1.34 14.908 0 12.0001 0c-4.945 0-9.227 2.92-11.237 7.152l3.82 2.964c.945-3.056 3.82-5.187 7.417-5.534z" fill="#EA4335" />
      <path d="M23.6391 12.28c0-.776-.07-1.536-.21-2.272H12.0001V14.63h6.582c-.328 1.76-1.34 3.237-2.827 4.24l3.053 2.373c1.78-1.637 2.87-3.924 2.87-6.813z" fill="#4285F4" />
      <path d="M3.82 14.004c-.212-.66-.33-1.354-.33-2.074s.118-1.414.33-2.074L.0001 6.992C.674 8.358 1.13 9.948 1.13 12.074c0 2.126-.456 3.716-1.13 5.082l3.82-2.964z" fill="#FBBC05" />
      <path d="M12.0001 24c3.275 0 6.046-1.08 8.06-2.92l-3.054-2.373c-1.12 1.05-2.585 1.68-4.996 1.68-3.597 0-6.472-2.125-7.417-5.534l-3.82 2.964C2.773 21.08 7.055 24 12.0001 24z" fill="#34A853" />
    </svg>
);

export default function LoginPage() {
  const router = useRouter();
   const { currentUser, loading, error, signInWithGoogle } = useAuthFlow();
  const handleRegistrationSuccess = useCallback(() => {
    console.log("SUCCESS: User registered. Redirecionando...");

    // Redirecionamento para home
    router.push('/');  // ✅ localhost:3000/
  }, [router]);
 

  const renderContent = useMemo(() => {
    if (loading) {
      return <p className="text-lavender-purple-400">Carregando...</p>;
    }
    
    // 1. Usuário logado pelo Google -> Exibe o Formulário de Registro
    if (currentUser) {
      return <RegistrationForm user={currentUser} onRegistrationSuccess={handleRegistrationSuccess} />;
    }

    // 2. Tela de Login (Botão Google)
    return (
      <div className="w-full max-w-sm bg-space-indigo-800/60 p-6 rounded-xl border border-space-indigo-700 shadow-xl text-center">
        <h2 className="text-2xl font-semibold mb-6 text-lavender-purple-300">
          Entrar no politiZ
        </h2>
        
        {error && (
          <p className="text-sm text-red-400 mb-4">{error}</p>
        )}

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-medium transition duration-200 disabled:opacity-50"
        >
          <GoogleIcon />
          Entrar com o Google
        </button>
        
        <p className="text-xs text-gray-500 mt-4">
            Usaremos seu login do Google para criar e gerenciar sua conta.
        </p>

      </div>
    );
  }, [loading, currentUser, error, signInWithGoogle, handleRegistrationSuccess]);


  return (
    <main className="min-h-screen flex flex-col bg-[#100D25] text-white font-sans">
      <Topbar />
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {renderContent}
      </div>
    </main>
  );
}