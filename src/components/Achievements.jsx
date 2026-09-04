import { motion } from "framer-motion";
import "../styles/Achievements.css";

const achievements = [
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "2025",
    image: "/CCNA Introduction to Networks.png",
    description:
      "A strong foundation in networking concepts, IP connectivity, routing fundamentals, and core switching principles.",
    skills: ["Networking", "IPv4", "IPv6", "Routing", "Switching"],
  },
  {
    title: "Programming Essentials in Python",
    issuer: "Cisco Networking Academy",
    date: "2025",
    image: "/PE1.png",
    description:
      "Developed confidence in Python syntax, logic flow, and algorithmic thinking through hands-on coding exercises.",
    skills: ["Python", "Logic", "Algorithms", "Automation"],
  },
  {
    title: "Programming Essentials in Python",
    issuer: "Cisco Networking Academy",
    date: "2026",
    image: "/PE2.png",
    description:
      "Built a solid understanding of structured programming, memory management, and low-level problem solving in Python.",
    skills: ["Python", "Programming", "Memory", "Problem Solving"],
  },
  {
    title: "ITS Certificate",
    issuer: "Cisco Networking Academy",
    date: "2025",
    image: "/ITS.png",
    description:
      "Built a stronger base in IT support concepts, troubleshooting, and practical digital systems knowledge.",
    skills: ["IT Support", "Troubleshooting", "Systems", "Technology"],
  },
  {
    title: "Endpoint Security",
    issuer: "Cisco Networking Academy",
    date: "2025",
    image: "/Endpoint Security.png",
    description:
      "Explored essential endpoint protection practices, threat awareness, and device-level security hardening strategies.",
    skills: ["Cybersecurity", "Security", "Linux", "Threats"],
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="achievements-section">
      <div className="section-heading">
        <p className="eyebrow">Recognition</p>
        <h2>Achievements & Certifications</h2>
        <p className="section-copy">
          A growing list of milestones that reflect my curiosity, consistency, and commitment to building real-world skills.
        </p>
      </div>

      <div className="featured-showcase">
        {achievements.map((achievement, index) => (
          <motion.article
            key={achievement.title}
            className="achievement-item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.03 }}
          >
            <div className="achievement-image-wrap">
              <img src={achievement.image} alt={`${achievement.title} certificate`} loading="lazy" />
            </div>

            <div className="achievement-content">
              <div className="achievement-title-row">
                <h3>{achievement.title}</h3>
                <span className="achievement-date">{achievement.date}</span>
              </div>

              <div className="achievement-meta">
                <span>{achievement.issuer}</span>
              </div>

              {achievement.description ? <p className="achievement-description">{achievement.description}</p> : null}

              {achievement.skills?.length ? (
                <div className="tech-stack">
                  {achievement.skills.map((skill) => (
                    <span key={skill} className="tech-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
