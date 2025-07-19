import { getMarkdownContent } from "@/utils/readMarkdownFile";
import { markdownToHtml } from "@/utils/markdownToHtml";

// 生成静态路径
export function generateStaticParams() {
  return [{ slug: ["axios"] }, { slug: ["npm"] }, { slug: ["array"] }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getMarkdownContent(slug);
  const { htmlContent, htmlToc } = await markdownToHtml(content);

  return (
    <div className="flex gap-10 pt-[64px] max-w-[1440px] m-auto">
      <div className="bg-pink-200 w-[200px] shrink-0">
        <div className="fixed">123123</div>
      </div>
      <div className="flex-1">
        <article dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      <div className="bg-pink-200 w-[300px] shrink-0">
        <aside
          className="fixed"
          dangerouslySetInnerHTML={{ __html: htmlToc }}
        />
      </div>
    </div>
  );
}
