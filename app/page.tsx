import HeroClient from "./components/HeroClient";
import About from "./components/About";
import BackgroundGlow from "./components/BackgroundGlow";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import HomeShell from "./components/HomeShell";
import ClientOnly from "./components/ClientOnly";
import Certificate from "./components/Certificate";

export default function Home() {
  return (
    <HomeShell>
      <ClientOnly>
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-white">
          <BackgroundGlow />
          <div className="relative">
            <HeroClient />
            <About />
            <TechStack />
            <Projects />
            <Certificate />
            <Contact />
          </div>
        </main>
      </ClientOnly>
    </HomeShell>
  );
}
