import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: string;
  delay: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, delay }) => {
  // 메시지 길이에 따른 최대 너비 조정
  const getMaxWidth = (length: number) => {
    if (length < 15) return 'max-w-[40%]';
    if (length < 30) return 'max-w-[60%]';
    return 'max-w-[85%]';
  };

  // 메시지 길이에 따른 패딩 조정
  const getPadding = (length: number) => {
    if (length < 15) return 'px-4 py-2';
    if (length < 30) return 'px-5 py-2.5';
    return 'px-6 py-3';
  };

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
      className={`flex justify-end mb-4 ${message.length < 15 ? 'mt-1' : 'mt-2'}`}
    >
      <div className={`message-bubble ${getMaxWidth(message.length)} ${getPadding(message.length)}`}>
        <p className="text-[15px] leading-[1.3] whitespace-pre-wrap text-left">{message}</p>
      </div>
    </motion.div>
  );
};

export default MessageBubble;