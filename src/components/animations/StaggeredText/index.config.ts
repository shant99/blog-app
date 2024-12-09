export const getVariantsConfig = (speed: number) => ({
  visible: { opacity: 1, transition: { staggerChildren: speed } },
  hidden: { opacity: 0 },
});

export const variantsItemConfig = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 30 },
};
