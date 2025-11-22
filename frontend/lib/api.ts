import axios from 'axios';

// Fallback explicit para porta 3001 onde backend Nest está rodando
const DEFAULT_API = 'http://localhost:3001';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API
});

export async function fetchFeed() {
  const res = await api.get('/posts/feed');
  return res.data;
}
