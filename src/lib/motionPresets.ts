import { motion } from 'framer-motion';

export const fadeUp = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

export const cardSpring = {
    whileTap: { scale: 0.98 },
    initial: { y: 6, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 220, damping: 18 } },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};
