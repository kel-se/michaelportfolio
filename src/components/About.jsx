import { 
  FaGraduationCap, 
  FaLaptopCode, 
  FaDatabase, 
  FaProjectDiagram, 
  FaMapMarkerAlt,
  FaSchool
} from "react-icons/fa";
import "../styles/About.css";

export default function About() {
  return (
    <section id="about">
      <h2 className="about-heading">About Me</h2>
      <p>In this section, you will learn about me and my journey as an IT student.</p>
      
      <div className="about-container">
        
        <div className="about-sidebar">
          <div className="about-icons">
            <div><FaGraduationCap /> <span>BSIT Student</span></div>
            <div><FaSchool /> <span>Our Lady of Fatima University</span></div>
            <div><FaLaptopCode /> <span>Backend Developer</span></div>
            <div><FaDatabase /> <span>Database & APIs</span></div>
            <div><FaProjectDiagram /> <span>System Design</span></div>
            <div><FaMapMarkerAlt /> <span>Manila, Philippines</span></div>
          </div>
        </div>

        <div className="about-main">
          <div className="card about-highlight-card">
            <p className="about-bio-text">
              Hi! <strong>I’m Kel</strong>, a fourth-year Information Technology student passionate about software development and technology.
            </p>

            <p className="about-bio-text">
              My interest in programming started when my family got our first computer. What began as curiosity about games and applications grew into a passion for understanding how technology works.
            </p>

            <p className="about-bio-text" style={{ marginBottom: "0px" }}>
              I’ve worked on academic and personal projects involving <strong>frontend development with React, backend development using Node.js and Express, mobile app development with Flutter and Android Studio, and database management with MySQL</strong>. I also have experience with <strong>REST APIs, responsive UI design, and basic software development practices</strong>. I enjoy building practical applications and continuously improving my technical skills.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
