import React from 'react';

interface MacWindowProps {
  children: React.ReactNode;
  title?: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ children, title = 'Messages' }) => {
  return (
    <div className="max-w-2xl mx-auto message-window">
      {/* Window Chrome */}
      <div className="window-header h-12 flex items-center px-4 relative">
        {/* Traffic Light Buttons */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a02c]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24aa36]" />
        </div>
        {/* Window Title */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-600 dark:text-gray-300 font-medium">
          {title}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="window-content p-6">
        <div className="max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MacWindow;