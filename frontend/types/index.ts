import { IconType } from "react-icons";

export interface Channel {
  id?: string;
  name: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
}

export interface PollOption {
  id: string;
  text: string;
  icon: IconType;
  votes: number;
  percentage: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  endsAt: string;
  userVote?: string; // ID da opção votada pelo usuário
}

export interface Post {
  id: string;
  channelId: string;
  channel?: Channel;
  content: string;
  category: string;
  title?: string;
  image?: string;
  likes?: Like[];
  createdAt?: string;
  poll?: Poll; // Enquete opcional
}

export interface FeedUpdatePayload {
  channelId: string;
  post: Post;
}

/**
 * Interface para os dados necessários para criar um post normal
 */
export interface CreatePostData {
    channelId: string;
    title?: string;
    content: string;
    image?: string;
}

/**
 * Interface para os dados de uma opção de enquete ao criar
 */
export interface CreatePollOptionData {
    text: string;
    icon: IconType;
}

/**
 * Interface para os dados de uma enquete ao criar
 */
export interface CreatePollData {
    question: string;
    options: CreatePollOptionData[];
    endsAt: string; // Data de término da enquete em formato ISO
}

/**
 * Interface para os dados necessários para criar um post com enquete
 */
export interface CreatePostWithPollData {
    channelId: string;
    title?: string;
    content?: string;
    poll: CreatePollData;
}
