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
        <HeroClient
          // name="Fawwaz"
          // highlight="Hirogest"
          // subtitle="Frontend Developer"
        />
        <About />
        <TechStack />
        <Projects />
        <Contact
          // email="fawwaz@example.com"
          // github="https://github.com/username"
          // linkedin="https://www.linkedin.com/in/username"
        />
      </div>
    </main>
  );
}
