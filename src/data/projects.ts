import { Project } from '../types/project';

// Replace this data with your actual projects
export const projects: Project[] = [
  {
    id: 'seah-project',
    title: {
      ko: '압연재 출하공정 AI 기반 관리 시스템',
      en: 'AI-based Rolling Stock Shipping Process Management System'
    },
    description: {
      ko: '대학-기업 연계 프로젝트로서 AI 기술을 활용하여 압연재 출하공정의 효율성을 극대화하는 시스템 개발. 실시간 데이터 분석과 예측 모델을 통해 공정 최적화 달성',
      en: 'Developed an AI-powered system to maximize efficiency in rolling stock shipping processes as part of a university-industry collaboration project. Achieved process optimization through real-time data analysis and predictive modeling'
    },
    period: '2024.03 - 2024.06',
    role: {
      ko: 'PM, TeamLead',
      en: 'PM, TeamLead'
    },
    company: {
      ko: '세아베스틸',
      en: 'SeAH Besteel'
    },
    links: {
      article: 'https://www.cbiz.kr/news/articleView.html?idxno=27551'
    },
    tags: ['AI', 'Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
    featured: true
  },
  {
    id: 'purdue-project',
    title: {
      ko: 'AI & UAV 기반 스마트 골프볼 회수 시스템',
      en: 'Smart Golf Ball Recovery System using AI & UAV'
    },
    description: {
      ko: '드론과 AI 기술을 결합하여 골프장에서의 분실 골프공을 자동으로 탐지하고 수거하는 혁신적인 시스템 개발. 컴퓨터 비전과 딥러닝 알고리즘을 활용한 실시간 객체 인식 구현',
      en: 'Developed an innovative system that combines drone technology and AI to automatically detect and collect lost golf balls on golf courses. Implemented real-time object detection using computer vision and deep learning algorithms'
    },
    period: '2023.09 - 2023.12',
    role: {
      ko: '학부 연구생 인턴',
      en: 'Undergraduate Researcher Intern'
    },
    company: {
      ko: '퍼듀대학교 (Purdue University)',
      en: 'Purdue University'
    },
    links: {
      paper: '/Lost_and_Found.pdf'
    },
    tags: ['AI', 'Computer Vision', 'UAV', 'Python', 'YOLOv8'],
    featured: true
  }
];