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
          <h2 className="hero-title">
            HELLO, I'M <span>KEL</span>
            <MdVerified className="hero-verified-icon" />
          </h2>

          <h5 className="subtitle">Software Engineer | Aspiring LLM Engineer</h5>
          <h5 className="subtitle">BSIT Student | Web & Android Developer</h5>

          <p className="description">
            BSIT student specializing in Full-Stack development and IoT (Internet of Things) solutions. I build modern web and mobile applications using the MERN stack, while also diving into embedded systems. My hands-on experience includes writing firmware for microcontrollers like the ESP32 and Arduino, allowing me to bridge the gap between software development and hardware connectivity.
          </p>

          <div className="skills-block">
            <p className="skills-title">Languages & Tools</p>

            <div className="skills-grid">
              <div className="skill-item">
                <FaHtml5 />
                <span>HTML5</span>
              </div>

              <div className="skill-item">
                <FaCss3Alt />
                <span>CSS3</span>
              </div>

              <div className="skill-item">
                <FaJs />
                <span>JavaScript</span>
              </div>

              <div className="skill-item">
                <FaReact />
                <span>React.js</span>
              </div>

              <div className="skill-item">
                <FaNodeJs />
                <span>Node.js</span>
              </div>

              <div className="skill-item">
                <SiExpress />
                <span>Express.js</span>
              </div>

              <div className="skill-item">
                <SiMongodb />
                <span>MongoDB</span>
              </div>

              <div className="skill-item">
                <FaJava />
                <span>Java</span>
              </div>

              <div className="skill-item">
                <SiKotlin />
                <span>Kotlin</span>
              </div>

              <div className="skill-item">
                <SiAndroidstudio />
                <span>Android Studio</span>
              </div>

              <div className="skill-item">
                <SiMysql />
                <span>MySQL</span>
              </div>

              <div className="skill-item">
                <DiVisualstudio />
                <span>VS Code</span>
              </div>

              <div className="skill-item">
                <SiVite />
                <span>Vite</span>
              </div>

              <div className="skill-item">
                <SiNpm />
                <span>npm</span>
              </div>

              <div className="skill-item">
                <FaGithub />
                <span>GitHub</span>
              </div>

              <div className="skill-item">
                <SiFirebase />
                <span>Firebase</span>
              </div>
            </div>
          </div>

          <p className="contact-label">Contact me</p>

          <div className="social-icons">
            <a href="https://github.com/mctorre8720val-eng" target="_blank" rel="noreferrer">
              <FaGithub size={26} />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaLinkedin size={26} />
            </a>

            <a href="#">
              <SiGmail size={26} />
            </a>
          </div>

          <button
            className="btn"
            onClick={() => {
              document.getElementById("about").scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn more about Kel
          </button>
        </div>

      </div>
    </section>
  );
}