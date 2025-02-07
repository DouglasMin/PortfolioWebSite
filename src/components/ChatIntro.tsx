import React from 'react';
import MessageBubble from './MessageBubble';
import MacWindow from './MacWindow';
import { useLanguage } from '../contexts/LanguageContext';

const ChatIntro: React.FC = () => {
  const { t } = useLanguage();
  
  const messages = [
    { text: t('intro.greeting'), delay: 0 },
    { text: t('intro.name'), delay: 1 },
    { text: t('intro.welcome'), delay: 2 },
    { text: t('intro.role'), delay: 3 },
    { text: t('intro.passion'), delay: 4 }
  ];

  return (
    <MacWindow title="Portfolio Messages">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            message={message.text}
            delay={message.delay}
          />
        ))}
      </div>
    </MacWindow>
  );
}

export default ChatIntro;