import Link from "next/link";

interface ProductTypeAgg {
  key: string;
  name: string;
  docCount: number;
  subAggs: ProductTypeAgg[];
}

export default async function Page() {
  const data = await fetch(
    "https://www.jlc-smt.com/api/smtComponentOrder/componentSearchController/getComponentCatalog",
    {
      method: "POST",
      body: JSON.stringify({ productTypeList: [], queryString: "" }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );
  const posts = await data.json();

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            电子元器件目录
          </h1>
          <p className="text-lg text-gray-600">
            <span>共 </span>
            <span className="font-semibold text-blue-600">
              {posts.data.total.toLocaleString()}
            </span>
            <span> 个元器件</span>
          </p>
        </div>

        <div className="space-y-6">
          {posts.data.productTypeAggs.map((item: ProductTypeAgg) => (
            <div
              key={item.key}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6 border-b border-gray-100">
                <Link
                  href={`/lcsc/catalog/${item.key}`}
                  className="group flex items-center justify-between"
                >
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {item.docCount.toLocaleString()}
                  </span>
                </Link>
              </div>

              {item.subAggs && item.subAggs.length > 0 && (
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {item.subAggs.map((subItem) => (
                      <Link
                        key={subItem.key}
                        href={`/lcsc/catalog/${subItem.key}`}
                        className="flex items-center justify-between py-3 px-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <span className="text-sm text-gray-700 group-hover:text-blue-700 font-medium">
                          {subItem.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded-full ml-2 shrink-0">
                          {subItem.docCount.toLocaleString()}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
