import React, { useEffect, useState, useRef } from 'react';
import { Heart, Eye } from 'lucide-react';

const API_URL = 'https://aaw3xmuyeln3b2cpsk4q7s2nbm0owupl.lambda-url.ap-northeast-2.on.aws';

const LikeVisitCounter: React.FC = () => {
  const [likes, setLikes] = useState<number>(0);
  const [visits, setVisits] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    // 첫 마운트에서만 실행
    if (isFirstMount.current) {
      isFirstMount.current = false;
      // 컴포넌트 마운트 시 방문자 수 증가
      incrementVisits();
      // 좋아요 수 조회
      fetchLikes();
      // 로컬 스토리지에서 좋아요 상태 확인
      const liked = localStorage.getItem('portfolio_liked') === 'true';
      setIsLiked(liked);
    }
  }, []);

  const incrementVisits = async () => {
    try {
      const response = await fetch(`${API_URL}/visit`, {
        method: 'GET',
      });
      const data = await response.json();
      setVisits(data.visits);
    } catch (error) {
      console.error('Error incrementing visits:', error);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await fetch(`${API_URL}/likes`, {
        method: 'GET',
      });
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const handleLike = async () => {
    if (isLiked) return; // 이미 좋아요를 눌렀다면 리턴

    try {
      const response = await fetch(`${API_URL}/like`, {
        method: 'POST',
      });
      const data = await response.json();
      setLikes(data.likes);
      setIsLiked(true);
      localStorage.setItem('portfolio_liked', 'true');
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-4 z-50">
      <div className="flex items-center space-x-2 glass-button px-4 py-2">
        <Eye className="w-4 h-4 text-[var(--text-secondary)]" />
        <span className="text-sm text-[var(--text-secondary)]">{visits}</span>
      </div>
      <button
        onClick={handleLike}
        disabled={isLiked}
        className={`flex items-center space-x-2 glass-button px-4 py-2 transition-all duration-300 ${
          isLiked ? 'cursor-default' : ''
        }`}
      >
        <Heart
          className={`w-4 h-4 ${
            isLiked ? 'fill-pink-500 text-pink-500' : 'text-[var(--text-secondary)]'
          } transition-colors duration-300`}
        />
        <span className="text-sm text-[var(--text-secondary)]">{likes}</span>
      </button>
    </div>
  );
};

export default LikeVisitCounter; 