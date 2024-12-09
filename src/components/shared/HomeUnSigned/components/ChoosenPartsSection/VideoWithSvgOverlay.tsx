import React from "react";

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
        <style>
          {`@keyframes moveReliable {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(-15px, -40px);
              }
            }

            @keyframes moveScalability {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(-20px, 15px);
              }
            }

            @keyframes moveHighCompatibility {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(10px, -5px);
              }
            }

            @keyframes moveFastSearch {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(-10px, 20px);
              }
            }

            @keyframes movePGVector {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(5px, -35px);
              }
            }

            @keyframes moveLangChain {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(-20px, 15px);
              }
            }

            .animate-reliable {
              animation: moveReliable 2s ease-in-out infinite alternate;
            }

            .animate-scalability {
              animation: moveScalability 2.2s ease-in-out infinite alternate;
            }

            .animate-high-compatibility {
              animation: moveHighCompatibility 2.5s ease-in-out infinite alternate;
            }

            .animate-fast-search {
              animation: moveFastSearch 1.8s ease-in-out infinite alternate;
            }

            .animate-pgvector {
              animation: movePGVector 2.2s ease-in-out infinite alternate;
            }

            .animate-langchain {
              animation: moveLangChain 2.7s ease-in-out infinite alternate;
            }

             text {
                pointer-events: all; /* Make text interactive */
            }

            text:hover {
                filter: blur(0); /* Remove blur */
                opacity: 1; /* Make fully visible */
                transition: filter 0.3s ease, opacity 0.3s ease;
                color: red;
                cursor: pointer;
            }
            
            g {
              transform-origin: inherit;
            }
            `}
        </style>
        {/* Reliable */}
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

        {/* Scalability */}
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

        {/* High Compatibility */}
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

        {/* Blazingly Fast Search */}
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

        {/* Works with PGVECTOR */}
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

        {/* Works with LangChain */}
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
