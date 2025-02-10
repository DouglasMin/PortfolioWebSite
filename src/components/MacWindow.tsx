import React from 'react';

interface MacWindowProps {
  children: React.ReactNode;
  title?: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ children, title = 'Messages' }) => {
  return (
    <div className="max-w-[95%] sm:max-w-2xl mx-auto message-window">
      {/* Window Chrome */}
      <div className="window-header h-8 sm:h-12 flex items-center px-3 sm:px-4 relative bg-[var(--bg-tertiary)] rounded-t-lg">
        {/* Traffic Light Buttons */}
        <div className="flex space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e] border border-[#d4a02c]" />
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840] border border-[#24aa36]" />
        </div>
        {/* Window Title */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
          {title}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="window-content p-3 sm:p-6 bg-[var(--bg-secondary)] rounded-b-lg">
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MacWindow;