import { useState } from "react";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FadeInSection from "./components/FadeInSection";
import GitHubStats from "./components/GitHubStats";

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Loader finishLoading={() => setLoading(false)} />
    );
  }

  return (
    <>
      <Navbar />

      <FadeInSection>
        <Hero />
      </FadeInSection>

      <FadeInSection>
        <About />
      </FadeInSection>

      <FadeInSection>
        <Projects />
        <GitHubStats />
      </FadeInSection>

      <FadeInSection>
        <Achievements />
      </FadeInSection>

      <FadeInSection>
        <Contact />
      </FadeInSection>

      <Footer />
    </>
  );
}