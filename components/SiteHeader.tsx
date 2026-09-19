"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

export type NavTheme = "hero" | "dark" | "light";

const themes: readonly string[] = ["hero", "dark", "light"];

const links: { href: Route; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
];

// Below this width the inline links collapse into the full-screen menu (keep in sync with globals.css).
const MENU_QUERY = "(max-width: 1199px)";

// The header takes its theme from whichever [data-nav-theme] region sits underneath it.
// Regions are read in DOM order, so a nested region overrides its parent; no region means "light".
export function SiteHeader({ initialTheme = "light" }: { initialTheme?: NavTheme }) {
  const ref = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<NavTheme>(initialTheme);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = (ref.current?.offsetHeight ?? 64) / 2;
      let next: NavTheme = "light";
      for (const region of document.querySelectorAll<HTMLElement>("[data-nav-theme]")) {
        const rect = region.getBoundingClientRect();
        const value = region.dataset.navTheme ?? "";
        if (rect.top <= probe && rect.bottom > probe && themes.includes(value)) {
          next = value as NavTheme;
        }
      }
      setTheme(next);
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const toggle = toggleRef.current;
    const media = window.matchMedia(MENU_QUERY);
    const close = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      // Keep keyboard focus inside the open menu.
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? [];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    window.addEventListener("keydown", onKeyDown);
    media.addEventListener("change", close);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      media.removeEventListener("change", close);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <header className="site-header" data-theme={theme} ref={ref}>
        <div className="site-header__blur" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="site-header__inner">
          <Link className="site-header__brand" href="/" aria-label="OCAT Robotics home">
            <Image
              src="/brand/ocat-robotics-regular.png"
              alt="OCAT Robotics"
              width={78}
              height={29}
              priority
            />
          </Link>
          <nav className="site-header__nav" aria-label="Primary navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="site-header__toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            ref={toggleRef}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={open ? "site-menu is-open" : "site-menu"}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        ref={menuRef}
      >
        <nav className="site-menu__links" aria-label="Menu navigation">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={link.href}
              style={{ "--enter-delay": `${80 + index * 50}ms` } as CSSProperties}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="site-menu__close"
          type="button"
          aria-label="Close menu"
          ref={closeRef}
          onClick={() => setOpen(false)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
