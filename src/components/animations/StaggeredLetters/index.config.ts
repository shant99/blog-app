export const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const variantsConfig = {
  visible: { transition: { staggerChildren: 0.1 } },
  hidden: {},
};
