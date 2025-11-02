export default async function Page({
  params,
}: {
  params: Promise<{ catalogKey: string }>;
}) {
  const { catalogKey } = await params;

  const data1 = await fetch(
    `https://www.jlc-smt.com/api/smtComponentOrder/componentSearchController/selectSmtComponentCatalogNameVO?catalogId=${catalogKey}`,
    { method: "POST" }
  );
  const posts1 = await data1.json();

  const data2 = await fetch(
    "https://www.jlc-smt.com/api/smtComponentOrder/componentSearchController/getComponentSelectorForCascade",
    {
      method: "POST",
      body: JSON.stringify({
        baseQueryDto: {
          componentBrandList: [],
          componentSpecificationList: [],
          componentTypeIdList: posts1.data.componentTypeId
            ? [posts1.data.componentTypeId]
            : [],
          preferredComponentFlagList: [],
          orderLibraryTypeList: [],
          packageTypeList: [],
          productTypeIdList: [posts1.data.productTypeId],
        },
        catalogLevel: posts1.data.componentTypeId ? 2 : 1,
        nowCondition: "",
        paramList: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  const posts2 = await data2.json();

  return (
    <>
      <p>{posts1.data.productType}</p>
      <p>{posts1.data.componentType}</p>
      <p>{posts2.data.total}</p>
      <div className="flex">
        <ul>
          {posts2.data.componentBrandList.map((item) => (
            <li key={item.key}>{item.name}</li>
          ))}
        </ul>
        <ul>
          {posts2.data.componentSpecificationList.map((item) => (
            <li key={item.key}>{item.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
