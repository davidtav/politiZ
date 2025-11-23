"use client";
import { FaTimes, FaLightbulb, FaBook, FaClock } from 'react-icons/fa';
import { ImpactExplanation } from '../lib/api';

interface ImpactExplanationModalProps {
    explanation: ImpactExplanation;
    onClose: () => void;
}

export function ImpactExplanationModal({ explanation, onClose }: ImpactExplanationModalProps) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1f2e] border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#1a1f2e] border-b border-gray-700 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <FaLightbulb className="text-white text-xl" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-xl">Como isso me afeta?</h2>
                            <p className="text-gray-400 text-sm">Explicação personalizada para você</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-2"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Seção 1: Linguagem Simples */}
                    <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-700/30 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaLightbulb className="text-blue-400 text-xl" />
                            <h3 className="text-blue-300 font-bold text-lg">Linguagem Simples</h3>
                        </div>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {explanation.simple}
                        </div>
                    </div>

                    {/* Seção 2: Storytelling */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-700/30 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaBook className="text-purple-400 text-xl" />
                            <h3 className="text-purple-300 font-bold text-lg">Storytelling</h3>
                        </div>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {explanation.storytelling}
                        </div>
                    </div>

                    {/* Seção 3: Projeção Futura */}
                    <div className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border border-orange-700/30 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaClock className="text-orange-400 text-xl" />
                            <h3 className="text-orange-300 font-bold text-lg">Projeção Futura (10 anos)</h3>
                        </div>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {explanation.futureProjection}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-[#1a1f2e] border-t border-gray-700 p-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                    >
                        Entendi!
                    </button>
                </div>
            </div>
        </div>
    );
}
