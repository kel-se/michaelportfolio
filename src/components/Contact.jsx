import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiFacebook } from "react-icons/fi";
import "../styles/Contact.css";

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/mctorre",
    href: "https://github.com/mctorre8720val-eng",
    icon: FiGithub,
  },
  {
    label: "Email",
    value: "walamuna@email.com",
    href: "#",
    icon: FiMail,
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/walamuna",
    href: "#",
    icon: FiLinkedin,
  },
  {
    label: "Facebook",
    value: "facebook.com/walamuna",
    href: "#",
    icon: FiFacebook,
  },
  {
    label: "Location",
    value: "Quezon City, Metro Manila, Philippines",
    href: "#",
    icon: FiMapPin,
  },
];

const availabilityMessage = "Currently looking for Internship Opportunities)";

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="contact-copy">
          <p className="eyebrow">Get in touch</p>
          <h2>Let&apos;s Connect</h2>
          <p className="contact-description">
            I&apos;m always open to internship opportunities, collaborations, research projects, or simply connecting with fellow developers.
            Feel free to reach out—I&apos;d love to hear from you.
          </p>

          <div className="contact-actions">
            <a href="#" className="contact-primary-btn">
              Send me an Email
            </a>
            <a href="https://github.com/mctorre8720val-eng" className="contact-secondary-btn">
              View GitHub
            </a>
            <a href="#" className="contact-secondary-btn">
              Connect on LinkedIn
            </a>
          </div>

          <div className="availability-badge">
            <span className="availability-dot" />
            {availabilityMessage}
          </div>
        </div>

        <div className="contact-links">
          {contactLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a key={item.label} href={item.href} className={`contact-link-card ${item.primary ? "primary" : ""}`} target="_blank" rel="noreferrer">
                <div className="contact-link-icon">
                  <Icon />
                </div>
                <div>
                  <p className="contact-link-label">{item.label}</p>
                  <p className="contact-link-value">{item.value}</p>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}