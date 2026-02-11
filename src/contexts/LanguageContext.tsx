import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

// 네비게이션 섹션에 있는 모든 가능한 값들을 유니온 타입으로 정의
type NavSection = 'home' | 'skills' | 'experience' | 'awards' | 'education' | 'certifications' | 'projects' | 'contact' | 'blog';

// 모든 가능한 번역 키를 정의
type TranslationKey =
  | `nav.${NavSection}`
  | 'hero.greeting'
  | 'hero.name'
  | 'hero.role.1'
  | 'hero.role.2'
  | 'hero.role.3'
  | 'hero.role.4'
  | 'hero.description'
  | 'hero.viewProjects'
  | 'hero.resume'
  | 'skills.title'
  | 'skills.frontend'
  | 'skills.backend'
  | 'skills.database'
  | 'skills.architecture'
  | 'skills.testing'
  | 'skills.frameworks'
  | 'experience.title'
  | 'experience.junior.title'
  | 'experience.junior.company'
  | 'experience.junior.period'
  | 'experience.junior.description'
  | 'experience.intern.title'
  | 'experience.intern.company'
  | 'experience.intern.period'
  | 'experience.intern.description'
  | 'experience.seah.title'
  | 'experience.seah.company'
  | 'experience.seah.period'
  | 'experience.seah.description'
  | 'experience.seah.role'
  | 'experience.purdue.title'
  | 'experience.purdue.company'
  | 'experience.purdue.period'
  | 'experience.purdue.description'
  | 'experience.purdue.role'
  | 'projects.title'
  | 'projects.viewCode'
  | 'projects.viewDemo'
  | 'lang.toggle'
  | 'intro.greeting'
  | 'intro.name'
  | 'intro.welcome'
  | 'intro.role'
  | 'intro.passion'
  | 'blog.label'
  | 'blog.title'
  | 'blog.subtitle'
  | 'blog.readMore'
  | 'blog.loading'
  | 'blog.error'
  | 'blog.empty'
  | 'blog.back';

// 번역 객체의 타입을 정의
type TranslationRecord = Record<TranslationKey, string>;

interface LanguageContextType {
  currentLanguage: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const translations: Record<Language, TranslationRecord> = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.skills': '기술 스택',
    'nav.experience': '경력',
    'nav.awards': '수상 내역',
    'nav.education': '학력',
    'nav.certifications': '자격증',
    'nav.projects': '프로젝트',
    'nav.contact': '연락처',
    'nav.blog': '블로그',

    // Hero Section
    'hero.greeting': '안녕하세요 👋',
    'hero.name': "Min's Code Ledger",
    'hero.role.1': '풀스택 개발자입니다',
    'hero.role.2': '데브옵스 엔지니어입니다',
    'hero.role.3': '클라우드 아키텍트입니다',
    'hero.role.4': 'UI/UX 디자이너입니다',
    'hero.description': '새로운 기술과 도전을 사랑하는 개발자입니다',
    'hero.viewProjects': '프로젝트 보기',
    'hero.resume': '이력서',

    // Skills Section
    'skills.title': '기술 스택',
    'skills.frontend': '프론트엔드',
    'skills.backend': '백엔드',
    'skills.database': '데이터베이스',
    'skills.architecture': '아키텍처',
    'skills.testing': '테스팅',
    'skills.frameworks': '프레임워크',

    // Experience Section
    'experience.title': '경력 & 프로젝트',
    'experience.junior.title': '풀스택 개발자',
    'experience.junior.company': '(주)에이아이네이션',
    'experience.junior.period': '2024.10 - 2025.07',
    'experience.junior.description': '🍽️ F&B 상권 분석 플랫폼 "딥비스트로" 기획·개발·배포\n• 공공 API, 지도 데이터, AI 분석 모듈 통합 개발\n• 상권 분석 알고리즘 설계 및 구현\n\n☁️ AWS ECS·CI/CD 기반 인프라 전환\n• 성능 및 안정성 대폭 개선\n• 사용자 피드백 반영한 빠른 개선 사이클 구축\n\n🤖 AI 역량평가 플랫폼 개발\n• 비동기 처리 시스템 구축\n• 자동 보고서 생성 시스템 개발\n• 보고서 작성 자동화로 생산성 대폭 향상',
    'experience.intern.title': '프로덕트 - 개발팀 (인턴)',
    'experience.intern.company': '(주)하이어다이버시티',
    'experience.intern.period': '2024.06 - 2024.08',
    'experience.intern.description': '클라우드 네이티브 환경에서 AI 비자 사진 판독 시스템 구축',
    'experience.seah.title': '압연재 출하공정 AI 기반 관리 시스템',
    'experience.seah.company': '세아베스틸',
    'experience.seah.period': '2024.03 - 2024.06',
    'experience.seah.role': 'PM, TeamLead',
    'experience.seah.description': '대학-기업 연계 프로젝트로서 AI 기술을 활용하여 압연재 출하공정의 효율성을 극대화하는 시스템 개발. 실시간 데이터 분석과 예측 모델을 통해 공정 최적화 달성',
    'experience.purdue.title': 'AI & UAV 기반 스마트 골프볼 회수 시스템',
    'experience.purdue.company': '퍼듀대학교 (Purdue University)',
    'experience.purdue.period': '2023.09 - 2024.01',
    'experience.purdue.role': '연구원',
    'experience.purdue.description': '드론과 AI 기술을 결합하여 골프장에서의 분실 골프공을 자동으로 탐지하고 수거하는 혁신적인 시스템 개발. 컴퓨터 비전과 딥러닝 알고리즘을 활용한 실시간 객체 인식 구현',

