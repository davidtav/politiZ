"use client";
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function MotionFade({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}
