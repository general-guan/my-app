import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

export async function getMarkdownContent(slug: string[]) {
  const filePath = path.join(process.cwd(), "src", "docs", `${slug}.md`);
  console.log("filePath::::::::::::::::::::::::", filePath);
  const rawContent = await fs.readFile(filePath, "utf-8");
  const { data: frontmatter, content } = matter(rawContent);
  return { frontmatter, content };
}
