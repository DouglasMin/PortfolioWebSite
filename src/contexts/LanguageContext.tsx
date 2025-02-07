import React, { createContext, useContext, useState } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    // Navigation
    'nav.home': '홈',
    'nav.projects': '프로젝트',
    'nav.about': '소개',
    'nav.contact': '연락처',
    
    // Hero Section
    'hero.greeting': '안녕하세요',
    'hero.name': '저는 홍길동입니다',
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
    
    // Experience Section
    'experience.title': '경력',
    'experience.senior.title': '시니어 개발자',
    'experience.senior.company': '테크 기업',
    'experience.senior.period': '2020 - 현재',
    'experience.senior.description': 'React와 Node.js를 활용한 웹 애플리케이션 개발 리드',
    'experience.fullstack.title': '풀스택 개발자',
    'experience.fullstack.company': '디지털 솔루션즈',
    'experience.fullstack.period': '2018 - 2020',
    'experience.fullstack.description': '다양한 클라이언트 프로젝트 개발 및 유지보수',
    'experience.junior.title': '주니어 개발자',
    'experience.junior.company': '첫 회사',
    'experience.junior.period': '2016 - 2018',
    'experience.junior.description': '반응형 웹사이트 개발',
    
    // Projects Section
    'projects.title': '주요 프로젝트',
    'projects.viewCode': '코드 보기',
    'projects.viewDemo': '데모 보기',
    
    // Contact Section
    'contact.title': '연락하기',
    'contact.info': '연락처 정보',
    'contact.name': '이름',
    'contact.email': '이메일',
    'contact.message': '메시지',
    'contact.send': '메시지 보내기',
    'contact.connect': '연결하기',
    'contact.description': '새로운 기회와 협업에 관심이 있습니다. 연락 주세요!',
    
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
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.greeting': 'Hi',
    'hero.name': "I'm John Doe",
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
    
    // Experience Section
    'experience.title': 'Experience',
    'experience.senior.title': 'Senior Developer',
    'experience.senior.company': 'Tech Corp',
    'experience.senior.period': '2020 - Present',
    'experience.senior.description': 'Led development of web applications using React and Node.js',
    'experience.fullstack.title': 'Full Stack Developer',
    'experience.fullstack.company': 'Digital Solutions',
    'experience.fullstack.period': '2018 - 2020',
    'experience.fullstack.description': 'Developed and maintained various client projects',
    'experience.junior.title': 'Junior Developer',
    'experience.junior.company': 'First Company',
    'experience.junior.period': '2016 - 2018',
    'experience.junior.description': 'Built responsive websites',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.viewCode': 'View Code',
    'projects.viewDemo': 'Live Demo',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.info': 'Contact Information',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.connect': 'Connect with me',
    'contact.description': "I'm always interested in new opportunities and collaborations. Feel free to reach out!",
    
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
  const [language, setLanguage] = useState<Language>('ko');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ko']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
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