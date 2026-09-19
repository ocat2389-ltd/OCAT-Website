"use client";

import { useEffect, useRef } from "react";
import type { ComponentProps } from "react";

// Content stays visible without JS; only elements below the fold are hidden and revealed on scroll.
export function Reveal({ children, className, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || element.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.reveal = "visible";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={["home-reveal", className].filter(Boolean).join(" ")} ref={ref} {...props}>
      {children}
    </div>
  );
}
