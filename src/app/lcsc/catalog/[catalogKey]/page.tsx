export default async function Page({
  params,
}: {
  params: Promise<{ catalogKey: string }>;
}) {
  const { catalogKey } = await params;
  const url = "selectSmtComponentCatalogNameVO";
  const data = await fetch(
    "https://www.jlc-smt.com/api/smtComponentOrder/componentSearchController/getComponentSelectorForCascade",
    {
      method: "POST",
      body: JSON.stringify({
        baseQueryDto: {
          componentBrandList: [],
          componentSpecificationList: [],
          componentTypeIdList: [],
          preferredComponentFlagList: [],
          orderLibraryTypeList: [],
          packageTypeList: [],
          productTypeIdList: [catalogKey],
        },
        catalogLevel: 1,
        nowCondition: "",
        paramList: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );
  const posts = await data.json();

  return <>{<p>{posts.data.total}</p>}</>;
}
