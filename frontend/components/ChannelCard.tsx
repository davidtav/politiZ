"use client";
import { MotionFade } from './MotionFade';

export function ChannelCard({ name, description }: { name: string; description: string }) {
  return (
    <MotionFade className="p-4 rounded-xl bg-space-indigo-800/50 border border-space-indigo-700 hover:border-azure-blue-500 transition">
      <h3 className="text-lavender-purple-300 font-semibold mb-1">#{name}</h3>
      <p className="text-xs text-space-indigo-200 line-clamp-3">{description}</p>
    </MotionFade>
  );
}
