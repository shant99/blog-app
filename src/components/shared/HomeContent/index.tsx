"use client";

import "./styles.css";
import React from "react";
import { useTranslations } from "next-intl";
import WelcomeSection from "./components/WelcomeSection";
import RevealedComponent from "@/components/animations/RevealedComponent";
import ChoosenPartsSection from "./components/ChoosenPartsSection";
import ParallaxText from "@/components/animations/ParralaxText";

export default function HomeUnSigned() {
  const t = useTranslations();
  return (
    <div className="home-content__wrapper">
      <div className="home-content">
        <WelcomeSection />
        <RevealedComponent once={false} className="section-gradiended-border">
          {t("home.description")}
        </RevealedComponent>
        <div className="mb-[150px]">
          <ParallaxText baseVelocity={-1} fontSize="40px">
            We are the best !
          </ParallaxText>
          <ParallaxText baseVelocity={1}>Blog App Welcome !</ParallaxText>
        </div>
        <ChoosenPartsSection />

        {/* <EndlessCarousel /> */}
        {/* <EndlessCarousel reverse={false} /> */}
      </div>
    </div>
  );
}
