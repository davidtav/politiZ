import axios from 'axios';
import { Post } from '../types';
import { FaQuestion, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

// Fallback explicit para porta 3001 onde backend Nest está rodando
const DEFAULT_API = 'http://localhost:3001';
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || DEFAULT_API
});

export async function fetchFeed() {

  //return fetchMockFeed();
  const res = await api.get('/posts/feed');
  return res.data;
}

export async function fetchMockFeed() {
  return MOCK_FEED;
}

const MOCK_FEED: Post[] = [
  {
    id: '1',
    channelId: 'ia-cidada',
    channel: { name: 'IA Cidadã' },
    content: 'Projeto de Lei 045/2024 propõe aumentar a frota de ônibus escolares em 30% e criar novas rotas para bairros periféricos.',
    title: 'Nova proposta de lei sobre transporte escolar',
    likes: [{ id: 'l1', userId: 'u1', postId: '1' }, { id: 'l2', userId: 'u2', postId: '1' }, { id: 'l3', userId: 'u3', postId: '1' }],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    channelId: 'educacao',
    channel: { name: 'Secretaria de Educação' },
    content: 'As matrículas para o ano letivo de 2025 estarão abertas a partir da próxima segunda-feira em todas as escolas municipais. Garanta a vaga do seu filho!',
    likes: [{ id: 'l4', userId: 'u4', postId: '2' }],
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    channelId: 'saude',
    channel: { name: 'Saúde em Foco' },
    content: 'Campanha de vacinação contra a gripe começa neste sábado no posto central. Não esqueça sua carteirinha!',
    likes: [],
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    channelId: 'infra',
    channel: { name: 'Obras Públicas' },
    content: 'Iniciada a pavimentação da Rua das Flores. O trânsito ficará interditado por 3 dias.',
    likes: [{ id: 'l5', userId: 'u5', postId: '4' }, { id: 'l6', userId: 'u6', postId: '4' }],
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    channelId: 'saude',
    channel: {
      id: 'saude',
      name: 'Saúde'
    },
    content: '',
    title: '',
    poll: {
      id: 'poll-ubs-1',
      question: 'Você concorda com a ampliação do horário de funcionamento das UBSs até às 22h?',
      options: [
        {
          id: 'opt-1',
          text: 'Sim, concordo',
          icon: FaThumbsUp,
          votes: 1936,
          percentage: 68
        },
        {
          id: 'opt-2',
          text: 'Não concordo',
          icon: FaThumbsDown,
          votes: 626,
          percentage: 22
        },
        {
          id: 'opt-3',
          text: 'Preciso saber mais',
          icon: FaQuestion,
          votes: 285,
          percentage: 10
        }
      ],
      totalVotes: 2847,
      endsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias a partir de agora
    },
    likes: Array(892).fill(null).map((_, i) => ({
      id: `like-${i}`,
      userId: `user-${i}`,
      postId: '5'
    })),
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 horas atrás
  },
];
