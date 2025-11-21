import { Topbar } from '../../../components/Topbar';
import { BottomNav } from '../../../components/BottomNav';
import { ChannelBadge } from '../../../components/ChannelBadge';

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-2">Usuário {params.id}</h2>
        <p className="text-xs text-space-indigo-300 mb-4">Bio curta do usuário e estatísticas.</p>
        <div className="flex gap-2 flex-wrap">
          <ChannelBadge name="educacao" />
          <ChannelBadge name="saude" />
          <ChannelBadge name="tecnologia" />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
