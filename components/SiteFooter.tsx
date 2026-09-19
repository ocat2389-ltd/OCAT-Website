import Image from "next/image";
import Link from "next/link";

export function SiteFooter({ theme = "light" }: { theme?: "dark" | "light" }) {
  return (
    <footer className="site-footer" data-theme={theme}>
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Image
            className="site-footer__logo"
            src="/brand/ocat-robotics-regular.png"
            alt="OCAT Robotics"
            width={78}
            height={29}
          />
          <p>Shape the Future of Physical AI with Us.</p>
          <p className="site-footer__legal">2026 OCAT Limited. All Rights Reserved.</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer navigation">
          <h2>Navigation</h2>
          <Link href="/#about">About</Link>
          <Link href="/#features">Features</Link>
          <Link href="/#testimonials">Testimonials</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </div>
    </footer>
  );
}
