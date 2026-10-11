import { 
  FaGraduationCap, 
  FaLaptopCode, 
  FaDatabase, 
  FaProjectDiagram, 
  FaMapMarkerAlt,
  FaSchool
} from "react-icons/fa";
import "../styles/About.css";

const QUICK_FACTS = [
  { icon: FaGraduationCap, text: "BSIT Senior Student" },
  { icon: FaSchool, text: "Our Lady of Fatima University" },
  { icon: FaLaptopCode, text: "Backend & Mobile Developer" },
  { icon: FaDatabase, text: "REST APIs & Databases" },
  { icon: FaProjectDiagram, text: "System Architecture" },
  { icon: FaMapMarkerAlt, text: "Manila, Philippines" },
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-heading">
        <p className="eyebrow">Background</p>
        <h2>About Me</h2>
        <p className="section-copy">
          An overview of my academic background, technical focus, and programming journey.
        </p>
      </div>

      <div className="about-container">
        
        <div className="about-sidebar">
          <div className="about-facts-list">
            {QUICK_FACTS.map(({ icon: IconComponent, text }) => (
              <div key={text} className="about-fact-item">
                <span className="about-fact-icon" aria-hidden="true">
                  <IconComponent />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-main">
          <div className="about-highlight-card">
            <p className="about-bio-text">
              Hi! <strong>I’m Kel</strong>, a fourth-year Information Technology student passionate about software development and technology.
            </p>

            <p className="about-bio-text">
              My interest in programming started when my family got our first computer. What began as curiosity about games and applications grew into a passion for understanding how technology works.
            </p>

            <p className="about-bio-text" style={{ marginBottom: "0" }}>
              I’ve worked on academic and personal projects involving <strong>frontend development with React, backend development using Node.js and Express, mobile app development with Flutter and Android Studio, and database management with MySQL</strong>. I also have experience with <strong>REST APIs, responsive UI design, and basic software development practices</strong>. I enjoy building practical applications and continuously improving my technical skills.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
