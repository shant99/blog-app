import "./styles.css";
import React from "react";
import clsx from "clsx";
import { EndlessCarouselProps } from "./types";

export default function EndlessCarousel({
  reverse = true,
}: EndlessCarouselProps) {
  const arr = [1, 2, 3, 4, 5];

  return (
    <div
      className={clsx("slider", reverse ? "reverse" : "")}
      style={
        {
          "--width": "200px",
          "--height": "100px",
          "--quantity": 5,
        } as React.CSSProperties
      }
    >
      <div className="list">
        {arr.map((item: number, index: number) => {
          return (
            <div
              className="item"
              style={
                {
                  "--position": index + 1,
                } as React.CSSProperties
              }
              key={`index-${index}`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
