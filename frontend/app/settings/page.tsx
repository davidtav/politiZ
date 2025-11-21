import { Topbar } from '../../components/Topbar';
import { BottomNav } from '../../components/BottomNav';

export default function SettingsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Configurações</h2>
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-space-indigo-800/50 border border-space-indigo-700">Tema: Dark (padrão)</div>
          <div className="p-4 rounded-xl bg-space-indigo-800/50 border border-space-indigo-700">Notificações: Ativadas</div>
          <div className="p-4 rounded-xl bg-space-indigo-800/50 border border-space-indigo-700">Idioma: PT-BR</div>
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