    // Projects Section
    'projects.title': '주요 프로젝트',
    'projects.viewCode': '코드 보기',
    'projects.viewDemo': '데모 보기',

    // Language Toggle
    'lang.toggle': '한/영',

    // Intro Section
    'intro.greeting': '안녕하세요 👋',
    'intro.name': "Min's Code Ledger",
    'intro.welcome': '제 포트폴리오에 오신 것을 환영합니다',
    'intro.role': '풀스택 개발자이자 클라우드 네이티브 엔지니어입니다',
    'intro.passion': '최신 기술 기반의 혁신적인 서비스 구축에 열정이 있습니다',

    // Blog
    'blog.label': "Min's Code Ledger",
    'blog.title': "Min's Tech Blog & Portfolio",
    'blog.subtitle': '최신 기술 기반 블로그와 프로젝트 로그를 작성합니다.',
    'blog.readMore': '읽어보기',
    'blog.loading': '블로그 글을 불러오는 중입니다.',
    'blog.error': '블로그를 불러오지 못했습니다.',
    'blog.empty': '아직 게시된 글이 없습니다.',
    'blog.back': '블로그 목록으로'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.awards': 'Awards',
    'nav.education': 'Education',
    'nav.certifications': 'Certifications',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.blog': 'Blog',

    // Hero Section
    'hero.greeting': 'Hi there 👋',
    'hero.name': "I'm Dongik (Douglas) Min",
    'hero.role.1': 'I am a Full Stack Developer',
    'hero.role.2': 'I am a DevOps Engineer',
    'hero.role.3': 'I am a Cloud Architect',
    'hero.role.4': 'I am a UI/UX Enthusiast',
    'hero.description': 'A developer who loves new technologies and challenges',
    'hero.viewProjects': 'View Projects',
    'hero.resume': 'Resume',

    // Skills Section
    'skills.title': 'Tech Stack',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.database': 'Database',
    'skills.architecture': 'Architecture',
    'skills.testing': 'Testing',
    'skills.frameworks': 'Frameworks',

    // Experience Section
    'experience.title': 'Experience & Projects',
    'experience.junior.title': 'Full Stack Developer',
    'experience.junior.company': 'AINation Inc.',
    'experience.junior.period': '2024.10 - 2025.07',
    'experience.junior.description': '🍽️ F&B Market Analysis Platform "DeepBistro"\n• Planned, developed, and deployed comprehensive platform\n• Integrated public APIs, map data, and AI analysis modules\n• Designed and implemented market analysis algorithms\n\n☁️ AWS ECS & CI/CD Infrastructure Transformation\n• Significantly improved performance and stability\n• Established rapid improvement cycles based on user feedback\n• Implemented scalable cloud-native architecture\n\n🤖 AI Competency Assessment Platform\n• Built asynchronous processing systems\n• Developed automated report generation system\n• Achieved significant productivity improvements through automation',
    'experience.intern.title': 'Product - Development Team (Intern)',
    'experience.intern.company': 'Higher Diversity',
    'experience.intern.period': '2024.06 - 2024.08',
    'experience.intern.description': 'Building an AI visa photo recognition system in a cloud native environment',
    'experience.seah.title': 'AI-based Rolling Stock Shipping Process Management System',
    'experience.seah.company': 'SeAH Besteel',
    'experience.seah.period': '2024.03 - 2024.06',
    'experience.seah.role': 'PM, TeamLead',
    'experience.seah.description': 'Developed an AI-powered system to maximize efficiency in rolling stock shipping processes as part of a university-industry collaboration project. Achieved process optimization through real-time data analysis and predictive modeling',
    'experience.purdue.title': 'Smart Golf Ball Recovery System using AI & UAV',
    'experience.purdue.company': 'Purdue University',
    'experience.purdue.period': '2023.09 - 2024.01',
    'experience.purdue.role': 'Researcher',
    'experience.purdue.description': 'Developed an innovative system that combines drone technology and AI to automatically detect and collect lost golf balls on golf courses. Implemented real-time object detection using computer vision and deep learning algorithms',

    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.viewCode': 'View Code',
    'projects.viewDemo': 'Live Demo',

    // Language Toggle
    'lang.toggle': 'KO/EN',

    // Intro Section
    'intro.greeting': 'Hi there 👋',
    'intro.name': "I'm Dongik Min",
    'intro.welcome': 'Welcome to my portfolio',
    'intro.role': 'Full Stack Developer & Cloud Native Engineer',
    'intro.passion': 'Passionate about building innovative services with cutting-edge technologies',

    // Blog
    'blog.label': "Min's Code Ledger",
    'blog.title': "Min's Tech Blog & Portfolio",
    'blog.subtitle': 'Posts synced automatically from Notion.',
    'blog.readMore': 'Read more',
    'blog.loading': 'Loading posts…',
    'blog.error': 'Unable to load the blog.',
    'blog.empty': 'No posts published yet.',
    'blog.back': 'Back to blog'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ko');

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
