"use client";
import { MotionFade } from './MotionFade';

export function LevelCard() {
    return (
        <MotionFade className="w-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-5 text-white shadow-lg mb-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>

            <div className="flex justify-between items-start mb-1 relative z-10">
                <div>
                    <span className="text-sm font-medium text-blue-100">Seu Nível</span>
                    <h2 className="text-3xl font-bold mt-1 flex items-center gap-2">
                        Politizado <span className="text-2xl">🔥</span>
                    </h2>
                    <p className="text-sm text-blue-100 mt-1">Nível 7 • 2.340 XP</p>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl px-3 py-2 text-center min-w-[80px]">
                    <span className="block text-xs text-blue-100 mb-0.5">Ranking</span>
                    <span className="block text-xl font-bold">#23</span>
                    <span className="block text-[10px] text-blue-100 mt-0.5">de 1.247</span>
                </div>
            </div>

            <div className="mt-4 relative z-10">
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[70%] rounded-full"></div>
                </div>
            </div>
        </MotionFade>
    );
}
