import React from 'react';
import { motion } from 'framer-motion';

interface MessageBubbleProps {
  message: string;
  delay: number;
  sender?: 'me' | 'other';
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, delay, sender = 'me' }) => {
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
      className={`message-bubble ${sender}`}
    >
      {message}
    </motion.div>
  );
};

export default MessageBubble;