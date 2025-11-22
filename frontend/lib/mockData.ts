import type { Post } from '../types';

export const mockPosts: Post[] = [
    // Post com enquete
    {
        id: 'poll-1',
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
                    emoji: '👍',
                    votes: 1936,
                    percentage: 68
                },
                {
                    id: 'opt-2',
                    text: 'Não concordo',
                    emoji: '👎',
                    votes: 626,
                    percentage: 22
                },
                {
                    id: 'opt-3',
                    text: 'Preciso saber mais',
                    emoji: '🤔',
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
            postId: 'poll-1'
        })),
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() // 5 horas atrás
    },

    // Post normal
    {
        id: 'post-1',
        channelId: 'transporte',
        channel: {
            id: 'transporte',
            name: 'Transporte'
        },
        content: 'Projeto de Lei 045/2024 propõe aumentar a frota de ônibus escolares em 30% e criar novas rotas para bairros periféricos.',
        title: 'Nova proposta de lei sobre transporte escolar',
        likes: Array(1200).fill(null).map((_, i) => ({
            id: `like-${i}`,
            userId: `user-${i}`,
            postId: 'post-1'
        })),
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 horas atrás
    },

    // Outra enquete
    {
        id: 'poll-2',
        channelId: 'educacao',
        channel: {
            id: 'educacao',
            name: 'Educação'
        },
        content: '',
        title: '',
        poll: {
            id: 'poll-escola-1',
            question: 'Você apoia a implementação de aulas de programação no ensino fundamental?',
            options: [
                {
                    id: 'opt-1',
                    text: 'Sim, apoio totalmente',
                    emoji: '💻',
                    votes: 3200,
                    percentage: 75
                },
                {
                    id: 'opt-2',
                    text: 'Não apoio',
                    emoji: '❌',
                    votes: 640,
                    percentage: 15
                },
                {
                    id: 'opt-3',
                    text: 'Tenho dúvidas',
                    emoji: '🤷',
                    votes: 427,
                    percentage: 10
                }
            ],
            totalVotes: 4267,
            endsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias
        },
        likes: Array(1543).fill(null).map((_, i) => ({
            id: `like-${i}`,
            userId: `user-${i}`,
            postId: 'poll-2'
        })),
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() // 8 horas atrás
    }
];
