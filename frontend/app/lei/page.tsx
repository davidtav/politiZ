import { Topbar } from '../../components/Topbar';
import { BottomNav } from '../../components/BottomNav';
import { ToggleBias } from '../../components/ToggleBias';

export default function LeiPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-3">Lei Traduzida</h2>
        <p className="text-sm text-space-indigo-200 mb-4">Explicação simplificada gerada por IA sobre a lei em análise, impactos e exemplos práticos.</p>
        <ToggleBias />
      </div>
      <BottomNav />
    </main>
  );
}
