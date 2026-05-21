import HeroClient from "./components/HeroClient";
import About from "./components/About";
import BackgroundGlow from "./components/BackgroundGlow";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import HomeShell from "./components/HomeShell";
import ClientOnly from "./components/ClientOnly";

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
            <Contact />
          </div>
        </main>
      </ClientOnly>
    </HomeShell>
  );
}
