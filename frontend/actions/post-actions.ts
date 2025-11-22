'use server';

import { api } from '../lib/api';
import { Post, Poll, CreatePostData, CreatePostWithPollData } from '../types';

/**
 * Cria um novo post normal (sem enquete)
 * 
 * @param data - Dados do post a ser criado
 * @returns Promise com o post criado
 * @throws Error se a criação falhar
 */
export async function createPost(data: CreatePostData): Promise<Post> {
    try {
        const response = await api.post('/posts', {
            channelId: data.channelId,
            title: data.title,
            content: data.content,
            image: data.image,
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao criar post:', error);
        throw new Error('Não foi possível criar o post. Tente novamente.');
    }
}

/**
 * Cria um novo post com enquete
 * 
 * @param data - Dados do post com enquete a ser criado
 * @returns Promise com o post criado (incluindo a enquete)
 * @throws Error se a criação falhar
 */
export async function createPostWithPoll(data: CreatePostWithPollData): Promise<Post> {
    try {
        // Preparar os dados da enquete para envio ao backend
        const pollData = {
            question: data.poll.question,
            options: data.poll.options.map(opt => ({
                text: opt.text,
                // Nota: O backend pode não aceitar IconType diretamente
                // Pode ser necessário converter para string ou outro formato
                icon: opt.icon.name || 'FaQuestion',
            })),
            endsAt: data.poll.endsAt,
        };

        const response = await api.post('/posts', {
            channelId: data.channelId,
            title: data.title,
            content: data.content || '',
            poll: pollData,
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao criar post com enquete:', error);
        throw new Error('Não foi possível criar o post com enquete. Tente novamente.');
    }
}

/**
 * Registra o voto de um usuário em uma enquete
 * 
 * @param pollId - ID da enquete
 * @param optionId - ID da opção escolhida
 * @returns Promise com a enquete atualizada
 * @throws Error se o voto falhar
 */
export async function voteOnPoll(pollId: string, optionId: string): Promise<Poll> {
    try {
        const response = await api.post(`/polls/${pollId}/vote`, {
            optionId,
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao votar na enquete:', error);
        throw new Error('Não foi possível registrar seu voto. Tente novamente.');
    }
}

/**
 * Curtir um post
 * 
 * @param postId - ID do post a ser curtido
 * @returns Promise com o post atualizado
 * @throws Error se a curtida falhar
 */
export async function likePost(postId: string): Promise<Post> {
    try {
        const response = await api.post(`/posts/${postId}/like`);
        return response.data;
    } catch (error) {
        console.error('Erro ao curtir post:', error);
        throw new Error('Não foi possível curtir o post. Tente novamente.');
    }
}

/**
 * Remover curtida de um post
 * 
 * @param postId - ID do post
 * @returns Promise com o post atualizado
 * @throws Error se a remoção falhar
 */
export async function unlikePost(postId: string): Promise<Post> {
    try {
        const response = await api.delete(`/posts/${postId}/like`);
        return response.data;
    } catch (error) {
        console.error('Erro ao remover curtida:', error);
        throw new Error('Não foi possível remover a curtida. Tente novamente.');
    }
}
