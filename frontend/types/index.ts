export interface Channel {
  id?: string;
  name: string;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
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
}

export interface FeedUpdatePayload {
  channelId: string;
  post: Post;
}