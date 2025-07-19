import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeToc from "@jsdevtools/rehype-toc";
const rehypeShikiOptions = {
  themes: {
    light: "vitesse-light",
    dark: "vitesse-dark",
  },
};
export async function markdownToHtml(markdown: string) {
  const htmlContent = await unified()
    .use(remarkParse) // 解析 Markdown
    .use(remarkRehype) // 转换 Markdown AST 为 HTML AST
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeShiki, rehypeShikiOptions)
    .use(rehypeStringify) // 序列化 HTML AST 为字符串
    .process(markdown);

  const htmlToc = await unified()
    .use(remarkParse) // 解析 Markdown
    .use(remarkRehype) // 转换 Markdown AST 为 HTML AST
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeToc)
    .use(() => (tree) => {
      tree.children.splice(1);
    })
    .use(rehypeStringify) // 序列化 HTML AST 为字符串
    .process(markdown);

  return {
    htmlContent: String(htmlContent),
    htmlToc: String(htmlToc),
  };
}
