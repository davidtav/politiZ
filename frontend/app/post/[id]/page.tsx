import { Topbar } from '../../../components/Topbar';
import { BottomNav } from '../../../components/BottomNav';
import { ToggleBias } from '../../../components/ToggleBias';

export default function PostView({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-3">Post {params.id}</h2>
        <p className="text-sm text-space-indigo-200 mb-4">Conteúdo detalhado do post, resumo, contexto e debate em thread futura.</p>
        <ToggleBias />
      </div>
      <BottomNav />
    </main>
  );
}
