import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse) // 解析 Markdown
    .use(remarkRehype) // 转换 Markdown AST 为 HTML AST
    .use(rehypeStringify) // 序列化 HTML AST 为字符串
    .process(markdown);
  return String(result);
}
