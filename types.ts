
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'AI' | 'Design' | 'Visuals';
}

export interface Project {
  id: string;
  title: string;
  client: string;
  images: string[];
  previewImageIndex: number;
  category: string; // Legacy field for grouping if needed
  categories?: string[]; // New: Multiple tags
  shortDescription: string;
  longDescription: string;
  year: string;
}

export interface LegalContent {
  impressum: string;
  datenschutz: string;
}

export enum Page {
  Home = 'home',
  Portfolio = 'portfolio',
  About = 'about',
  Contact = 'contact',
  ServiceKI = 'service-ki',
  ServiceWeb = 'service-web',
  ServicePrint = 'service-print',
  ServiceMedia = 'service-media',
  ProjectDetail = 'project-detail',
  Admin = 'admin',
  Impressum = 'impressum',
  Datenschutz = 'datenschutz'
}
