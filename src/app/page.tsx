import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Awards from "@/components/Awards";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollHandler from "@/components/ScrollHandler";

export default function Home() {
  return (
    <main>
      <ScrollHandler />
      <Header />
      <Hero />
      <About />
      <Process />
      <Projects />
      <Skills />
      <Awards />
      <Contact />
      <Footer />
    </main>
  );
}
