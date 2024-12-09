import React from "react";
import { svgStyles } from "./svg.styles";

const VideoWithSvgOverlay = () => {
  return (
    <div className="relative overflow-hidden" style={{ borderRadius: "20px" }}>
      <video
        className="relative inset-0"
        width="1160"
        height="1160"
        autoPlay={true}
        loop
        playsInline
        muted
        style={{
          opacity: 1,
          width: "100%",
          height: "auto",
          borderRadius: "10px",
        }}
      >
        <source src="/videos/ai-loop.mp4" type="video/mp4" />
      </video>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280 768"
        fill="none"
      >
        <style>{svgStyles}</style>
        <g
          className="relative mix-blend-hard-light transition-transform duration-200"
          style={{ transformOrigin: "289.431px 138.72px" }}
        >
          <text
            className="animate-reliable text-xl font-medium uppercase sm:text-[21px] text-[#CCC6EC] opacity-80 blur-[2px]"
            x="19%"
            y="19%"
            fill="currentColor"
          >
            Reliable
          </text>
        </g>
        <g
          className="relative mix-blend-hard-light transition-transform duration-200"
          style={{ transformOrigin: "928.966px 184.8px" }}
        >
          <text
            className="animate-scalability text-xl font-medium uppercase sm:text-[21px] text-gray-8"
            x="67.5%"
            y="25%"
            fill="currentColor"
          >
            Scalability
          </text>
        </g>
        <g
          className="relative mix-blend-hard-light transition-transform duration-200"
          style={{ transformOrigin: "219.772px 307.68px" }}
        >
          <text
            className="animate-high-compatibility text-xl font-medium uppercase sm:text-[21px] text-gray-8"
            x="9%"
            y="41%"
            fill="currentColor"
          >
            High compatibility
          </text>
        </g>
        <g
          className="relative mix-blend-hard-light transition-transform duration-200"
          style={{ transformOrigin: "1041.91px 307.68px" }}
        >
          <text
            className="animate-fast-search text-xl font-medium uppercase sm:text-[21px] text-[#CCC6EC] opacity-80 blur-[2px]"
            x="71.5%"
            y="41%"
            fill="currentColor"
          >
            Blazingly fast search
          </text>
        </g>
        <g
          className="relative mix-blend-hard-light transition-transform duration-200"
          style={{ transformOrigin: "341.481px 576.48px" }}
        >
          <text
            className="animate-pgvector text-xl font-medium uppercase sm:text-[21px] text-gray-8"
            x="17%"
            y="76%"
            fill="currentColor"
          >
            Works with PGVECTOR
          </text>
        </g>
        <g
          className="relative mix-blend-hard-light transition-transform duration-200"
          style={{ transformOrigin: "999.738px 614.88px" }}
        >
          <text
            className="animate-langchain text-xl font-medium uppercase sm:text-[21px] text-[#CCC6EC] opacity-80 blur-[2px]"
            x="68%"
            y="81%"
            fill="currentColor"
          >
            Works with langchain
          </text>
        </g>
      </svg>
    </div>
  );
};

export default VideoWithSvgOverlay;
