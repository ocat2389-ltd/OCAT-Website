import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeatureList, type FeatureListItem } from "@/components/home/FeatureList";
import { Reveal } from "@/components/home/Reveal";
import { Testimonials, type Testimonial } from "@/components/home/Testimonials";
import { UseCaseTabs, type UseCase } from "@/components/home/UseCaseTabs";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./home.css";

const description =
  "We are building the foundational platform for intelligent, hyper-responsive animatronics. Powered by edge AI and adaptive behavior trees, our technology transforms static hardware into emotionally intelligent companions.";

export const metadata: Metadata = {
  description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

const YOUTUBE_ID = "bQucrv3WtlI";

const pillars = [
  {
    title: "Realistic Movement",
    body: "We precisely engineer essential touchpoints to make the robots feel alive.",
    image: "/home/feature-movement.png",
    imageAlt: "Cutaway render of the animatronic head mechanism",
  },
  {
    title: "Precise Mechanics",
    body: "All components are fitted into a highly efficient space.",
    image: "/home/feature-mechanics.jpeg",
    imageAlt: "Close-up render of a belt-driven joint assembly",
  },
  {
    title: "Modular Design",
    body: "All components are built with modularity in mind, allowing quick adaptation of the robot's use case.",
    image: "/home/feature-modular.png",
    imageAlt: "Render of the modular internal frame",
  },
];

const useCases: UseCase[] = [
  {
    id: "caretaking",
    label: "Penguin Caretaking",
    title: "A New Era for Animal Monitoring",
    body: "The project began by evaluating the limitations of traditional wildlife monitoring tools, such as fixed CCTV networks and manual veterinary inspections. Standard security cameras suffer from severe geometric blind spots in rugged nesting environments, while frequent human intrusion into habitats causes intense stress, altering wild behavior and spiking the heart rates of nesting birds.",
    image: "/home/caretaking-remote.jpeg",
    imageAlt: "PANGUAN being driven from a phone beside king penguins at Ocean Park",
    cta: { label: "Read the field notes", href: "/blog/panguan-ocean-park" },
  },
  {
    id: "retail",
    label: "Souvenir Retail",
    title: "AI Pets and Companion Robots",
    body: "Traditional consumer and service robotics feel rigid and lifeless.",
    image: "/home/retail-illustration.jpeg",
    imageAlt: "Illustration of visitors taking a photo with a penguin robot",
    cta: { label: "See it in action", href: "#souvenir-retail" },
  },
];

const caretakingSteps: FeatureListItem[] = [
  {
    icon: <MessageIcon />,
    title: "1 – Mobility & Navigation Evolution",
    body: "Early concepts explored basic static monitoring pods, but these still left nesting blind spots unaddressed. The design evolved into an autonomous, mobile robotic chassis styled explicitly as a juvenile penguin. By leveraging biomimetic acceptance, the robot can closely navigate the nesting colony to clear up CCTV blind spots without causing panic.",
    image: "/home/caretaking-team.png",
    imageAlt: "Ocean Park keepers watching PANGUAN meet two king penguins",
  },
  {
    icon: <SparkleIcon />,
    title: "2 – Biomimetic Expressiveness",
    body: "Initial mechanical tests focused purely on functional locomotion. However, field observations of isolated or sick penguins revealed that a stiff, silent machine increased animal anxiety. The hardware evolved to include subtle, natural biological gestures—such as organic head tilting, gentle nodding, and soft wing flapping. This allows the robot to blend in seamlessly with wild populations and provide stress-reducing physical companionship to sick penguins kept in veterinary isolation.",
    image: "/home/caretaking-remote.jpeg",
    imageAlt: "PANGUAN approaching king penguins inside the habitat",
  },
  {
    icon: <CheckIcon />,
    title: "3 – AI Sensor Integration",
    body: "Early designs relied on standard high-definition optical lenses, which were insufficient for automated health triage. The payload evolved to incorporate compact thermal imaging sensors and advanced edge AI compute blocks, moving the platform from a basic video feed to an active diagnostic tool capable of identifying subtle temperature irregularities indicative of illness.",
    image: "/home/caretaking-detection.jpeg",
    imageAlt: "Computer-vision overlay detecting individual penguins in the colony",
  },
];

const retailSteps: FeatureListItem[] = [
  {
    icon: <MessageIcon />,
    title: "1 – Generative Behavior Trees",
    body: "Instead of relying on loops of pre-recorded, robotic animations, our proprietary software allows the robot's personality to evolve. It dynamically triggers micro-expressions (blinks, tilts, nudges) based on human touch, emotional cues, and voice inputs.",
    image: "/home/panguan-souvenir.jpeg",
    imageAlt: "PANGUAN souvenir animatronic wearing a bow tie",
  },
  {
    icon: <SparkleIcon />,
    title: "2 – Commercial Viability",
    body: "It successfully fuses high-end physical computing with automation, turning interactive entertainment into a reliable revenue driver.",
    image: "/home/retail-booth.png",
    imageAlt: "Visitors interacting with PANGUAN at an exhibition booth",
  },
  {
    icon: <CheckIcon />,
    title: "3 – Edge AI & Neural Architecture (NVIDIA Jetson Orin)",
    body: "Our systems process vision, depth, and spatial awareness entirely on-device. This guarantees zero-latency reactions and strict data privacy, allowing the AI Pet to map its environment and adapt its behavioral expressions instantly.",
    image: "/home/retail-vision.png",
    imageAlt: "On-device pose tracking recognising a waving hand",
  },
];

const testimonials: Testimonial[] = [
  {
    quote: "“I would love to see this in Ocean Park”",
    name: "Eszter Matrai",
    role: "Senior Research Fellow, Ocean Park",
  },
  {
    quote: "“The movement is so cute & realistic. I love the egg as well!”",
    name: "Yolanda Ng",
    role: "HKUST Student",
  },
];

export default function Home() {
  return (
    <main className="home" data-nav-theme="dark">
      <div className="home-noise" aria-hidden="true" />
      <SiteHeader initialTheme="hero" />

      <header className="home-hero" id="hero" data-nav-theme="hero">
        <video
          className="home-hero__video"
          src="/home/hero.mp4"
          poster="/home/panguan-souvenir.jpeg"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
        <div className="home-hero__content">
          <h1 className="home-hero__title">Animatronics Meet Magic</h1>
          <p className="home-hero__lede">{description}</p>
          <a className="home-button" href="#about">
            Begin Journey
          </a>
        </div>
      </header>

      <section className="home-section" id="about">
        <Reveal>
          <SectionLabel>Introducing Message</SectionLabel>
          <div className="home-intro">
            <h2 className="home-title-lg">
              Robotics Has an Emotional Deficit. AI is Trapped in a Screen. We Bridge the Gap.{" "}
              <span>
                Large Language Models and Vision Systems have made AI incredibly smart, but they
                remain isolated behind glass. At the same time, traditional consumer and service
                robotics feel rigid and lifeless.
              </span>
            </h2>
            <p className="home-title-lg">
              <span>
                Our mission is to provide the missing physical bridge. By combining
                state-of-the-art Edge AI with highly articulated, modular animatronic skeletons,
                we are creating a new class of
              </span>{" "}
              AI Pets and Companion Robots{" "}
              <span>that can see, feel, adapt, and touch the physical world.</span>
            </p>
          </div>
        </Reveal>
        <Reveal>
          <ul className="home-pillars">
            {pillars.map((pillar) => (
              <li key={pillar.title}>
                <div className="home-pillars__media">
                  <Image
                    src={pillar.image}
                    alt={pillar.imageAlt}
                    fill
                    sizes="(max-width: 809px) calc(100vw - 48px), 352px"
                  />
                </div>
                <h3 className="home-title-sm">{pillar.title}</h3>
                <p>{pillar.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="home-section" id="features">
        <Reveal>
          <SectionLabel>Use cases</SectionLabel>
          <h2 className="home-title-lg home-title-lg--discover">
            Discover Panguan <span>— our flagship experiential animatronics collaborated</span>{" "}
            with Ocean Park Hong Kong.
          </h2>
        </Reveal>
        <Reveal className="home-showcase">
          <Image
            className="home-showcase__logos"
            src="/home/panguan-ocean-park-logos.png"
            alt="PANGUAN by OCAT Limited, in collaboration with Ocean Park Hong Kong"
            width={1253}
            height={261}
            sizes="(max-width: 809px) calc(100vw - 96px), 627px"
          />
          <UseCaseTabs cases={useCases} />
        </Reveal>

        <Reveal className="home-subsection">
          <SectionLabel>Penguin Caretaking</SectionLabel>
          <h2 className="home-title-lg home-title-lg--narrow">
            Cover CCTV blind spots in a non-disruptive approach
          </h2>
          <FeatureList items={caretakingSteps} mediaAspect="516 / 500" />
        </Reveal>

        <Reveal className="home-subsection" id="souvenir-retail">
          <SectionLabel>Souvenir Retail ― Redefine Human-Robot Interaction</SectionLabel>
          <h2 className="home-title-lg home-title-lg--narrow">
            Provide experience, not commodity.
          </h2>
          <a
            className="home-button"
            href={`https://youtu.be/${YOUTUBE_ID}`}
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
          <div className="home-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1`}
              title="PANGUAN souvenir retail demo"
              loading="lazy"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <FeatureList items={retailSteps} mediaAspect="516 / 400" />
        </Reveal>
      </section>

      <section className="home-section" id="testimonials">
        <Reveal>
          <SectionLabel>Testimonials</SectionLabel>
          <h2 className="home-title-lg home-title-lg--stack">
            What others whisper <span>about the experience</span>
          </h2>
        </Reveal>
        <Reveal>
          <Testimonials items={testimonials} />
        </Reveal>
      </section>

      <section className="home-section home-section--cta" id="final-cta">
        <Reveal className="home-cta">
          <Image
            src="/home/cta-skeleton.jpeg"
            alt=""
            fill
            sizes="(max-width: 1199px) calc(100vw - 48px), 1080px"
          />
          <div className="home-cta__content">
            <h2 className="home-title-lg">
              Step into the future, guided by physical AI animatronics
            </h2>
            <p>Experience the tool right now. Just dive in and see what AI can do for you.</p>
            <Link className="home-button" href="/blog/panguan-ocean-park">
              Request Demo
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter theme="dark" />
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="home-label">{children}</p>;
}

function MessageIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16v11H9.5L6 19.5v-3H4z" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4.5l1.8 4.7 4.7 1.8-4.7 1.8L10 17.5l-1.8-4.7L3.5 11l4.7-1.8z" />
      <path d="M18 3.5v4M16 5.5h4M18.5 16v3.5M16.75 17.75h3.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.4 2.4 4.6-5" />
    </svg>
  );
}
