import { getMarkdownContent } from "@/utils/readMarkdownFile";
import { markdownToHtml } from "@/utils/markdownToHtml";

// 生成静态路径
export function generateStaticParams() {
  return [{ slug: ["axios"] }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getMarkdownContent(slug);
  const htmlContent = await markdownToHtml(content);

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}
