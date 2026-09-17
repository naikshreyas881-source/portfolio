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
import { Journey } from '../components/Journey';
import { CodingProfiles } from '../components/CodingProfiles';
import { Certifications } from '../components/Certifications';
import { Achievements } from '../components/Achievements';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <RecruiterSnapshot />
        <About />
        <Skills />
        <LearningProgress />
        <Projects />
        <Experience />
        <Education />
        <Journey />
        <CodingProfiles />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
