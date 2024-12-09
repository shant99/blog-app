import { useState } from "react";
import AnimatedBorderCard from "@/components/animations/AnimatedBorderCard";
import StaggeredParts from "@/components/animations/StaggeredParts";
import { useTranslations } from "next-intl";
import PLayerCard from "../PlayerCard";
import dynamic from "next/dynamic";
import clsx from "clsx";
import "./styles.css";

const DynamicGlobusSection = dynamic(() => import("../GlobusSection"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const contentParts = [
  <PLayerCard key={"index-1"} />,
  <DynamicGlobusSection key={"index-2"} />,
  <div key={"index-3"}>Comming soon...</div>,
];

export default function ChoosenPartsSection() {
  const [selectedPart, setSelectedPart] = useState(0);
  const t = useTranslations();

  const textParts = [
    t("home.choosen_cards.part_1"),
    t("home.choosen_cards.part_2"),
    t("home.choosen_cards.part_3"),
  ];

  return (
    <div className="choosen-parts-section">
      <h3 className="choosen-parts__title">{t("home.choosen-parts-title")}</h3>
      <p className="choosen-parts__desc">{t("home.choosen-parts-desc")}</p>
      <StaggeredParts className="staggered-part-card__home">
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

      <div className="choosen-parts-content">{contentParts[selectedPart]}</div>
    </div>
  );
}
