import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 3, suffix: "+", label: "Major projects" },
  { value: 10, suffix: "+", label: "Technologies used" },
  { value: 1, suffix: "", label: "Full-stack SaaS system" },
  { value: 1, suffix: "", label: "Android application" },
  { value: 5, suffix: "+", label: "Recent GitHub commits" },
];

function AnimatedNumber({ value, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId;
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(progress * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 sm:py-32">
      <div className="section-shell">
        <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="theme-card p-10 sm:p-16 shadow-2xl shadow-slate-100"
      >
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-blue-600">Performance</p>
            <h2 className="theme-heading mt-6 text-3xl font-bold sm:text-4xl">Building with measurable impact.</h2>
          </div>
          <p className="theme-muted max-w-md text-sm leading-relaxed">A quantitative overview of my technical contributions and consistency in delivering software solutions.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="theme-panel rounded-3xl p-8 border-slate-100 bg-white text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-100">
              <p className="theme-heading text-4xl font-black text-blue-600">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="theme-muted mt-3 text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
