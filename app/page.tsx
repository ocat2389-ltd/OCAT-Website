import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="home-shell" id="about">
      <SiteHeader />
      <section className="home-hero" aria-label="OCAT Robotics introduction">
        <h1 className="home-hero__title">
          We build animatronic robotic worlds for closer animal care.
        </h1>
      </section>
    </main>
  );
}
