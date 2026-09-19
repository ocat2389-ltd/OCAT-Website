"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type UseCase = {
  id: string;
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  cta?: { label: string; href: string };
};

export function UseCaseTabs({ cases }: { cases: UseCase[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="home-tabs">
      <div className="home-tabs__list" role="tablist" aria-label="Use cases">
        {cases.map((useCase, index) => (
          <button
            className={index === active ? "home-tabs__tab is-active" : "home-tabs__tab"}
            type="button"
            role="tab"
            id={`use-case-tab-${useCase.id}`}
            aria-selected={index === active}
            aria-controls={`use-case-panel-${useCase.id}`}
            tabIndex={index === active ? 0 : -1}
            key={useCase.id}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
                return;
              }
              const step = event.key === "ArrowRight" ? 1 : -1;
              const next = (index + step + cases.length) % cases.length;
              setActive(next);
              document.getElementById(`use-case-tab-${cases[next].id}`)?.focus();
            }}
          >
            {useCase.label}
          </button>
        ))}
      </div>
      {cases.map((useCase, index) => (
        <div
          className="home-tabs__panel"
          role="tabpanel"
          id={`use-case-panel-${useCase.id}`}
          aria-labelledby={`use-case-tab-${useCase.id}`}
          hidden={index !== active}
          key={useCase.id}
        >
          <div className="home-tabs__media">
            <Image
              src={useCase.image}
              alt={useCase.imageAlt}
              fill
              sizes="(max-width: 809px) calc(100vw - 48px), 516px"
            />
          </div>
          <div className="home-tabs__copy">
            <h3 className="home-title-sm">{useCase.title}</h3>
            <p>{useCase.body}</p>
            {useCase.cta ? (
              <Link className="home-button" href={useCase.cta.href as Route}>
                {useCase.cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
