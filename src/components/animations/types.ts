import { MotionProps, Variant } from "motion/react";
import {
  CSSProperties,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

type Direction = "left" | "right" | "top" | "bottom";

export type TComponent =
  | keyof JSX.IntrinsicElements
  | ForwardRefExoticComponent<
      React.PropsWithChildren<unknown> & RefAttributes<unknown>
    >;

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
  className?: string;
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

export type EndlessCarouselProps = {
  reverse?: boolean;
};
