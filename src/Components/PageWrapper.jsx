import { motion } from "framer-motion";

const slideVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const PageWrapper = ({ children, animate = true }) => {
  if (!animate) return children;

  return (
    <motion.div
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", duration: 0.4 }}
      style={{ position: "absolute", width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;