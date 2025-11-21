"use client";

export function RightPanel() {
  const trends = [
    { tag: 'reforma-educacional', posts: 128 },
    { tag: 'saude-preventiva', posts: 97 },
    { tag: 'ia-regulacao', posts: 83 },
    { tag: 'energia-limpa', posts: 76 }
  ];
  return (
    <div className="sticky top-20 flex flex-col gap-4">
      <div className="bg-space-indigo-800/60 border border-space-indigo-700 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-lavender-purple-300 mb-3">Tendências</h3>
        <ul className="space-y-2 text-xs">
          {trends.map(t => (
            <li key={t.tag} className="flex items-center justify-between p-2 rounded-lg bg-space-indigo-900/40 hover:bg-space-indigo-800 transition">
              <span className="text-bright-snow-100">#{t.tag}</span>
              <span className="text-space-indigo-300">{t.posts}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-space-indigo-800/60 border border-space-indigo-700 rounded-xl p-4 text-xs text-space-indigo-300">
        <p className="mb-2 font-semibold text-lavender-purple-300">Resumo IA</p>
        <p>Políticas de educação dominam discussões hoje. Alta participação em tecnologia e clima.</p>
      </div>
    </div>
  );
}
