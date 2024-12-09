import { AnimatedBorderCardProps } from "../types";
import "./styles.css";
import clsx from "clsx";

export default function AnimatedBorderCard({
  borderColor = "white",
  background = "",
  active = false,
  stylesChildren = {},
  children,
}: AnimatedBorderCardProps) {
  return (
    <div
      className={clsx(
        "animated-border__wrapper",
        active ? "animated-border__active" : "animated-border__inactive"
      )}
      style={
        {
          position: "relative",
          "--animated-border-color": borderColor,
          background,
        } as React.CSSProperties
      }
    >
      <span className="animated-border" style={{ background }}></span>
      <div className="animated-border__content" style={stylesChildren}>
        {children}
      </div>
    </div>
  );
}
