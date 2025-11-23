"use client";
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShareAlt, FaEye, FaLightbulb, FaRobot, FaBus, FaGraduationCap, FaExclamationTriangle, FaChartBar, FaUsers, FaClock, FaSpinner } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { MotionFade } from './MotionFade';
import { ImpactExplanationModal } from './ImpactExplanationModal';
import { BiasAnalysisModal } from './BiasAnalysisModal';
import { explainNewsImpact, analyzePoliticalBias, type ImpactExplanation, type BiasAnalysis } from '../lib/api';
import type { Post } from '../types';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length ?? 1200);
  const [commentsCount] = useState(234);
  const [sharesCount] = useState(89);
  const [selectedPollOption, setSelectedPollOption] = useState<string | undefined>(post.poll?.userVote);
  const [impactExplanation, setImpactExplanation] = useState<ImpactExplanation | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [biasAnalysis, setBiasAnalysis] = useState<BiasAnalysis | null>(null);
  const [isLoadingBias, setIsLoadingBias] = useState(false);
  const [showBiasModal, setShowBiasModal] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handlePollVote = (optionId: string) => {
    if (!post.poll) return;
    setSelectedPollOption(optionId);
    // enviar voto ao backend
  };

  const handleExplainImpact = async () => {
    setIsLoadingExplanation(true);
    try {
      const explanation = await explainNewsImpact(post.id);
      setImpactExplanation(explanation);
      setShowExplanationModal(true);
    } catch (error) {
      console.error('Erro ao buscar explicação:', error);
      alert('Erro ao buscar explicação. Tente novamente.');
    } finally {
      setIsLoadingExplanation(false);
    }
  };

  const handleAnalyzeBias = async () => {
    setIsLoadingBias(true);
    try {
      const analysis = await analyzePoliticalBias(post.id);
      setBiasAnalysis(analysis);
      setShowBiasModal(true);
    } catch (error) {
      console.error('Erro ao analisar viés:', error);
      alert('Erro ao analisar viés. Tente novamente.');
    } finally {
      setIsLoadingBias(false);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const getDaysUntilEnd = (endsAt: string) => {
    const now = new Date();
    const end = new Date(endsAt);
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // ================================
  //   EXTRAÇÃO DE TAGS DO BACKEND
  // ================================
  // Se post.category existir: "saúde;transporte;educação"
  // Caso contrário: []
  const tags = !post.poll && post.category
    ? post.category.split(';').map(t => t.trim()).filter(Boolean)
    : [];

  return (
    <MotionFade className="w-full bg-[#1a1f2e] backdrop-blur rounded-2xl p-5 mb-4 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <FaRobot className="text-white text-xl" />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">IA Cidadã</span>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">
                IA
              </span>
              <span className="text-gray-500 text-sm">• 5h</span>
            </div>
            <span className="text-gray-400 text-sm">
              {post.poll ? 'Votação em Andamento' : 'Legislação Municipal'}
            </span>
          </div>
        </div>

        {/* Menu */}
        <button className="text-gray-500 hover:text-gray-300 transition">
          <HiDotsVertical className="text-xl" />
        </button>
      </div>

      {/* Poll Content */}
      {post.poll ? (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-4 mb-4">
          
          {/* Poll Header */}
          <div className="flex items-center gap-2 mb-3">
            <FaChartBar className="text-yellow-500" />
            <span className="text-yellow-500 font-bold text-sm">Enquete Ativa</span>
          </div>

          {/* Question */}
          <h3 className="text-white font-semibold text-base mb-4 leading-relaxed">
            {post.poll.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-4">
            {post.poll.options.map((option) => {
              const isSelected = selectedPollOption === option.id;
              const isWinning = option.percentage === Math.max(...post.poll!.options.map(o => o.percentage));

              return (
                <button
                  key={option.id}
                  onClick={() => handlePollVote(option.id)}
                  className={`w-full text-left rounded-lg p-3 transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? isWinning
                        ? 'bg-green-900/40 border-2 border-green-600/50'
                        : option.percentage < 20
                          ? 'bg-gray-800/60 border-2 border-gray-600/50'
                          : 'bg-red-900/40 border-2 border-red-600/50'
                      : 'bg-gray-800/30 border border-gray-700/50 hover:border-gray-600'
                  }`}
                >

                  {/* Progress */}
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isWinning
                        ? 'bg-green-600/20'
                        : option.percentage < 20
                          ? 'bg-gray-600/10'
                          : 'bg-red-600/20'
                    }`}
                    style={{ width: `${option.percentage}%` }}
                  />

                  {/* Text */}
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <option.icon />
                      <span className="text-white font-medium">{option.text}</span>
                    </div>
                    <span
                      className={`font-bold text-lg ${
                        isWinning
                          ? 'text-green-400'
                          : option.percentage < 20
                            ? 'text-gray-400'
                            : 'text-red-400'
                      }`}
                    >
                      {option.percentage}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <FaUsers className="text-xs" />
              <span>{formatCount(post.poll.totalVotes)} votos</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <FaClock className="text-xs" />
              <span>Encerra em {getDaysUntilEnd(post.poll.endsAt)} dias</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Regular Content */}
          <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="text-orange-500 text-2xl mt-1">
                <FaExclamationTriangle />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {post.content}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                  index === 0
                    ? 'bg-purple-600/20 text-purple-300'
                    : 'bg-blue-600/20 text-blue-300'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleExplainImpact}
            disabled={isLoadingExplanation}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl mb-4 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoadingExplanation ? (
              <>
                <FaSpinner className="text-lg animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <FaLightbulb className="text-lg" />
                Como isso me afeta?
              </>
            )}
          </button>
        </>
      )}

      {/* Poll Tag */}
      {post.poll && (
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 bg-red-600/20 text-red-300">
            ❤️ Saúde
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-400 pt-3 border-t border-gray-800">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 hover:text-red-400 transition-colors ${
            liked ? 'text-red-500' : ''
          }`}
        >
          {liked ? <FaHeart className="text-lg" /> : <FaRegHeart className="text-lg" />}
          <span className="font-medium">{formatCount(likesCount)}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
          <FaComment className="text-lg" />
          <span className="font-medium">{commentsCount}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-green-400 transition-colors">
          <FaShareAlt className="text-lg" />
          <span className="font-medium">{sharesCount}</span>
        </button>

        <button
          onClick={handleAnalyzeBias}
          disabled={isLoadingBias}
          className="flex items-center gap-2 hover:text-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingBias ? (
            <>
              <FaSpinner className="text-lg animate-spin" />
              <span className="font-medium">Analisando...</span>
            </>
          ) : (
            <>
              <FaEye className="text-lg" />
              <span className="font-medium">Ver viés</span>
            </>
          )}
        </button>
      </div>

      {/* Modal de Explicação de Impacto */}
      {showExplanationModal && impactExplanation && (
        <ImpactExplanationModal
          explanation={impactExplanation}
          onClose={() => setShowExplanationModal(false)}
        />
      )}

      {/* Modal de Análise de Viés */}
      {showBiasModal && biasAnalysis && (
        <BiasAnalysisModal
          analysis={biasAnalysis}
          onClose={() => setShowBiasModal(false)}
        />
      )}
    </MotionFade>
  );
}
