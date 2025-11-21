"use client";
import { FaHeart, FaBus, FaGraduationCap } from 'react-icons/fa';
import { MotionFade } from './MotionFade';
import type { Post } from '../types';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const likesCount = post.likes?.length ?? 0;
  const isProposal = post.title?.includes('Lei') || post.content.includes('Projeto de Lei');

  return (
    <MotionFade className="w-full bg-space-indigo-900/40 backdrop-blur-sm rounded-3xl p-5 mb-4 border border-space-indigo-800/50 hover:border-space-indigo-700 transition group">
      <div className="flex justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">IA Cidadã</span>
              <span className="px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold">IA</span>
              <span className="text-space-indigo-400 text-xs">• 2h</span>
            </div>
            <p className="text-xs text-space-indigo-300">Legislação Municipal</p>
          </div>
        </div>
        <button className="text-space-indigo-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>

      {isProposal ? (
        <div className="bg-space-indigo-800/50 rounded-2xl p-4 mb-4 border border-space-indigo-700/50">
          <div className="flex items-start gap-3 mb-2">
            <div className="mt-1 text-orange-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">Nova proposta de lei sobre transporte escolar</h3>
              <p className="text-sm text-space-indigo-200 leading-relaxed">
                {post.content}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-space-indigo-100 mb-4 leading-relaxed">{post.content}</p>
      )}

      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium flex items-center gap-1">
          <FaBus className="text-[10px]" /> Transporte
        </span>
        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium flex items-center gap-1">
          <FaGraduationCap className="text-[10px]" /> Educação
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-space-indigo-800/50">
        <div className="flex items-center gap-1 text-space-indigo-300 text-xs">
          <span>Apoiar proposta?</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-space-indigo-300 hover:text-green-400 transition text-xs font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Concordo
          </button>
          <button className="flex items-center gap-1.5 text-space-indigo-300 hover:text-red-400 transition text-xs font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Discordo
          </button>
        </div>
      </div>
    </MotionFade>
  );
}
