import { create } from 'zustand';
import type { Post } from '../types';

interface FeedState {
  posts: Post[];
  setPosts: (p: Post[]) => void;
  addPost: (p: Post) => void;
}

export const useFeedStore = create<FeedState>(set => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set(state => ({ posts: [post, ...state.posts] }))
}));
