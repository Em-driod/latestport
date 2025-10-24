import { motion, type Variants, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

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
  backImageSrc = '/motorphone.png',
  aboutText,
  skills,
}: HeroProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start center', 'end start'] });

  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);

  // Desktop transforms remain unchanged
  const rotY = useMemo(() => isMobile ? 0 : useTransform(scrollYProgress, [0.4, 1.14, 9], [0, 460, 480]), [isMobile, scrollYProgress]);
  const moveX = useMemo(() => isMobile ? 0 : useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [-610, 150, 300, 350]), [isMobile, scrollYProgress]);
  const moveY = useMemo(() => isMobile ? 0 : useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 800]), [isMobile, scrollYProgress]);
  const scale = useMemo(() => isMobile ? 1 : useTransform(scrollYProgress, [0, 0.9, 2], [1, 0.9, 1]), [isMobile, scrollYProgress]);

  const [imgError, setImgError] = useState(false);
  const [backImgError, setBackImgError] = useState(false);

  // 👇 Mobile Fade Swap Logic
  const [showFront, setShowFront] = useState(true);
  const isInView = useInView(sectionRef, { margin: '-20% 0px -20% 0px' });
  const [pause, setPause] = useState(false);

  const handleTap = useCallback(() => {
    if (!isMobile) return;
    setShowFront(prev => !prev);
    setPause(true);
    setTimeout(() => setPause(false), 6000);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile || !isInView) return;
    if (pause) return;

    const interval = setInterval(() => {
      setShowFront(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, isInView, pause]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  const aboutTextContent =
    aboutText ||
    "I'm passionate about building beautiful, functional web applications. With a strong foundation in modern web technologies and a keen eye for design, I strive to deliver solutions that are both technically robust and visually engaging.";

  const skillsList = skills || [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'CSS',
    'Tailwind CSS',
    'Framer Motion',
    'UI/UX',
    'Git',
    'REST APIs',
  ];

  return (
    <section ref={sectionRef} className="relative w-full lg:py-0 md:py-0 overflow-hidden" aria-label="Hero Section">
      <span className="pointer-events-none absolute right-4 top-6 inline-flex h-3 w-3 rounded-full bg-green-400 shadow-[0_0_24px_4px_rgba(163,230,53,0.6)]" aria-hidden="true" />

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 md:grid-cols-3">
        {/* Left */}
        <motion.div variants={itemUp} className="order-2 md:order-1">
          <p className="mb-2 text-sm tracking-[0.2em] text-neutral-300" tabIndex={0}>{name}</p>
          <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl" tabIndex={0}>{titleLeft}</h1>
        </motion.div>

        {/* Center Image Card */}
        <motion.div variants={itemUp} className="order-1 mx-auto md:order-2 relative z-10">
          <div className="[perspective:1200px]">
            <motion.div
              ref={cardRef}
              style={{ rotateY: rotY, x: moveX, y: moveY, scale }}
              className="relative h-[360px] w-[260px] rounded-2xl border border-neutral-800 bg-neutral-900 md:h-[440px] md:w-[320px] shadow-2xl overflow-hidden"
              aria-label="Profile Card"
              onClick={handleTap}
            >
              {/* FRONT Image */}
              <motion.img
                src={imgError ? '/fallback.png' : imageSrc}
                alt="Portrait"
                className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                onError={() => setImgError(true)}
                style={{ opacity: isMobile ? (showFront ? 1 : 0) : 1 }}
                animate={isMobile ? { opacity: showFront ? 1 : 0 } : {}}
                transition={{ duration: 0.6 }}
              />

              {/* BACK Image */}
              <motion.img
                src={backImgError ? '/fallback.png' : backImageSrc}
                alt="Background"
                className="absolute inset-0 h-full w-full object-cover rounded-2xl"
                onError={() => setBackImgError(true)}
                style={{ opacity: isMobile ? (showFront ? 0 : 1) : 0 }}
                animate={isMobile ? { opacity: showFront ? 0 : 1 } : {}}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div variants={itemUp} className="order-3 text-right">
          <h1 className="text-5xl font-extrabold leading-none tracking-tight md:text-6xl lg:text-7xl" tabIndex={0}>{titleRight}</h1>
          <p className="mt-3 text-sm text-neutral-300 md:pl-10 md:text-base" tabIndex={0}>{subtitle}</p>
        </motion.div>
      </motion.div>

      {/* (The rest of your component stays exactly the same) */}
    </section>
  );
}
