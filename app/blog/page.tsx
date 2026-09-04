import type { Metadata } from "next";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Stories, announcements, and field notes from OCAT Robotics.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const archivePosts = rest.length > 0 ? rest : posts;

  return (
    <main>
      <SiteHeader />
      <section className="blog-page">
        <div className="blog-page__inner">
          <Link className="blog-feature" href={blogHref(featured.slug)}>
            <div className="blog-feature__media">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                sizes="(max-width: 991px) calc(100vw - 48px), 823px"
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div className="blog-feature__meta">
                {formatDate(featured.date)} / {featured.category}
              </div>
              <h1 className="blog-feature__title">{featured.title}</h1>
              <p className="blog-feature__excerpt">{featured.description}</p>
            </div>
          </Link>

          <section className="blog-archive" aria-labelledby="all-posts">
            <h2 className="blog-archive__heading" id="all-posts">
              All Posts
            </h2>
            <p className="blog-archive__dek">
              Stories, announcements, and product updates.
            </p>
            <div className="blog-archive__filters" aria-label="Article categories">
              {["All", "Field tests", "Animatronics", "Research", "Animal care"].map(
                (filter, index) => (
                  <span
                    className={index === 0 ? "filter-pill is-active" : "filter-pill"}
                    key={filter}
                  >
                    {filter}
                  </span>
                ),
              )}
            </div>
            <div className="article-grid">
              {archivePosts.map((post) => (
                <Link className="article-card" href={blogHref(post.slug)} key={post.slug}>
                  <div className="article-card__media">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 40px), 420px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="article-card__meta">
                    {formatDate(post.date)} / {post.category}
                  </div>
                  <h3 className="article-card__title">{post.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));
}

function blogHref(slug: string): Route {
  return `/blog/${slug}` as Route;
}
