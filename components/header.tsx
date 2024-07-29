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
import { PanelLeft, Cpu } from "lucide-react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ThemeButton } from "@/components/theme-button"
import { UserButton } from "@/components/user-button"
import { getLinks } from "@/data/links"
import { title } from "@/lib/utils"
import { useSession } from "next-auth/react"

export default function Header() {
  const pathname = usePathname()
  const paths = pathname.split("/")
  const { data: session } = useSession()
  const links = getLinks(session?.user.userRoleId)

  return (
    <header>
      <div className="hidden md:flex md:justify-between justify-center items-center px-5 h-16">
        <nav>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${paths[1]}`}>
                  {title(paths[1])}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {paths[2] && !paths[3] && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title(paths[2])}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {paths[3] && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{title(paths[3])}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <div className="flex gap-5">
          <div className="relative hidden xl:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[180px] lg:w-[336px]"
            />
          </div>
          <div className="flex">
            <ThemeButton />
            <UserButton photo={session?.user.photo} />
            <div className="flex flex-col justify-center ml-2 text-xs">
              <p className="font-bold">{session?.user.name}</p>
              <p className="text-muted-foreground">
                {session?.user.user_role.userRoleName}
              </p>
            </div>
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
        <div className="flex">
          <ThemeButton />
          <UserButton photo={session?.user.photo} />
        </div>
      </div>
    </header>
  )
}
