import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContinuousCorner } from "@/components/ContinuousCorner";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPosts, getPost } from "@/lib/blog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostOrNull(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostOrNull(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />
      <article className="article-page">
        <div className="article-page__inner">
          <header className="article-header">
            <div className="article-header__meta">
              {formatDate(post.date)} / {post.category}
            </div>
            <h1 className="article-header__title">{post.title}</h1>
            <p className="article-header__description">{post.description}</p>
          </header>

          <ContinuousCorner className="article-hero-media" radius={30}>
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 767px) calc(100vw - 48px), 1200px"
              priority
              style={{ objectFit: "cover" }}
            />
          </ContinuousCorner>

          <MarkdownContent source={post.content} />
          <div className="article-backlink-row">
            <Link className="article-backlink" href="/blog">
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

function getPostOrNull(slug: string) {
  try {
    return getPost(slug);
  } catch {
    return null;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}
