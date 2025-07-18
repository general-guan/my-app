import ThemeSwitcher from "./theme-switcher";
import Link from "next/link";
export default function Header() {
  return (
    <div>
      <Link href="/">首页</Link>
      <Link href="/docs/axios">axios</Link>
      <Link href="/docs/npm">npm</Link>
      <Link href="/docs/array">array</Link>
      <ThemeSwitcher />
    </div>
  );
}
