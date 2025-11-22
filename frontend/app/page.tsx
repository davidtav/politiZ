"use client";
import { useEffect } from 'react';
import { Topbar } from '../components/Topbar';
import { BottomNav } from '../components/BottomNav';
import { Sidebar } from '../components/Sidebar';
import { RightPanel } from '../components/RightPanel';
import { PostCard } from '../components/PostCard';
import type { FeedUpdatePayload, Post } from '../types';
import { useFeedStore } from '../lib/store';
import { fetchFeed } from '../lib/api';
import { useSocket } from '../hooks/useSocket';

export default function HomeFeed() {
  const { posts, setPosts, addPost } = useFeedStore();
  const { socket } = useSocket();

  useEffect(() => {
    fetchFeed()
      .then((data: Post[]) => setPosts(data))
      .catch(()=>{});
  }, [setPosts]);
  useEffect(() => {
    if (!socket) return;
    const handler = (payload: FeedUpdatePayload) => addPost(payload.post);
    socket.on('feed_update', handler);
    return () => {
      socket.off('feed_update', handler);
    };
  }, [socket, addPost]);

  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 w-full grid grid-cols-12 gap-4 px-4 py-4 max-w-7xl mx-auto">
        <aside className="hidden md:block col-span-3"><Sidebar /></aside>
        <section className="col-span-12 md:col-span-6 flex flex-col">
          {posts.length === 0 && (
            <div className="text-center text-xs text-space-indigo-300 py-8">Carregando feed...</div>
          )}
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </section>
        <aside className="hidden lg:block col-span-3"><RightPanel /></aside>
      </div>
      <BottomNav />
    </main>
  );
}
