import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ScrollProgress from './components/shared/ScrollProgress';

export default function JackPage() {
  return (
    <main style={{ background: 'var(--jk-bg)', overflowX: 'clip' }}>
      <ScrollProgress />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}
