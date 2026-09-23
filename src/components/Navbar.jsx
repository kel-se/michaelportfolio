import { FaDownload } from "react-icons/fa";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsNavVisible(!isScrollingDown || currentScrollPos < 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav className={isNavVisible ? "" : "nav-hidden"}>
      
      <div className="logo" style={{ fontSize: "24px", fontWeight: "bold" }} >
        <span style={{ color: "#3b82f6" }}>SWE</span> Michael
      </div>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#github-contributions">Contribution Activity</a></li>
        <li><a href="#achievements">Achievements</a></li>
        <li><a href="#contact">Contact</a></li>

        <li>
          <a
            href="/resume.pdf"
            download="Michael_Resume.pdf"
            className="btn nav-cta"
          >
            <span>Resume</span>
            <FaDownload size={14} style={{ display: "inline-block" }} />
          </a>
        </li>
      </ul>
    </nav>
  );
}