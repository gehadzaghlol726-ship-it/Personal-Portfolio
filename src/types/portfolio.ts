export type ProjectCategory = 'Web' | 'Mobile' | 'IoT & Hardware' | 'Networking';

export interface ProfileData {
  firstName: string;
  lastName: string;
  roleTitle: string;
  bio: string;
  aboutSummary: string;
  education: string;
  institution: string;
  educationDuration: string;
  location: string;
  languages: string;
  strengths: string;
  availability: string;
  email: string;
  phone: string;
  whatsapp: string;
  githubUrl: string;
  linkedinUrl: string;
  portraitUrl: string;
  cvUrl: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  focus: string;
  category: 'Mobile' | 'Web' | 'Hardware & IoT' | 'Systems & OS';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  stack: string[];
  year: string;
  repoUrl: string;
  liveUrl: string;
  featured: boolean;
  imageUrl?: string;
}

export type SkillCategory =
  | 'Programming Languages'
  | 'Mobile Development'
  | 'Web Development'
  | 'Databases'
  | 'Networking'
  | 'Tools & Hardware';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioState {
  profile: ProfileData;
  certifications: CertificationItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  posts: BlogPost[];
  messages: ContactMessage[];
}
