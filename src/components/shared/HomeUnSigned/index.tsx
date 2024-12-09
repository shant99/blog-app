"use client";

import "./styles.css";

import React from "react";
import SplineRubic from "@/components/animations/SplineRubic";
import StaggeredText from "@/components/animations/StaggeredText";
import StaggeredLetters from "@/components/animations/StaggeredLetters";
import Link from "next/link";
// import { useTranslations } from "next-intl";
// import RevealedComponent from "@/components/animations/RevealedComponent";
// import ParallaxText from "@/components/animations/ParallaxTextAnimation";
// import EndlessCarousel from "@/components/animations/EndlessCarousel";
// import StaggeredParts from "@/components/animations/StaggeredParts";
// import AnimatedBorderCard from "@/components/animations/AnimatedBorderCard";
// import ChoosenPartsSection from "./components/ChoosenPartsSection";

export default function HomeUnSigned() {
  // const t = useTranslations();
  return (
    <div className="home-unsigned">
      <div
        style={{
          display: "flex",
          gap: "50px",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div style={{ marginBottom: "100px" }}>
            <h1
              style={{
                fontSize: "5rem",
                maxWidth: "490px",
                lineHeight: 1.1,
                marginBottom: "15px",
              }}
            >
              <StaggeredLetters text="Welcome to Blog !" />
            </h1>
            <h4
              style={{
                color: "var(--text-color-secondary)",
                maxWidth: "490px",
                marginBottom: "15px",
              }}
            >
              <StaggeredText
                delay={1.3}
                once={false}
                text="Explore ideas, share stories,and
              dive into a world of creativity!"
              />
            </h4>
            <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
              <span>Not registered yet</span>
              <Link
                href="/register"
                style={{
                  padding: "5px 7px",
                  borderRadius: "10px",
                  background: "var(--text-color-secondary)",
                  color: "var(--text-color-dark)",
                }}
              >
                Get Started
              </Link>
            </div>
          </div>

          <SplineRubic />
        </div>

        {/* <RevealedComponent
          once={false}
          className="section-gradiended-border"
          style={{
            maxWidth: "600px",
            textWrap: "balance",
            textAlign: "justify",
            color: "var(--text-color-secondary)",
            marginBottom: "100px",
            textIndent: "1.2rem",
          }}
        >
          The Blog App is a sleek and user-friendly platform for sharing and
          discovering engaging content. It allows users to create, read, and
          interact with posts across various topics while offering secure
          authentication and a responsive design. Perfect for personal and
          professional blogging, it’s tailored to deliver a seamless experience
          on any device.
        </RevealedComponent> */}

        {/* <ChoosenPartsSection /> */}

        {/* <RevealedComponent className="x">
          <span style={{ marginLeft: "10px" }}>Intuitive Analytics</span>
        </RevealedComponent> */}

        {/* <AnimatedBorderCard>
          <div style={{ padding: "40px" }}>
            <p>Intuitive Analytics A Intuitive</p>
            <p>Analytics A Intuitive Analytics AIntuitive Analytics A</p>
          </div>
        </AnimatedBorderCard> */}

        {/* <EndlessCarousel /> */}
        {/* <EndlessCarousel reverse={false} /> */}

        {/* <div className="box">
          <span className="box-span"></span>
          <div>
            Intuitive Analytics A Intuitive Analytics A Intuitive Analytics
            AIntuitive Analytics A
          </div>
        </div>
        <div className="box">
          <span className="box-span"></span>
          <div>
            Intuitive Analytics A Intuitive Analytics A Intuitive Analytics
            AIntuitive Analytics A
          </div>
        </div> */}
      </div>
      {/* <RevealedComponent className="section">
        <span>
          Companies of all sizes trust Resend to deliver their most important
          emails.
        </span>
      </RevealedComponent>
      <div className="text">
        <ParallaxText baseVelocity={-1} fontSize="40px">
          We are the best !
        </ParallaxText>
        <ParallaxText baseVelocity={1}>Blog App Welcome !</ParallaxText>
      </div>


      <StaggeredParts styles={{ display: "flex" }}>
        <div className="x">
          <span style={{ marginLeft: "10px" }}>Intuitive Analytics A</span>
        </div>
        <div className="x">
          <span style={{ marginLeft: "10px" }}>Intuitive Analytics B</span>
        </div>
        <div className="x">
          <span style={{ marginLeft: "10px" }}>Intuitive Analytics C</span>
        </div>
      </StaggeredParts> */}
    </div>
  );
}
