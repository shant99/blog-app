import { motion } from "framer-motion";
import React from "react";
import { AnimatedComponentProps, TComponent } from "./types";

const AnimatedComponent = <T,>({
  component = "div",
  className,
  children,
  ...props
}: AnimatedComponentProps<T>) => {
  const MotionComponent = motion.create(component as TComponent);

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedComponent;
