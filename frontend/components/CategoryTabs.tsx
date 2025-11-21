"use client";
import { FaFire, FaGraduationCap, FaBus, FaTree, FaHeartbeat } from 'react-icons/fa';

const categories = [
    { id: 'populares', label: 'Populares', icon: <FaFire /> },
    { id: 'educacao', label: 'Educação', icon: <FaGraduationCap /> },
    { id: 'transporte', label: 'Transporte', icon: <FaBus /> },
    { id: 'ambiente', label: 'Ambiente', icon: <FaTree /> },
    { id: 'saude', label: 'Saúde', icon: <FaHeartbeat /> },
];

export function CategoryTabs() {
    return (
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat, idx) => (
                <button
                    key={cat.id}
                    className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
            ${idx === 0
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                            : 'bg-space-indigo-800/50 text-space-indigo-300 hover:bg-space-indigo-700 border border-space-indigo-700'}
          `}
                >
                    {cat.icon}
                    {cat.label}
                </button>
            ))}
        </div>
    );
}
