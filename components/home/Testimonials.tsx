"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function Testimonials({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) {
      return;
    }
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <div className="home-testimonials">
      <ul className="home-testimonials__track" ref={trackRef} onScroll={update}>
        {items.map((item, index) => (
          <li className="home-testimonial" key={item.name}>
            <blockquote className="home-title-sm">{item.quote}</blockquote>
            <footer>
              <div>
                <div className="home-testimonial__name">{item.name}</div>
                <div className="home-testimonial__role">{item.role}</div>
              </div>
              <div className="home-testimonial__count">
                {index + 1}/{items.length}
              </div>
            </footer>
          </li>
        ))}
      </ul>
      {canPrev || canNext ? (
        <div className="home-testimonials__controls">
          <button
            type="button"
            aria-label="Previous testimonial"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
          >
            <Arrow direction="right" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
