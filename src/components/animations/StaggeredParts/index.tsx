import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { StaggeredDivsProps } from "../types";
import { variantsConfig, variantsItemConfig } from "./index.config";

const StaggeredParts: React.FC<StaggeredDivsProps> = ({
  children,
  once = true,
  styles,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantsConfig}
      style={{ ...styles }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={variantsItemConfig}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredParts;
