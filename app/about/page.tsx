import type { Metadata } from 'next';
import AboutPageContent from '@/components/about/about-page-content';

export const metadata: Metadata = {
  title: 'About Me | Mohammed Elalimy',
  description:
    'Meet Mohammed Mostafa Elalimy — software engineer and full-stack JavaScript developer. Explore his journey, experience, education, projects, tech stack and certifications.'
};

export default function AboutPage() {
  return <AboutPageContent />;
}
