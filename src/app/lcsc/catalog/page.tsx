import Link from "next/link";
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
    <>
      <p>{posts.data.total}</p>
      <ul>
        {posts.data.productTypeAggs.map((item) => (
          <li key={item.key}>
            <Link href={`/lcsc/catalog/${item.key}`}>{item.name}</Link>
            <span>({item.docCount})</span>
            <ul className="bg-blue-200">
              {item.subAggs.map((subItem) => (
                <li key={subItem.key}>
                  <Link href={`/lcsc/catalog/${subItem.key}`}>
                    {subItem.name}
                  </Link>
                  <span>({subItem.docCount})</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
