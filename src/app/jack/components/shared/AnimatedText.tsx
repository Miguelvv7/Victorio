'use client';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export default function AnimatedText({ text, className }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.3em' }}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 2 / words.length, 1);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return (
          <motion.span key={i} style={{ opacity, display: 'inline-block' }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
}
