import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

// 네비게이션 섹션에 있는 모든 가능한 값들을 유니온 타입으로 정의
type NavSection = 'home' | 'skills' | 'experience' | 'awards' | 'education' | 'certifications' | 'projects';

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
  | 'skills.title'
  | 'skills.frontend'
  | 'skills.backend'
  | 'skills.database'
  | 'skills.architecture'
  | 'skills.testing'
  | 'skills.frameworks'
  | 'experience.title'
  | 'experience.senior.title'
  | 'experience.senior.company'
  | 'experience.senior.period'
  | 'experience.senior.description'
  | 'projects.title'
  | 'projects.viewCode'
  | 'projects.viewDemo'
  | 'lang.toggle'
  | 'intro.greeting'
  | 'intro.name'
  | 'intro.welcome'
  | 'intro.role'
  | 'intro.passion';

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
    
    // Hero Section
    'hero.greeting': '안녕하세요 👋',
    'hero.name': '저는 민동익입니다',
    'hero.role.1': '풀스택 개발자입니다',
    'hero.role.2': '데브옵스 엔지니어입니다',
    'hero.role.3': '클라우드 아키텍트입니다',
    'hero.role.4': 'UI/UX 디자이너입니다',
    'hero.description': '새로운 기술과 도전을 사랑하는 개발자입니다',
    'hero.viewProjects': '프로젝트 보기',
    
    // Skills Section
    'skills.title': '기술 스택',
    'skills.frontend': '프론트엔드',
    'skills.backend': '백엔드',
    'skills.database': '데이터베이스',
    'skills.architecture': '아키텍처',
    'skills.testing': '테스팅',
    'skills.frameworks': '프레임워크',
    
    // Experience Section
    'experience.title': '경력',
    'experience.senior.title': '풀스택 개발자',
    'experience.senior.company': '(주)에이아이네이션',
    'experience.senior.period': '2024.10 - 현재',
    'experience.senior.description': 'React와 Node.js를 활용한 웹 애플리케이션 개발',
    
    // Projects Section
    'projects.title': '주요 프로젝트',
    'projects.viewCode': '코드 보기',
    'projects.viewDemo': '데모 보기',
    
    // Language Toggle
    'lang.toggle': '한/영',

    // Intro Section
    'intro.greeting': '안녕하세요 👋',
    'intro.name': '저는 민동익입니다',
    'intro.welcome': '제 포트폴리오에 오신 것을 환영합니다',
    'intro.role': '저는 풀스택 개발자이며 새로운 기술을 탐구하는 것을 좋아합니다',
    'intro.passion': '사용자 경험을 개선하고 혁신적인 솔루션을 만드는 것이 제 열정입니다'
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
    
    // Hero Section
    'hero.greeting': 'Hi there 👋',
    'hero.name': "I'm Dongik (Douglas) Min",
    'hero.role.1': 'I am a Full Stack Developer',
    'hero.role.2': 'I am a DevOps Engineer',
    'hero.role.3': 'I am a Cloud Architect',
    'hero.role.4': 'I am a UI/UX Enthusiast',
    'hero.description': 'A developer who loves new technologies and challenges',
    'hero.viewProjects': 'View Projects',
    
    // Skills Section
    'skills.title': 'Tech Stack',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.database': 'Database',
    'skills.architecture': 'Architecture',
    'skills.testing': 'Testing',
    'skills.frameworks': 'Frameworks',
    
    // Experience Section
    'experience.title': 'Experience',
    'experience.senior.title': 'Full Stack Developer',
    'experience.senior.company': 'AINation Inc.',
    'experience.senior.period': '2024.10 - Present',
    'experience.senior.description': 'Web application development using React and Node.js',
    
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
    'intro.role': "I'm a Full Stack Developer who loves exploring new technologies",
    'intro.passion': 'My passion is creating innovative solutions and improving user experiences'
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