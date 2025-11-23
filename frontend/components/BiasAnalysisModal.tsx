"use client";
import { FaTimes, FaEye, FaExclamationCircle } from 'react-icons/fa';
import { BiasAnalysis } from '../lib/api';

interface BiasAnalysisModalProps {
    analysis: BiasAnalysis;
    onClose: () => void;
}

export function BiasAnalysisModal({ analysis, onClose }: BiasAnalysisModalProps) {
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1a1f2e] border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-[#1a1f2e] border-b border-gray-700 p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                            <FaEye className="text-white text-xl" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-xl">Análise de Viés Político</h2>
                            <p className="text-gray-400 text-sm">Identificando possíveis vieses e interesses</p>
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
                    {/* Seção 1: Análise Detalhada */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-700/30 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaExclamationCircle className="text-purple-400 text-xl" />
                            <h3 className="text-purple-300 font-bold text-lg">Análise Detalhada</h3>
                        </div>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {analysis.analysis}
                        </div>
                    </div>

                    {/* Seção 2: Resumo do Viés */}
                    <div className="bg-gradient-to-br from-pink-900/20 to-red-900/20 border border-pink-700/30 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <FaEye className="text-pink-400 text-xl" />
                            <h3 className="text-pink-300 font-bold text-lg">Resumo do Viés</h3>
                        </div>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {analysis.summary}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-yellow-900/10 border border-yellow-700/30 rounded-xl p-4">
                        <p className="text-yellow-200 text-sm leading-relaxed">
                            <strong>⚠️ Aviso:</strong> Esta é uma análise automatizada por IA para fins educativos.
                            Recomendamos pesquisar mais sobre o tema e formar sua própria opinião. A análise é baseada
                            nas informações disponíveis no conteúdo fornecido.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-[#1a1f2e] border-t border-gray-700 p-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                    >
                        Entendi!
                    </button>
                </div>
            </div>
        </div>
    );
}
