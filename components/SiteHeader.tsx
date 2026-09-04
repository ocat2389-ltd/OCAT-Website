import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
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
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <a href="https://ocat.framer.website/">Legacy</a>
        </nav>
      </div>
    </header>
  );
}
