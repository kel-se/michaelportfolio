import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Projects.css";

const projects = [
  {
    title: "Dormly",
    description:
      "A dormitory discovery and review platform helping students compare living spaces with confidence.",
    screenshots: ["/Dormly.png", "/Dormly1.png", "/Dormly2.png"],
    techStack: ["React", "Node.js", "Express", "MySQL", "Prisma", "Supabase", "Postman", "Git", "Docker", "CI/CD"],
    github: "https://github.com/mctorre8720val-eng",
    live: "https://dormly-nu.vercel.app/",
  },
  {
    title: "DevTrack",
    description:
      "A productivity workspace for managing development tasks, sprints, and personal progress in one place.",
    screenshots: ["/DevTrack.png","/DevTrack1.png","/DevTrack2.png"],
    techStack: ["React", "TypeScript", "Firebase", "Tailwind", "Git", ],
    github: "https://github.com/mctorre8720val-eng",
    live: "#",
  },
  {
    title: "ScentGuard",
    description:
      "An IoT-inspired concept project focused on intelligent ambient sensing and modern interface design.",
    screenshots: ["/wip.png"],
    techStack: ["Arduino", "ESP32", "Python", "Node.js", "MQTT"],
    github: "https://github.com/mctorre8720val-eng",
    live: "#",
  },
  {
    title: "Clinic Reservation",
    description:
      "A reservation workflow for clinic rooms with clear scheduling and a polished desktop experience.",
    screenshots: ["/wip.png"],
    techStack: ["Java", "Swing", "MySQL", "XAMPP", "NetBeans"],
    github: "https://github.com/mctorre8720val-eng",
    live: "#",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const currentProject = projects[activeIndex];

  const showPrev = () => {
    const nextIndex = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex(nextIndex);
    setImageIndex(0);
  };

  const showNext = () => {
    const nextIndex = (activeIndex + 1) % projects.length;
    setActiveIndex(nextIndex);
    setImageIndex(0);
  };

  const goToProject = (index) => {
    setActiveIndex(index);
    setImageIndex(0);
  };

  const showPrevImage = () => {
    const next = (imageIndex - 1 + currentProject.screenshots.length) % currentProject.screenshots.length;
    setImageIndex(next);
  };

  const showNextImage = () => {
    const next = (imageIndex + 1) % currentProject.screenshots.length;
    setImageIndex(next);
  };

  return (
    <section id="projects">
      <div className="section-heading project-section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Featured Projects</h2>
        <p className="section-copy">
          A curated showcase of projects I’ve built with a modern UI, strong engineering choices, and a focus on real-world use cases.
        </p>
      </div>

      <div className="featured-showcase">
        <motion.div
          className="featured-preview"
          key={currentProject.title}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="preview-frame">
            <div className="preview-toolbar">
              <span />
              <span />
              <span />
            </div>

            <div className="preview-image-shell">
              <motion.img
                key={`${currentProject.title}-${imageIndex}`}
                src={currentProject.screenshots[imageIndex]}
                alt={`${currentProject.title} screenshot ${imageIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {currentProject.screenshots.length > 1 ? (
              <div className="preview-controls">
                <button type="button" className="preview-arrow" onClick={showPrevImage} aria-label="Previous screenshot">
                  ←
                </button>
                <span className="preview-counter">
                  {imageIndex + 1}/{currentProject.screenshots.length}
                </span>
                <button type="button" className="preview-arrow" onClick={showNextImage} aria-label="Next screenshot">
                  →
                </button>
              </div>
            ) : null}
          </div>

          <div className="featured-content">
            <p className="featured-label">Featured Project</p>
            <h3>{currentProject.title}</h3>
            <p className="featured-description">{currentProject.description}</p>

            <div className="tech-stack">
              {currentProject.techStack.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-actions">
              {currentProject.github ? (
                <a href={currentProject.github} className="project-link" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
              {currentProject.live ? (
                <a href={currentProject.live} className="project-link secondary" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>

        <div className="project-controls">
          <div className="project-nav-buttons">
            <button type="button" className="nav-button" onClick={showPrev} aria-label="Previous project">
              ← Prev
            </button>
            <button type="button" className="nav-button" onClick={showNext} aria-label="Next project">
              Next →
            </button>
          </div>

          <div className="pagination-dots" role="tablist" aria-label="Project selection">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => goToProject(index)}
                aria-label={`Show ${project.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}