import HeroClient from "./components/HeroClient";
import About from "./components/About";
import BackgroundGlow from "./components/BackgroundGlow";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      <BackgroundGlow />
      <div className="relative">
        <HeroClient/>
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
