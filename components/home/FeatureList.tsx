"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export type FeatureListItem = {
  icon: ReactNode;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

type FeatureListProps = {
  items: FeatureListItem[];
  mediaAspect: string;
};

export function FeatureList({ items, mediaAspect }: FeatureListProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="home-steps">
      <div className="home-steps__media" style={{ "--media-aspect": mediaAspect } as CSSProperties}>
        {items.map((item, index) => (
          <Image
            className={index === active ? "is-active" : undefined}
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 809px) calc(100vw - 48px), 516px"
            key={item.image}
          />
        ))}
      </div>
      <ol className="home-steps__list">
        {items.map((item, index) => (
          <li
            className={index === active ? "home-step is-active" : "home-step"}
            key={item.title}
            onClick={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
          >
            <span className="home-step__icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <h3 className="home-step__title">
                <button
                  type="button"
                  aria-pressed={index === active}
                  onFocus={() => setActive(index)}
                >
                  {item.title}
                </button>
              </h3>
              <p className="home-step__body">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
