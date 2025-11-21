"use client";
import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  function login(name: string) {
    const fake = { id: Math.random().toString(36).slice(2), name };
    setUser(fake);
  }
  function logout() { setUser(null); }
  return { user, login, logout };
}
