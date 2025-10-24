import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo, useState, useEffect } from 'react';

interface HeroProps {
  name?: string;
  titleLeft?: string;
  titleRight?: string;
  subtitle?: string;
  imageSrc?: string;
  backImageSrc?: string;
  aboutText?: string;
  skills?: string[];
}

export default function Hero({
  name = 'Eseyin Emmanuel',
  titleLeft = 'SOFTWARE',
  titleRight = 'DEVELOPER',
  subtitle = "I'm a Nigeria-based software developer.",
  imageSrc = '/emma.png',
  backImageSrc = '/arther.png',
  aboutText,
  skills,
}: HeroProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // MOBILE-ONLY STRICT (<640px)
  const isStrictMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640;
  }, []);

  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start center', 'end start'] });

  // Desktop-only transforms
  const rotY = useMemo(
    () => !isStrictMobile ? useTransform(scrollYProgress, [0.367, 1.14, 6], [0, 460, 480]) : 0,
    [isStrictMobile, scrollYProgress]
  );
  const moveX = useMemo(
    () => !isStrictMobile ? useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-610, 150, 300, 350]) : 0,
    [isStrictMobile, scrollYProgress]
  );
  const moveY = useMemo(
    () => !isStrictMobile ? useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 800]) : 0,
    [isStrictMobile, scrollYProgress]
  );
  const scale = useMemo(
    () => !isStrictMobile ? useTransform(scrollYProgress, [0, 0.9, 2], [1, 0.9, 1]) : 1,
    [isStrictMobile, scrollYProgress]
  );

  // Mobile Auto-Flip State
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!isStrictMobile) return;
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 4000); // 4s interval
    return () => clearInterval(interval);
  }, [isStrictMobile]);

  // Image error fallbacks
  const [imgError, setImgError] = useState(false);
  const [backImgError, setBackImgError] = useState(false);

  const container: Variants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }), []);
  const itemUp: Variants = useMemo(() => ({
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  }), []);

  const aboutTextContent = aboutText || "I'm passionate about building beautiful, functional web applications. With a strong foundation in modern web technologies and a keen eye for design, I strive to deliver solutions that are both technically robust and visually engaging.";
  const skillsList = skills || [
    "JavaScript","TypeScript","React","Next.js","Node.js","CSS","Tailwind CSS",
    "Framer Motion","UI/UX","Git","REST APIs"
  ];

  return (
    <section className="relative w-full lg:py-0 md:py-0 overflow-hidden" aria-label="Hero Section">
      {/* neon dot top-right */}
      <span className="pointer-events-none absolute right-4 top-6 inline-flex h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_24px_4px_rgba(163,230,53,0.6)]" aria-hidden="true" />

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 md:grid-cols-3">
        
        {/* Left */}
        <motion.div variants={itemUp} className="order-2 md:order-1">
          <p className="mb-2 text-sm tracking-[0.2em] text-neutral-300">{name}</p>
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl">{titleLeft}</h1>
        </motion.div>

        {/* Center Card */}
        <motion.div variants={itemUp} className="order-1 mx-auto md:order-2 relative z-10">
          <div className="[perspective:1200px]">
            <motion.div
              ref={cardRef}
              style={{
                rotateY: isStrictMobile ? (isFlipped ? 180 : 0) : rotY,
                x: moveX,
                y: moveY,
                scale: scale,
                transition: isStrictMobile ? 'transform 0.6s ease' : undefined
              }}
              className="relative h-[360px] w-[260px] md:h-[440px] md:w-[320px] rounded-2xl border border-neutral-800 bg-neutral-900 [transform-style:preserve-3d] shadow-2xl"
            >
              {/* Front */}
              <img
                src={imgError ? '/fallback.png' : imageSrc}
                alt="Front"
                className="absolute inset-0 h-full w-full rounded-2xl object-cover [backface-visibility:hidden]"
                onError={() => setImgError(true)}
              />

              {/* Back */}
              <div
                className="absolute inset-0 h-full w-full rounded-2xl object-cover [backface-visibility:hidden] flex items-center justify-center"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <img
                  src={backImgError ? '/fallback.png' : backImageSrc}
                  alt="Back"
                  className="absolute inset-0 h-full w-full rounded-2xl object-cover"
                  onError={() => setBackImgError(true)}
                />
                {/* Center Badge Overlay */}
                <div className="relative z-10 px-3 py-2 rounded-lg bg-neutral-900/60 backdrop-blur-md border border-lime-400/40 text-center">
                  <p className="text-sm font-semibold text-lime-400">{name}</p>
                  <p className="text-[0.65rem] uppercase tracking-wide text-neutral-300">Software Developer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div variants={itemUp} className="order-3 text-right">
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl">{titleRight}</h1>
          <p className="mt-3 text-sm text-neutral-300 md:pl-10 md:text-base">{subtitle}</p>
        </motion.div>
      </motion.div>

      {/* Embedded services-style content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 px-4 md:mt-14 md:grid-cols-2 md:items-start relative"
      >
        <motion.div variants={itemUp}>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">WHAT I CAN DO FOR YOU</h2>
          <p className="mt-3 max-w-prose text-neutral-300">
            As a software developer, I craft performant, accessible web experiences that connect deeply and spark creativity.
          </p>
          <motion.ul
            className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {['WEBSITE DEVELOPMENT', 'APP DEVELOPMENT', 'AI MODELLING', 'E-COMMERCE SOLUTIONS'].map((label, i) => (
              <motion.li
                key={label}
                className="group flex items-center justify-between py-4"
                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
              >
                <span className="text-lg font-semibold tracking-wide">{i + 1}. {label}</span>
                <span className="text-neutral-400 transition-transform group-hover:translate-x-1">›</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div 
          variants={itemUp} 
          className="hidden md:flex items-center justify-center min-h-[300px] relative"
        >
          <div className="text-center text-neutral-500">
            <motion.div
              className="w-16 h-16 border-2 border-dashed border-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center"
              animate={{ borderColor: ["#404040", "#525252", "#404040"], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-neutral-600 text-2xl">↓</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* About Me Section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 px-4 md:mt-20 md:grid-cols-2 md:items-start relative"
      >
        <motion.div variants={itemUp} className="relative">
          <div className="relative z-20">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl mb-6">ABOUT ME</h2>

            <div className="space-y-4">
              <p className="text-neutral-300 leading-relaxed">{aboutTextContent}</p>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-lime-400">Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 text-sm bg-neutral-800 text-neutral-200 rounded-full border border-neutral-700 hover:border-lime-400/50 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.button
                className="mt-6 px-6 py-3 bg-lime-400 text-neutral-900 font-semibold rounded-lg hover:bg-lime-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/contact'}
              >
                Let's Work Together
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
