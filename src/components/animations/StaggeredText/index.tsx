import React, { useEffect, useId, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { StaggeredTextProps } from "../types";
import getPartsFromDelimiter from "@/utils/delimiter/getPartsFromDelimiter";
import getDelimiterRegex from "@/utils/delimiter/getDelimiterRegex";
import { getVariantsConfig, variantsItemConfig } from "./index.config";

const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  delimiters = [",", "."],
  once = true,
  speed = 0.2,
  styles = {},
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once });
  const delimiterRegex = getDelimiterRegex(delimiters);
  const controls = useAnimation();
  const textParts = getPartsFromDelimiter(text, delimiters, delimiterRegex);

  useEffect(() => {
    const startAnimation = async () => {
      if (isInView) {
        await controls.start("hidden");
        setTimeout(() => {
          controls.start("visible");
        }, delay * 1000);
      }
    };

    startAnimation();
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariantsConfig(speed)}
    >
      {textParts.map((part) => {
        const id = useId();
        const text = part.replaceAll("&nbsp;", "");
        const displayStyle = part.includes("&nbsp;") ? "block" : "inline-block";

        return (
          <motion.p
            key={id}
            variants={variantsItemConfig}
            style={{
              display: displayStyle,
              ...styles,
            }}
          >
            {text}
          </motion.p>
        );
      })}
    </motion.div>
  );
};

export default StaggeredText;
