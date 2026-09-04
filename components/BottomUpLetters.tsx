'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';

export interface BottomUpLettersProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number; // default 0.088s (88ms)
  duration?: number;
  triggerOnView?: boolean;
  once?: boolean;
  amount?: number | 'some' | 'all';
  letterClassName?: string;
  wordClassName?: string;
}

const letterVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: (custom: { duration: number }) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: custom.duration,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function BottomUpLetters({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.088, // 88ms pronounced staging
  duration = 0.4,
  triggerOnView = true,
  once = true,
  amount = 0.2,
  letterClassName = '',
  wordClassName = '',
}: BottomUpLettersProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once, amount });
  const isTriggered = triggerOnView ? inView : true;

  // Split into words, then characters
  const words = text.split(' ');
  let charCounter = 0;

  if (shouldReduceMotion) {
    return (
      <Component className={className} aria-label={text}>
        {text}
      </Component>
    );
  }

  return (
    <Component
      ref={ref as any}
      className={`${className} inline-block select-none`}
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const chars = Array.from(word);

        return (
          <span
            key={wordIndex}
            className={`inline-block whitespace-nowrap ${wordClassName}`}
            aria-hidden="true"
          >
            {chars.map((char, charIndex) => {
              const currentDelay = delay + charCounter * stagger;
              charCounter++;

              return (
                <span
                  key={charIndex}
                  className={`inline-block overflow-hidden align-baseline ${letterClassName}`}
                >
                  <motion.span
                    className="inline-block"
                    variants={letterVariants}
                    initial="hidden"
                    animate={isTriggered ? 'visible' : 'hidden'}
                    custom={{ duration }}
                    transition={{
                      delay: currentDelay,
                      duration,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </Component>
  );
}
