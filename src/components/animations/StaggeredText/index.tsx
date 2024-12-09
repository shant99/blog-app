"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { StaggeredTextProps } from "../types";
import getPartsFromDelimiter from "@/utils/delimiter/getPartsFromDelimiter";
import getDelimiterRegex from "@/utils/delimiter/getDelimiterRegex";
import { getVariantsConfig, variantsItemConfig } from "./index.config";
import { getLocaleCookie } from "@/services/locale";
import { useTranslations } from "next-intl";

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

  const t = useTranslations();
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    (async () => {
      const locale = await getLocaleCookie();
      setCurrentLocale(locale);
    })();
  }, [t]);

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
  }, [isInView, controls, delay, currentLocale]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariantsConfig(speed)}
      style={{ color: "white" }}
    >
      {textParts.map((part, index) => {
        const text = part.replaceAll("&nbsp;", "");
        const displayStyle = part.includes("&nbsp;") ? "block" : "inline-block";

        return (
          <motion.p
            key={`index-${index}`}
            variants={variantsItemConfig}
            style={{
              display: displayStyle,
              color: "white",
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
