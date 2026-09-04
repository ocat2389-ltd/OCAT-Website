import fs from "node:fs";
import path from "node:path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  content: string;
};

export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getPost(file.replace(/\.md$/, "")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: requireField(data, "title"),
    date: requireField(data, "date"),
    category: requireField(data, "category"),
    description: requireField(data, "description"),
    image: requireField(data, "image"),
    imageAlt: requireField(data, "imageAlt"),
    content,
  };
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error("Blog post is missing frontmatter.");
  }

  const data = Object.fromEntries(
    match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");
      if (separator === -1) {
        return [line, ""];
      }

      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
      return [key, value];
    }),
  );

  return { data, content: match[2].trim() };
}

function requireField(data: Record<string, string>, key: string) {
  const value = data[key];
  if (!value) {
    throw new Error(`Blog post is missing required field: ${key}`);
  }

  return value;
}
