import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  phrases,
  typingSpeed = 50,
  deletingSpeed = 30,
  delayBetweenPhrases = 1500,
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = phrases[currentIndex];
      
      if (!isDeleting) {
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          setIsDeleting(true);
          setTimeout(() => {}, delayBetweenPhrases);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, phrases, typingSpeed, deletingSpeed, delayBetweenPhrases]);

  return (
    <div className="h-[30px] flex items-center justify-center">
      <span className="text-xl text-blue-600 font-medium">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default TypeWriter;