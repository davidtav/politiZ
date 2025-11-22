"use client";
import { FaHeart } from 'react-icons/fa';
import { MotionFade } from './MotionFade';
import type { Post } from '../types';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const likesCount = post.likes?.length ?? 0;
  return (
    <MotionFade className="w-full bg-space-indigo-800/60 backdrop-blur rounded-xl p-4 mb-3 border border-space-indigo-700 hover:border-lavender-purple-500 transition group">
      <div className="flex justify-between mb-2 text-xs text-space-indigo-300">
        <span className="font-medium">#{post.channel?.name || post.channelId}</span>
        <span className="opacity-70">{post.id.slice(0,6)}</span>
      </div>
      <p className="text-sm leading-relaxed text-bright-snow-100">{post.content}</p>
      <div className="flex items-center gap-2 mt-3 text-amber-gold-400 text-sm">
        <FaHeart className="group-hover:scale-110 transition" /> {likesCount}
      </div>
    </MotionFade>
  );
}
