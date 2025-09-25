'use client'; 

import { useState, useEffect, useRef } from 'react';
import WorkerCard from './WorkerCard';
import { WorkerType } from '@/types/workers';

interface AnimatedWorkerCardProps {
  worker: WorkerType;
  delay?: number; 
}

export default function AnimatedWorkerCard({ worker, delay = 0 }: AnimatedWorkerCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        rootMargin: '0px', 
        threshold: 0.05, 
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]); 

  return (
    <div
      ref={cardRef}
      className={`
        transition-all duration-100 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <WorkerCard worker={worker} />
    </div>
  );
}