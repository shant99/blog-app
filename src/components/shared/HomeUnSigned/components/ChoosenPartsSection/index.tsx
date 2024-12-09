import AnimatedBorderCard from "@/components/animations/AnimatedBorderCard";
import StaggeredParts from "@/components/animations/StaggeredParts";
import { useState } from "react";
import "./styles.css";
import clsx from "clsx";
import dynamic from "next/dynamic";
import PLayerCard from "../PlayerCard";

const DynamicVideoWithSvgOverlay = dynamic(
  () => import("./VideoWithSvgOverlay"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const textParts = [
  "The Blog App is a sleek and user-friendly platform for sharing and discovering engaging content. It allows users to create, read, and interact with posts",
  "Highlights that the platform can grow with the user’s needs, accommodating more readers or content as the blog expands.",
  "The Blog App is a sleek and user-friendly platform for sharing and discovering engaging content.",
];
const contentParts = [
  <PLayerCard key={"index-1"} />,
  <DynamicVideoWithSvgOverlay key={"index-2"} />,
  <div key={"index-3"}>Two</div>,
];

export default function ChoosenPartsSection() {
  const [selectedPart, setSelectedPart] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1500px",
      }}
    >
      <h3 style={{ fontSize: "3rem", marginBottom: "20px" }}>
        Everything in your control
      </h3>
      <p
        style={{
          fontSize: "1.4rem",
          color: "var(--text-color-secondary)",
          maxWidth: "600px",
          textAlign: "center",
          textWrap: "balance",
          lineHeight: 1.3,
          marginBottom: "50px",
        }}
      >
        Everything you need to share your ideas, connect with your readers, and
        grow your blog – all in one place.
      </p>
      <StaggeredParts
        styles={{
          display: "flex",
          marginBottom: "50px",
          textIndent: "1.2rem",
          gap: "20px",
          textAlign: "center",
          textWrap: "balance",
        }}
      >
        {textParts.map((text: string, index: number) => {
          const isCurrent = selectedPart === index;
          return (
            <div
              className={clsx(
                "text-part__item",
                isCurrent ? "current-part" : ""
              )}
              onClick={() => setSelectedPart(index)}
              key={`index-${index}`}
              style={{ borderRadius: "15px", border: "1px solid transparent" }}
            >
              <AnimatedBorderCard
                active={isCurrent}
                borderColor="#e1ff00"
                stylesChildren={{ padding: "10px", cursor: "pointer" }}
              >
                {text}
              </AnimatedBorderCard>
            </div>
          );
        })}
      </StaggeredParts>

      <div
        style={{
          maxWidth: "1300px",
          width: "100%",
          border: "1px solid var(--text-color-secondary)",
          borderRadius: "15px",
          outline: "none",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {contentParts[selectedPart]}
      </div>
    </div>
  );
}
