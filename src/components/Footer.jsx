import { FiArrowUp } from "react-icons/fi";
import "../styles/Footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-text">
          © 2026 Michael Kel — Full-Stack Developer
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top-btn"
          aria-label="Scroll to top"
        >
          <span>Back to Top</span>
          <FiArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
