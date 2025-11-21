"use client";
import { useEffect, useState } from 'react';

export function NotificationToast({ socket }: { socket?: any }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    if (!socket) return;
    const handler = (payload: any) => setItems(list => [...list, payload]);
    socket.on('new_notification:demo', handler);
    return () => socket.off('new_notification:demo', handler);
  }, [socket]);
  return (
    <div className="fixed top-20 right-4 flex flex-col gap-2 z-50">
      {items.slice(-3).map((n, i) => (
        <div key={i} className="px-3 py-2 rounded-lg bg-ink-black-800 shadow-soft text-xs text-bright-snow-100 border border-ink-black-600 animate-fade-in">
          {n.message || 'Nova notificação'}
        </div>
      ))}
    </div>
  );
}
