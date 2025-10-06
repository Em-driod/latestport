// A list of image URLs for the festival campaign
const images = [
  { src: '/rac.jpg', label: 'Festival Crowd' },
  { src: '/emma.png', label: 'Designer Portrait' },
  { src: '/rac.jpg', label: 'Main Stage' },
  { src: '/rac.jpg', label: 'Night Lights' },
  { src: '/emma.png', label: 'VIP Area' },
];

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureWork = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isThrottled = useRef(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Only disable scroll when FeatureWork is in view and not all images have been swiped
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (isInView && currentImageIndex < images.length - 1) {
      document.body.style.overflow = 'hidden';
      setScrollEnabled(false);
    } else {
      document.body.style.overflow = '';
      setScrollEnabled(true);
    }
  }, [isInView, currentImageIndex]);

interface ScrollEvent extends React.WheelEvent<HTMLDivElement> {}

const handleScroll = useCallback((event: ScrollEvent) => {
    if (!scrollEnabled) event.preventDefault();
    if (isThrottled.current) return;
    isThrottled.current = true;
    setTimeout(() => {
        isThrottled.current = false;
    }, 500);
    const deltaY: number = event.deltaY;
    if (!scrollEnabled) {
      if (deltaY > 0 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((prevIndex: number) => prevIndex + 1);
      } else if (deltaY < 0 && currentImageIndex > 0) {
        setCurrentImageIndex((prevIndex: number) => prevIndex - 1);
      }
    }
}, [images.length, currentImageIndex, scrollEnabled]);

  return (
    <div
      ref={containerRef}
      onWheel={handleScroll}
      className="relative h-screen w-screen flex flex-col justify-center items-center text-white overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="flex flex-col items-center justify-center w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="relative flex items-center justify-center mx-auto my-8">
              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].label}
                className="rounded-2xl object-cover shadow-lg"
                style={{ width: '820px', height: '420px', maxWidth: '120vw', maxHeight: '70vh' }}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 px-4 py-2 rounded-full text-white text-base font-semibold shadow-lg">
                {images[currentImageIndex].label}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FeatureWork;