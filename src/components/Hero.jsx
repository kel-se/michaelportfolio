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
} from "react-icons/fa";

import {
  SiGmail,
  SiMysql,
  SiVite,
  SiNpm,
  SiMongodb,
  SiExpress,
  SiKotlin,
  SiAndroidstudio,
  SiFirebase
} from "react-icons/si";

import { DiVisualstudio } from "react-icons/di";
import { MdVerified } from "react-icons/md";

const SKILLS_LIST = [
  { name: "HTML5", icon: FaHtml5 },
  { name: "CSS3", icon: FaCss3Alt },
  { name: "JavaScript", icon: FaJs },
  { name: "React.js", icon: FaReact },
  { name: "Node.js", icon: FaNodeJs },
  { name: "Express.js", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Java", icon: FaJava },
  { name: "Kotlin", icon: SiKotlin },
  { name: "Android Studio", icon: SiAndroidstudio },
  { name: "MySQL", icon: SiMysql },
  { name: "VS Code", icon: DiVisualstudio },
  { name: "Vite", icon: SiVite },
  { name: "npm", icon: SiNpm },
  { name: "GitHub", icon: FaGithub },
  { name: "Firebase", icon: SiFirebase },
];

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        
        {/* LEFT SIDE: Image */}
        <div className="hero-image">
          <img src={profile} alt="Portrait of Michael Kel" />
          <span className="wave" aria-hidden="true">👋</span>
        </div>

        {/* RIGHT SIDE: Text & Info */}
        <div className="hero-text">
          <h1 className="hero-title">
            HELLO, I'M <span>KEL</span>
            <span className="verified-badge" aria-hidden="true" title="Verified Developer">
              <MdVerified className="hero-verified-icon" />
            </span>
          </h1>

          <p className="subtitle subtitle-primary">
            Software Engineer | Aspiring LLM Engineer
          </p>
          <p className="subtitle subtitle-secondary">
            BSIT Student | Web & Android Developer
          </p>

          <p className="description">
            BSIT student specializing in Full-Stack development and IoT (Internet of Things) solutions. I build modern web and mobile applications using the MERN stack, while also diving into embedded systems. My hands-on experience includes writing firmware for microcontrollers like the ESP32 and Arduino, allowing me to bridge the gap between software development and hardware connectivity.
          </p>

          <div className="skills-block">
            <p className="skills-title">Languages & Tools</p>

            <div className="skills-grid">
              {SKILLS_LIST.map(({ name, icon: IconComponent }) => (
                <div key={name} className="skill-item">
                  <span className="skill-icon" aria-hidden="true">
                    <IconComponent />
                  </span>
                  <span className="skill-name">{name}</span>
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
                href="#"
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

            <button
              className="btn"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn more about Kel
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
