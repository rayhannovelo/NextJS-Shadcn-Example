import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { signOut } from "@/auth"
import Link from "next/link"

export default function Header() {
  return (
    <header>
      <div className="hidden md:flex justify-center md:justify-between items-center px-5 h-16">
        <nav>
          <Breadcrumb className="flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <div className="flex gap-5">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <form
                  action={async () => {
                    "use server"
                    await signOut({
                      redirectTo: "/?alert=logout",
                      redirect: true,
                    })
                  }}
                >
                  <button type="submit">Logout</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="md:hidden flex justify-between items-center border-b h-14 px-4">
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
              <span className="text-primary font-bold px-3 py-2">
                Main Navigation
              </span>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 bg-muted rounded-lg px-3 py-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <span className="text-primary font-bold px-3 py-2">
                User Management
              </span>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Users
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <UserCog className="h-4 w-4" />
                User Roles
              </Link>{" "}
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <UserCheck className="h-4 w-4" />
                User Statuses
              </Link>
              <span className="text-primary font-bold px-3 py-2">
                Post Management
              </span>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
              >
                <FileText className="h-4 w-4" />
                Post
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex justify-center items-center font-semibold gap-2">
          <Cpu className="w-8 h-8" />
          <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form
                action={async () => {
                  "use server"
                  await signOut({
                    redirectTo: "/?alert=logout",
                    redirect: true,
                  })
                }}
              >
                <button type="submit">Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
