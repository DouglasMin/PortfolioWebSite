import React, { useEffect } from 'react';

const NativeAd: React.FC = () => {
  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    const existingScript = document.querySelector(
      'script[src="//pl28189281.effectivegatecpm.com/cc9251c17175ebbbb319660f812d8d37/invoke.js"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = '//pl28189281.effectivegatecpm.com/cc9251c17175ebbbb319660f812d8d37/invoke.js';
      
      const container = document.getElementById('container-cc9251c17175ebbbb319660f812d8d37');
      if (container && container.parentNode) {
        container.parentNode.insertBefore(script, container);
      }
    }
  }, []);

  return (
    <div className="py-8 sm:py-12 flex justify-center items-center">
      <div 
        id="container-cc9251c17175ebbbb319660f812d8d37" 
        className="max-w-full"
      />
    </div>
  );
};

export default NativeAd;

