"use client";
export function ChannelBadge({ name }: { name: string }) {
  return <span className="inline-block px-2 py-0.5 text-[10px] rounded-full bg-space-indigo-700 text-lavender-purple-200 border border-space-indigo-600">#{name}</span>;
}
