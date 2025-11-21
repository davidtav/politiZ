"use client";
import { useState } from 'react';

export function ToggleBias() {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-4">
      <button onClick={() => setOpen(o => !o)} className="px-3 py-1.5 rounded-lg bg-twilight-indigo-700 text-xs hover:bg-twilight-indigo-600 transition">
        {open ? 'Esconder Vieses' : 'Mostrar Vieses'}
      </button>
      {open && (
        <div className="mt-2 p-3 rounded-lg bg-twilight-indigo-800 text-xs text-bright-snow-200 border border-twilight-indigo-600">
          <p>Esta lei pode favorecer grupos com interesse em X, impacto econômico em Y, risco social em Z.</p>
        </div>
      )}
    </div>
  );
}
