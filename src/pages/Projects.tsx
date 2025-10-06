import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '../components/Container';
import projects from '../data/projects';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -5,
    scaleX: 1.1,
    transition: { duration: 0.2 },
  },
};

export default function Projects() {
  // Helper to get project type from stack
  const getType = (stack: string[]) => {
    if (stack.includes('Node.js') || stack.includes('Express') || stack.includes('FastAPI')) return 'Full Stack';
    if (stack.includes('React') || stack.includes('Vue.js') || stack.includes('Next.js')) return 'Frontend';
    if (stack.includes('Dashboard') || stack.includes('Analytics')) return 'Dashboard';
    if (stack.includes('AI') || stack.includes('TensorFlow')) return 'AI';
    return 'Web App';
  };

  return (
    <Container>
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-12 text-center">
          <p className="text-base text-lime-400 font-semibold tracking-wide mb-2">Elite Portfolio</p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-100 mb-4">Projects</h1>
          <p className="text-lg text-neutral-400">A curated selection of my best work, spanning full stack, frontend, dashboards, AI, and more.</p>
        </header>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-10 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2"
        >
          {projects.map((p, index) => (
            <motion.a
              key={p.slug}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-3xl border-2 border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 shadow-xl overflow-hidden hover:border-lime-400/60 transition-all duration-300 relative"
              variants={item}
              whileHover="hover"
              initial="hidden"
              animate="show"
              style={{
                '--tw-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '--tw-shadow-colored': '0 20px 25px -5px var(--tw-shadow-color), 0 10px 10px -5px var(--tw-shadow-color)',
              } as React.CSSProperties}
            >
              <div className="relative [perspective:1200px]">
                <motion.div
                  className="relative w-full h-full min-h-[520px] [transform-style:preserve-3d]"
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  variants={{ hover: { rotateY: 180 } }}
                >
                  {/* Front face (original content) */}
                  <div className="absolute inset-0 [backface-visibility:hidden]">
                    {/* Media */}
                    <div className="w-full aspect-[16/9]">
                      <div className="relative w-full h-full overflow-hidden bg-gradient-to-tr from-lime-400/10 via-neutral-800 to-neutral-700 flex items-center justify-center">
                        {p.image ? (
                          <motion.img
                            src={p.image}
                            alt={p.title}
                            className="absolute inset-0 h-full w-full object-cover"
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          />
                        ) : (
                          <>
                            <span className="text-5xl text-lime-400/40 font-black">{p.title[0]}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {/* Body */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.span 
                          className="inline-block text-xs px-3 py-1 rounded-full border border-lime-400/40 bg-neutral-900 text-lime-300 font-bold"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(163, 230, 53, 0.1)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {getType(p.stack)}
                        </motion.span>
                        <motion.span 
                          className="inline-block text-xs px-2 py-1 rounded-full border border-neutral-700 text-neutral-400"
                          whileHover={{ scale: 1.05, borderColor: 'rgba(163, 230, 53, 0.4)' }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {p.stack[0] || 'Case Study'}
                        </motion.span>
                      </div>
                      <h3 className="mt-1 text-2xl font-bold tracking-tight text-neutral-100 transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-neutral-400 text-base min-h-[56px]">{p.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.stack.map((tech) => (
                          <span key={tech} className="px-3 py-1 text-xs rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        <motion.span 
                          className="text-lime-400 font-semibold text-sm flex items-center gap-1"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          View Project 
                          <motion.span
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            →
                          </motion.span>
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  {/* Back face */}
                  <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="relative w-full h-full">
                      {p.imageBack && (
                        <motion.img
                          src={p.imageBack}
                          alt={`${p.title} back`}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-900/70 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="text-xl font-bold text-neutral-100">{p.title}</h3>
                        <p className="mt-2 text-neutral-200 line-clamp-2">{p.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {p.stack.slice(0,4).map((tech) => (
                            <span key={tech} className="px-2.5 py-1 text-xs rounded-full bg-neutral-900/70 border border-neutral-700 text-neutral-100 backdrop-blur-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <span className="text-lime-300 font-semibold text-xs flex items-center gap-1">Open →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Container>
  );
}
