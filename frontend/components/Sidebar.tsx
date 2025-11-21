"use client";
import Link from 'next/link';
import { ChannelBadge } from './ChannelBadge';

const channels = [
  { name: 'educacao', desc: 'Discussões sobre educação básica e superior.' },
  { name: 'saude', desc: 'Impacto de políticas de saúde pública.' },
  { name: 'tecnologia', desc: 'Inovação, IA e regulação digital.' },
  { name: 'ambiente', desc: 'Clima, sustentabilidade e energia.' },
];

export function Sidebar() {
  return (
    <div className="sticky top-20 flex flex-col gap-4">
      <div className="bg-space-indigo-800/60 border border-space-indigo-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-lavender-purple-300 mb-3">Canais Seguidos</h3>
        <div className="flex flex-wrap gap-2">
          {channels.slice(0,3).map(c => <ChannelBadge key={c.name} name={c.name} />)}
        </div>
      </div>
      <div className="bg-space-indigo-800/60 border border-space-indigo-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-lavender-purple-300 mb-3">Explorar Canais</h3>
        <ul className="space-y-2 text-xs">
          {channels.map(c => (
            <li key={c.name} className="group">
              <Link href={`/channel/${c.name}`} className="block p-2 rounded-lg bg-space-indigo-900/40 hover:bg-space-indigo-800 transition border border-transparent hover:border-azure-blue-600">
                <span className="font-medium text-bright-snow-100">#{c.name}</span>
                <p className="text-space-indigo-300 mt-1 line-clamp-2">{c.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
