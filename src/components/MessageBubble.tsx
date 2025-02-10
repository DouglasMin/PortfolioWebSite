import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: string;
  delay: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, delay }) => {
  // 메시지 길이에 따른 최대 너비 조정
  const getMaxWidth = (length: number) => {
    if (length < 15) return 'max-w-[75%] sm:max-w-[45%]';
    if (length < 30) return 'max-w-[85%] sm:max-w-[65%]';
    return 'max-w-[95%] sm:max-w-[85%]';
  };

  // 메시지 길이에 따른 패딩 조정
  const getPadding = (length: number) => {
    if (length < 15) return 'px-3 py-1.5 sm:px-4 sm:py-2';
    if (length < 30) return 'px-3 py-2 sm:px-5 sm:py-2.5';
    return 'px-3 py-2 sm:px-6 sm:py-3';
  };

  // 메시지에 영어가 포함되어 있는지 확인
  const hasEnglish = /[a-zA-Z]/.test(message);
  // 메시지에 한글이 포함되어 있는지 확인
  const hasKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/.test(message);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      className={`flex justify-end ${message.length < 15 ? 'mt-1 mb-2' : 'mt-1.5 mb-2'} sm:mb-4`}
    >
      <div className={`message-bubble ${getMaxWidth(message.length)} ${getPadding(message.length)}`}>
        <p className={`text-[13px] sm:text-[15px] leading-[1.4] sm:leading-[1.3] text-left
          break-words hyphens-auto
          ${hasKorean ? 'word-break-keep-all' : ''} 
          whitespace-normal overflow-hidden
          [word-spacing:0.1em]
          sm:[word-spacing:normal]
          [text-align-last:left]`}
          style={{
            wordSpacing: hasEnglish ? '0.1em' : 'normal',
            textAlign: 'justify'
          }}
        >
          {message}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;