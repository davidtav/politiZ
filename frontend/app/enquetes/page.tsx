import { Topbar } from '../../components/Topbar';
import { BottomNav } from '../../components/BottomNav';

export default function EnquetesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Enquetes</h2>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="p-4 rounded-xl bg-space-indigo-800/50 border border-space-indigo-700">
              <p className="text-sm mb-3">Enquete #{i}: Você apoia a iniciativa X?</p>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 text-xs rounded-lg bg-azure-blue-600 hover:bg-azure-blue-500">Sim</button>
                <button className="flex-1 py-1.5 text-xs rounded-lg bg-twilight-indigo-700 hover:bg-twilight-indigo-600">Não</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
