"use client";
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShareAlt, FaEye, FaLightbulb, FaRobot, FaBus, FaGraduationCap, FaExclamationTriangle } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { MotionFade } from './MotionFade';
import type { Post } from '../types';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length ?? 1200);
  const [commentsCount] = useState(234);
  const [sharesCount] = useState(89);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  // Extrair tags do conteúdo ou usar tags padrão
  const tags = ['Transporte', 'Educação'];

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
              <span className="text-gray-500 text-sm">• 2h</span>
            </div>
            <span className="text-gray-400 text-sm">Legislação Municipal</span>
          </div>
        </div>

        {/* Menu */}
        <button className="text-gray-500 hover:text-gray-300 transition">
          <HiDotsVertical className="text-xl" />
        </button>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-700/30 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="text-orange-500 text-2xl mt-1">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              {post.title || 'Nova proposta de lei sobre transporte escolar'}
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
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 ${index === 0
                ? 'bg-purple-600/20 text-purple-300'
                : 'bg-blue-600/20 text-blue-300'
              }`}
          >
            {index === 0 ? <FaBus /> : <FaGraduationCap />} {tag}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 px-4 rounded-xl mb-4 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02]">
        <FaLightbulb className="text-lg" />
        Como isso me afeta?
      </button>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-400 pt-3 border-t border-gray-800">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 hover:text-red-400 transition-colors ${liked ? 'text-red-500' : ''
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

        <button className="flex items-center gap-2 hover:text-purple-400 transition-colors">
          <FaEye className="text-lg" />
          <span className="font-medium">Ver viés</span>
        </button>
      </div>
    </MotionFade>
  );
}
