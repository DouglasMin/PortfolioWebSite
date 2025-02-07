import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '',
  direction = 'up',
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-16';
      case 'down':
        return '-translate-y-16';
      case 'left':
        return 'translate-x-16';
      case 'right':
        return '-translate-x-16';
      default:
        return 'translate-y-16';
    }
  };

  return (
    <div 
      ref={elementRef} 
      className={`scroll-reveal ${getDirectionClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;