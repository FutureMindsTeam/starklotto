"use client";

import Link from "next/link";
import { admin_sidebar_items } from "./_data";
import { usePathname } from "next/navigation";

export default function Sidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <menu className="w-full h-screen border border-[#00FFA3] py-6 px-1 text-white" {...props}>
      <nav>
        {admin_sidebar_items.map((item, idx) => {
          const isActive = pathname === item?.link && !item?.link.startsWith('/admin/') && pathname !== '/admin';
          return (
            <Link key={idx} href={item?.link} className={isActive ? 'text-[#00FFA3] font-bold' : ''}>
              {item?.title}
            </Link>
          );
        })}
      </nav>
    </menu>
  )
}
