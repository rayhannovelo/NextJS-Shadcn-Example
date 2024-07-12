"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cpu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { links } from "@/data/links"

export default function SideNav() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col border-r overflow-y-auto max-h-screen">
      <div className="flex-none hidden md:flex justify-between items-center border-b h-16 px-4">
        <div className="flex items-center font-semibold gap-2">
          <Cpu className="w-8 h-8" />
          <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Link href="/">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <nav className="flex-1 hidden md:flex flex-col gap-2 p-5 transition-all">
        {links.map((link, key) => {
          const LinkIcon = link.icon
          return (
            <Link
              key={key}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                link.href
                  ? pathname === link.href
                    ? "text-primary font-normal bg-gray-100"
                    : "text-muted-foreground hover:text-primary hover:bg-gray-50"
                  : "text-primary font-bold"
              }`}
            >
              {LinkIcon && <LinkIcon className="h-4 w-4" />}
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
