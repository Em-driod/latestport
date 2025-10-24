import { motion, type Variants, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo, useCallback, useState } from 'react';

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
  backImageSrc = '/rac.jpg',
  aboutText,
  skills,
}: HeroProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start center', 'end start'] });

  // Responsive check (SSR safe)
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Animation transforms for desktop only
  const rotY = useMemo(() => isMobile ? 0 : useTransform(scrollYProgress, [0.4, 1.14, 9], [0, 460, 480]), [isMobile, scrollYProgress]);
  const moveX = useMemo(() => isMobile ? 0 : useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-610, 150, 300, 350]), [isMobile, scrollYProgress]);
  const moveY = useMemo(() => isMobile ? 0 : useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 800]), [isMobile, scrollYProgress]);
  const scale = useMemo(() => isMobile ? 1 : useTransform(scrollYProgress, [0, 0.9, 2], [1, 0.9, 1]), [isMobile, scrollYProgress]);

  // Image loading state for fallback
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

  // Default aboutText and skills if not provided
  const aboutTextContent = aboutText || "I'm passionate about building beautiful, functional web applications. With a strong foundation in modern web technologies and a keen eye for design, I strive to deliver solutions that are both technically robust and visually engaging.";
  const skillsList = skills || [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "CSS",
    "Tailwind CSS",
    "Framer Motion",
    "UI/UX",
    "Git",
    "REST APIs"
  ];
 
  return (
    <section className="relative w-full lg:py-0 md:py-0 overflow-hidden" aria-label="Hero Section">
      {/* neon dot top-right */}
      <span className="pointer-events-none absolute right-4 top-6 inline-flex h-3 w-3 rounded-full bg-green-400 shadow-[0_0_24px_4px_rgba(163,230,53,0.6)]" aria-hidden="true" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 md:grid-cols-3"
      >
        {/* Left: name + big word */}
        <motion.div variants={itemUp} className="order-2 md:order-1">
          <p className="mb-2 text-sm tracking-[0.2em] text-neutral-300" tabIndex={0}>{name}</p>
          <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl" tabIndex={0} aria-label={titleLeft}>
            {titleLeft}
          </h1>
        </motion.div>

        {/* Center: portrait card with enhanced animation */}
        <motion.div variants={itemUp} className="order-1 mx-auto md:order-2 relative z-10">
          <div className="[perspective:1200px]">
            <motion.div
              ref={cardRef}
              style={{ 
                rotateY: rotY, 
                x: moveX, 
                y: moveY,
                scale: scale 
              }}
              className="relative h-[360px] w-[260px] rounded-2xl border border-neutral-800
               bg-neutral-900 md:h-[440px] md:w-[320px] [transform-style:preserve-3d] shadow-2xl"
              aria-label="Profile Card"
            >
              {/* Front face: image */}
              <motion.img
                src={imgError ? '/fallback.png' : imageSrc}
                alt="Portrait of developer"
                className="absolute inset-0 h-full w-full rounded-2xl object-cover [backface-visibility:hidden]"
                loading="lazy"
                onError={() => setImgError(true)}
                aria-label="Front Image"
              />

              {/* Back face: second image */}
              <motion.img
                src={backImgError ? '/fallback.png' : backImageSrc}
                alt="Background image"
                className="absolute inset-0 h-full w-full rounded-2xl object-cover [backface-visibility:hidden]"
                style={{ rotateY: 180 }}
                loading="lazy"
                onError={() => setBackImgError(true)}
                aria-label="Back Image"
              />

              {/* Enhanced shadow that moves with the card */}
              <motion.div 
                className="absolute -bottom-3 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-neutral-700 opacity-60"
                style={{ 
                  scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
                  opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0.1])
                }}
                aria-hidden="true"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right: big word + subtitle */}
        <motion.div variants={itemUp} className="order-3 text-right">
          <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl" tabIndex={0} aria-label={titleRight}>
            {titleRight}
          </h1>
          <p className="mt-3 text-sm text-neutral-300 md:pl-10 md:text-base" tabIndex={0}>
            {subtitle}
          </p>
        </motion.div>
      </motion.div>

      {/* Embedded services-style content inside the Hero section */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-8 px-4 md:mt-14 md:grid-cols-2 md:items-start relative"
      >
        <motion.div variants={itemUp}>
          <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl" tabIndex={0}>WHAT I CAN DO FOR YOU</h2>
          <p className="mt-3 max-w-prose text-neutral-300" tabIndex={0}>
            As a software developer, I craft performant, accessible web experiences that connect deeply and
            spark creativity.
          </p>
          {/* what i can do for you */}
          <motion.ul
            className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            aria-label="Services List"
          >
            {['WEBSITE DEVELOPMENT', 'APP DEVELOPMENT', 'AI MODELLING', 'E-COMMERCE SOLUTIONS'].map((label, i) => (
              <motion.li
                key={label}
                className="group flex items-center justify-between py-4"
                variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                tabIndex={0}
                aria-label={label}
              >
                <span className="text-lg font-semibold tracking-wide">{i + 1}. {label}</span>
                <span className="text-neutral-400 transition-transform group-hover:translate-x-1" aria-hidden="true">›</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right column - where the card will drop down to */}
        <motion.div 
          variants={itemUp} 
          className="hidden md:flex items-center justify-center min-h-[300px] relative"
        >
          {/* Placeholder content or landing zone indicator */}
          <div className="text-center text-neutral-500">
            <motion.div
              className="w-16 h-16 border-2 border-dashed border-neutral-700 rounded-full mx-auto mb-4 flex items-center justify-center"
              animate={{ 
                borderColor: ["#404040", "#525252", "#404040"],
                scale: [1, 1.05, 1] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              aria-hidden="true"
            >
              <span className="text-neutral-600 text-2xl">↓</span>
            </motion.div>
            <p className="text-sm"></p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-12 px-4 md:mt-20 md:grid-cols-2 md:items-start relative"
      >
        {/* Left: About Me Section - Card landing zone */}
        <motion.div variants={itemUp} className="relative">
          <div className="relative z-20">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl mb-6" tabIndex={0}>ABOUT ME</h2>

            <div className="space-y-4">
              <p className="text-neutral-300 leading-relaxed" tabIndex={0}>
                {aboutTextContent}
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-400" tabIndex={0}>Core Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsList.map((skill: string, index: number) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 text-sm bg-neutral-800 text-neutral-200 rounded-full border border-neutral-700 hover:border-green-400/50 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      tabIndex={0}
                      aria-label={skill}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.button
                className="mt-6 px-6 py-3 bg-green-400 text-neutral-900 font-semibold rounded-lg hover:bg-green-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                aria-label="Contact Button"
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