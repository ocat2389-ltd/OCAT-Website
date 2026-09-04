import Image from "next/image";
import { ContinuousCorner } from "@/components/ContinuousCorner";

type MarkdownContentProps = {
  source: string;
};

export function MarkdownContent({ source }: MarkdownContentProps) {
  const blocks = toBlocks(source);

  return (
    <div className="rich-text">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return <h2 key={index}>{inline(block.text)}</h2>;
        }

        if (block.type === "h3") {
          return <h3 key={index}>{inline(block.text)}</h3>;
        }

        if (block.type === "ul") {
          return (
            <ul key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{inline(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={index}>
              <ContinuousCorner className="rich-text__media" radius={18}>
                <Image src={block.src} alt={block.alt} width={1200} height={750} />
              </ContinuousCorner>
              {block.caption ? <figcaption>{block.caption}</figcaption> : null}
            </figure>
          );
        }

        return <p key={index}>{inline(block.text)}</p>;
      })}
    </div>
  );
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; alt: string; src: string; caption?: string };

function toBlocks(source: string): Block[] {
  const lines = source.trim().split(/\r?\n/);
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "p", text: paragraph.join(" ") });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length > 0) {
      blocks.push({ type: "ul", items: list });
      list = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const image = trimmed.match(/^!\[(.*)]\((.*)\)(?:\s+"(.*)")?$/);
    if (image) {
      flushParagraph();
      flushList();
      blocks.push({ type: "image", alt: image[1], src: image[2], caption: image[3] });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") });
      continue;
    }

    const bullet = trimmed.match(/^-\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      list.push(bullet[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}
