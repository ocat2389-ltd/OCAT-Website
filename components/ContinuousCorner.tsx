"use client";

import { Squircle, SquircleNoScript } from "@squircle-js/react";
import type { ComponentProps, ReactNode } from "react";

type ContinuousCornerProps = ComponentProps<"div"> & {
  children: ReactNode;
  radius?: number;
  smoothing?: number;
};

export function ContinuousCorner({
  children,
  radius = 18,
  smoothing = 0.62,
  ...props
}: ContinuousCornerProps) {
  return (
    <Squircle cornerRadius={radius} cornerSmoothing={smoothing} {...props}>
      {children}
    </Squircle>
  );
}

export function ContinuousCornerNoScript() {
  return <SquircleNoScript />;
}
