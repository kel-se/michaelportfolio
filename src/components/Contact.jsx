import { motion } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiFacebook } from "react-icons/fi";
import "../styles/Contact.css";

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/kel-se",
    href: "https://github.com/kel-se",
    icon: FiGithub,
  },
  {
    label: "Email",
    value: "michael.kel@email.com",
    href: "mailto:michael.kel@email.com",
    icon: FiMail,
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/michael-kel",
    href: "https://www.linkedin.com",
    icon: FiLinkedin,
  },
  {
    label: "Facebook",
    value: "facebook.com/michael.kel",
    href: "https://www.facebook.com",
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
            <a href="mailto:michael.kel@email.com" className="contact-primary-btn" aria-label="Send an email to Michael Kel">
              Send me an Email
            </a>
            <a href="https://github.com/kel-se" className="contact-secondary-btn" target="_blank" rel="noreferrer noopener" aria-label="Open Michael Kel's GitHub profile in a new tab">
              View GitHub
            </a>
            <a href="https://www.linkedin.com" className="contact-secondary-btn" target="_blank" rel="noreferrer noopener" aria-label="Open LinkedIn in a new tab">
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
              <a key={item.label} href={item.href} className={`contact-link-card ${item.primary ? "primary" : ""}`} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined} aria-label={`${item.label}: ${item.value}`}>
                <div className="contact-link-icon" aria-hidden="true">
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
