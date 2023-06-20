import Link from "next/link"

const NavList = [
  {
    path: "/",
    title: "首页",
  },
  {
    path: "/tangshi",
    title: "唐诗三百首",
  },
  {
    path: "/about",
    title: "关于",
  },
  {
    path: "/dashboard",
    title: "Dashboard",
  },
]

export default function Header() {
  return (
    <div className="layout-header">
      <ul className="layout-header-nav flex items-center justify-start">
        {NavList.map((item) => {
          return (
            <li className="flex-1 h-12  bg-gray-300" key={item.path}>
              <Link
                className="h-full flex items-center border-r-2 border-gray-400 justify-center hover:bg-gray-400
                 hover:text-white hover:font-bold transition-all duration-300 ease-in-out"
                href={item.path}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
