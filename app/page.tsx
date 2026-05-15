import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Lab from '@/components/Lab';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#030712' }}>
      <Nav />
      <Hero />
      <Lab />
      <Projects />
      <Skills />
      <About />
      <Contact />
    </main>
  );
}
