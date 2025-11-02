import Link from "next/link";

interface List {
  key: string;
  name: string;
  subAggs: List[];
}
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
console.log(posts1);

  const posts2 = await data2.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Link href="/lcsc/catalog" className="hover:text-blue-600">
              电子元器件目录
            </Link>
            <span>/</span>
            <Link href={`/lcsc/catalog/${posts1.data.productTypeId}`} className="hover:text-blue-600">
              {posts1.data.productType}
            </Link>
            {posts1.data.componentType && (
              <>
                <span>/</span>
                <span className="text-gray-900">{posts1.data.componentType}</span>
              </>
            )}
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {posts1.data.componentType || posts1.data.productType}
          </h1>
          <p className="text-lg text-gray-600">
            共 <span className="font-semibold text-blue-600">{posts2.data.total.toLocaleString()}</span> 个元器件
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-1">
          {posts2.data.componentBrandList.length > 0 && (
            <div className="w-[200px] h-[300px] bg-white rounded-xl shadow-md border border-gray-100 flex-shrink-0">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">品牌</h2>
              </div>
              <div className="py-1.5 h-[calc(300px-45px)] overflow-y-auto">
                <div className="space-y-0.5">
                  {posts2.data.componentBrandList.map((item: List) => (
                    <div
                      key={item.key}
                      className="px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {posts2.data.componentSpecificationList.length > 0 && (
            <div className="w-[200px] h-[300px] bg-white rounded-xl shadow-md border border-gray-100 flex-shrink-0">
              <div className="px-3 py-2.5 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">规格</h2>
              </div>
              <div className="py-1.5 h-[calc(300px-45px)] overflow-y-auto">
                <div className="space-y-0.5">
                  {posts2.data.componentSpecificationList.map((item: List) => (
                    <div
                      key={item.key}
                      className="px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {posts2.data.paramList.map((param: List) => (
            <div
              key={param.key}
              className="w-[200px] h-[300px] bg-white rounded-xl shadow-md border border-gray-100 flex-shrink-0"
            >
              <div className="px-3 py-2.5 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-800">
                  {param.name}
                </h2>
              </div>
              <div className="py-1.5 h-[calc(300px-45px)] overflow-y-auto">
                <div className="space-y-0.5">
                  {param.subAggs.map((subItem: List) => (
                    <div
                      key={subItem.key}
                      className="px-2 py-1 hover:bg-gray-50 transition-colors cursor-pointer group"
                    >
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
                        {subItem.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
