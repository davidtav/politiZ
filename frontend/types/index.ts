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
  emoji: string;
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