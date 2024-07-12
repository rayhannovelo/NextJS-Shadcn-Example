"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  PanelLeft,
  Cpu,
  Home,
  Users,
  UserCog,
  UserCheck,
  User,
  FileText,
} from "lucide-react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ThemeButton } from "@/components/theme-button"
import { UserButton } from "@/components/user-button"
import { links } from "@/data/links"
import { title } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()

  return (
    <header>
      <div className="hidden md:flex items-center px-5 h-16">
        <nav>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title(pathname)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <div className="flex gap-5 md:ml-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[180px] lg:w-[336px]"
            />
          </div>
          <div className="flex flex-nowrap">
            <ThemeButton />
            <UserButton />
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-between items-center border-b h-16 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <PanelLeft className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="p-3">
                <Cpu className="w-8 h-8" />
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <nav className="flex-1 flex flex-col gap-2 transition-all">
              {links.map((link, key) => {
                const LinkIcon = link.icon
                return (
                  <Link
                    key={key}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      link.href
                        ? pathname === link.href
                          ? "text-primary font-normal bg-muted"
                          : "text-muted-foreground hover:text-primary hover:bg-muted"
                        : "text-primary font-bold"
                    }`}
                  >
                    {LinkIcon && <LinkIcon className="h-4 w-4" />}
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex justify-center items-center font-semibold gap-2">
          <Cpu className="w-8 h-8" />
          <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </div>
        <div>
          <ThemeButton />
          <UserButton />
        </div>
      </div>
    </header>
  )
}
