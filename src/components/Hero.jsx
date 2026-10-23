import profile from "../assets/profile.jpg";
import "../styles/Hero.css";

import {
  FaGithub,
  FaLinkedin,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaJava,
  FaNodeJs,
  FaCode,
} from "react-icons/fa";

import {
  SiGmail,
  SiMysql,
  SiMongodb,
  SiKotlin,
  SiAndroidstudio,
  SiFirebase,
  SiTypescript,
  SiDotnet,
  SiPostgresql,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { MdVerified } from "react-icons/md";

const SKILL_CATEGORIES = [
  {
    name: "Languages",
    skills: [
      { name: "JavaScript", icon: FaJs },
      { name: "Java", icon: FaJava },
      { name: "Kotlin", icon: SiKotlin },
      { name: "C#", icon: FaCode },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "HTML5", icon: FaHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    name: "Backend & Databases",
    skills: [
      { name: "ASP.NET Core", icon: SiDotnet },
      { name: "Node.js", icon: FaNodeJs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "GitHub", icon: FaGithub },
      { name: "Visual Studio Code", icon: VscVscode },
      { name: "Android Studio", icon: SiAndroidstudio },
    ],
  },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-image">
          <div className="hero-image-frame">
            <img src={profile} alt="Portrait of Michael Kel" />
            <span className="wave" aria-hidden="true">👋</span>
          </div>
        </div>

        <div className="hero-text">
          <div className="hero-intro">
            <h1 className="hero-title">
              HELLO, I'M <span>KEL</span>
              <span className="verified-badge" aria-hidden="true" title="Verified Developer">
                <MdVerified className="hero-verified-icon" />
              </span>
            </h1>

            <p className="subtitle subtitle-primary">
              Software Engineer | Aspiring LLM Engineer
            </p>

            <p className="description">
              I build full-stack web and mobile applications, with a focus on backend systems, REST APIs, authentication, and database-driven experiences.
            </p>

          </div>

          <div className="hero-details">
            <p className="subtitle subtitle-secondary">
              BSIT Student | Web & Android Developer
            </p>

            <div className="skills-block">
              <p className="skills-title">Languages & Tools</p>

              <div className="skills-grid">
                {SKILL_CATEGORIES.map(({ name, skills }) => (
                  <div key={name} className="skills-category">
                    <h3>{name}</h3>
                    <ul className="skills-list">
                      {skills.map(({ name: skillName, icon: IconComponent }) => (
                        <li key={skillName} className="skill-item">
                          <IconComponent className="skill-icon" aria-hidden="true" />
                          <span className="skill-name">{skillName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-contact-group">
              <p className="contact-label">Contact me</p>

              <div className="social-icons">
                <a
                  href="https://github.com/kel-se"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={24} />
                </a>

                <a
                  href="https://www.linkedin.com/in/michael-angelo-torre-068b35439/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={24} />
                </a>

                <a href="#" aria-label="Gmail">
                  <SiGmail size={24} />
                </a>
              </div>
            </div>

            <div className="hero-actions-row hero-cta-row">
              <button
                className="hero-learn-btn"
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn more about Kel →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
