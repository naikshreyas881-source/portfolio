import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { RecruiterSnapshot } from '../components/RecruiterSnapshot';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { LearningProgress } from '../components/LearningProgress';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Education } from '../components/Education';
import { CgpaSection } from '../components/CgpaSection';
import { Journey } from '../components/Journey';
import { CodingProfiles } from '../components/CodingProfiles';
import { Certifications } from '../components/Certifications';
import { Achievements } from '../components/Achievements';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';

export const Home: React.FC = () => {
  const { data } = usePortfolio();
  const visibility = data.settings?.sectionVisibility || {
    about: true,
    skills: true,
    projects: true,
    learning: true,
    experience: true,
    education: true,
    journey: true,
    codingProfiles: true,
    certifications: true,
    achievements: true,
    contact: true,
    recruiterSnapshot: true,
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Hero />
        {visibility.recruiterSnapshot !== false && <RecruiterSnapshot />}
        {visibility.about !== false && <About />}
        {visibility.skills !== false && <Skills />}
        {visibility.learning !== false && <LearningProgress />}
        {visibility.projects !== false && <Projects />}
        {visibility.experience !== false && <Experience />}
        {visibility.education !== false && <Education />}
        {visibility.cgpa !== false && <CgpaSection />}
        {visibility.journey !== false && <Journey />}
        {visibility.codingProfiles !== false && <CodingProfiles />}
        {visibility.certifications !== false && <Certifications />}
        {visibility.achievements !== false && <Achievements />}
        {visibility.contact !== false && <Contact />}
      </main>
      <Footer />
    </div>
  );
};
