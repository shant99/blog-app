import { MotionProps, Variant } from "motion/react";
import { CSSProperties, ForwardRefExoticComponent, ReactNode } from "react";

type Direction = "left" | "right" | "top" | "bottom";

export type TComponent =
  | keyof JSX.IntrinsicElements
  | ForwardRefExoticComponent<any>;

export type AnimatedComponentProps<T = Record<string, unknown>> =
  MotionProps & {
    component?: TComponent;
    className?: string;
    children?: ReactNode;
    direction?: Direction;
    once?: boolean;
  } & T;

export type StaggeredTextProps = {
  text: string;
  delimiters?: string[];
  once?: boolean;
  styles?: CSSProperties;
  speed?: number;
  delay?: number;
};

export type ParallaxTextAnimationProps = {
  children: string;
  baseVelocity: number;
  fontSize?: string;
};

export type StaggeredDivsProps = {
  children: ReactNode;
  once?: boolean;
  styles?: CSSProperties;
};

export type AnimatedBorderCardProps = {
  borderColor?: string;
  background?: string;
  active?: boolean;
  children: ReactNode;
  stylesChildren?: React.CSSProperties;
};

export type StaggeredLettersProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};
