import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  { src: '/zvaphone.png', label: 'Festival Crowd' },
  { src: '/agba.png', label: 'Designer Portrait' },
  { src: '/arther.png', label: 'Main Stage' },
  { src: '/ferum.png', label: 'Night Lights' },
  { src: '/zvaphone.png', label: 'VIP Area' },
];

const FeatureWork = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isThrottled = useRef(false);

  const handleScroll = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    if (isThrottled.current) return;

    isThrottled.current = true;
    setTimeout(() => { isThrottled.current = false; }, 700);

    const deltaY = event.deltaY;

    if (deltaY > 0 && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else if (deltaY < 0 && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  }, [currentImageIndex]);

  return (
    <div
      onWheel={handleScroll}
      className="relative h-screen w-screen flex justify-center items-center text-white overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute flex flex-col items-center justify-center w-full h-full"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].label}
            className="rounded-2xl object-cover shadow-lg"
            style={{ width: '920px', height: '420px' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="mt-4 bg-black bg-opacity-60 px-4 py-2 rounded-full text-white text-base font-semibold shadow-lg"
          >
            {images[currentImageIndex].label}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FeatureWork;
