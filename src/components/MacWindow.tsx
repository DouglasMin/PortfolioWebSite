import React from 'react';
import { motion } from 'framer-motion';

interface MacWindowProps {
  children: React.ReactNode;
  title?: string;
}

const MacWindow: React.FC<MacWindowProps> = ({ children, title = 'Messages' }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-[#f0f0f0] dark:bg-[#2c2c2c] rounded-lg shadow-xl overflow-hidden">
        {/* Window Chrome */}
        <div className="h-12 bg-[#e8e8e8] dark:bg-[#3a3a3a] flex items-center px-4 relative">
          {/* Traffic Light Buttons */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a02c]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#24aa36]"></div>
          </div>
          {/* Window Title */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-[#4d4d4d] dark:text-[#b8b8b8] font-medium">
            {title}
          </div>
        </div>
        
        {/* Content Area */}
        <div className="bg-[#ffffff] dark:bg-[#1e1e1e] p-6">
          <div className="max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacWindow;