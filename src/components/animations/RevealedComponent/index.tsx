import { motion, useInView } from "framer-motion";
import React, { useMemo, useRef } from "react";
import { AnimatedComponentProps, TComponent } from "../types";

const AnimatedComponent = <T,>({
  component = "div",
  className,
  children,
  direction = "bottom",
  once = true,
  ...props
}: AnimatedComponentProps<T>) => {
  const MotionComponent = motion.create(component as TComponent);
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const initialPosition = useMemo(() => {
    switch (direction) {
      case "left":
        return { x: -100, y: 0 };
      case "right":
        return { x: 100, y: 0 };
      case "top":
        return { x: 0, y: -100 };
      case "bottom":
      default:
        return { x: 0, y: 100 };
    }
  }, [direction]);

  return (
    <div ref={ref}>
      <MotionComponent
        variants={{
          hidden: { opacity: 0, ...initialPosition },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.55 }}
        {...props}
        className={className}
      >
        {children}
      </MotionComponent>
    </div>
  );
};

export default AnimatedComponent;
