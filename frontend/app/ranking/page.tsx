import { Topbar } from '../../components/Topbar';
import { BottomNav } from '../../components/BottomNav';

export default function RankingPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Topbar />
      <div className="flex-1 max-w-xl w-full mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Ranking</h2>
        <ol className="space-y-2 text-sm">
          {['Ana','Bruno','Carla','Diego','Eva'].map((n,i)=>(
            <li key={n} className="flex items-center justify-between p-3 rounded-lg bg-space-indigo-800/60 border border-space-indigo-700">
              <span className="font-medium">{i+1}. {n}</span>
              <span className="text-amber-gold-400">{(1000 - i*73)} pts</span>
            </li>
          ))}
        </ol>
      </div>
      <BottomNav />
    </main>
  );
}
