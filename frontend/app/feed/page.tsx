"use client";
import { useEffect } from 'react';
import { Topbar } from '../../components/Topbar';
import { BottomNav } from '../../components/BottomNav';
import { PostCard } from '../../components/PostCard';
import { useFeedStore } from '../../lib/store';
import { fetchFeed } from '../../lib/api';
import { useSocket } from '../../hooks/useSocket';
import { NotificationToast } from '../../components/NotificationToast';
import { LevelCard } from '../../components/LevelCard';
import { CategoryTabs } from '../../components/CategoryTabs';

export default function FeedPage() {
  const { posts, setPosts, addPost } = useFeedStore();
  const { socket } = useSocket();

  useEffect(() => {
    fetchFeed().then(setPosts).catch(() => { });
  }, [setPosts]);

  useEffect(() => {
    if (!socket) return;
    const handler = (payload: any) => {
      addPost(payload.post);
    };
    socket.on('feed_update', handler);
    return () => { socket.off('feed_update', handler); };
  }, [socket, addPost]);

  return (
    <main className="min-h-screen flex flex-col bg-space-indigo-950">
      <Topbar />
      <div className="flex-1 w-full max-w-md mx-auto px-4 pt-4 pb-24">
        <LevelCard />
        <div className="mb-6">
          <CategoryTabs />
        </div>

        <div className="space-y-4">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
      <BottomNav />
      <NotificationToast socket={socket} />
    </main>
  );
}
