import Link from "next/link"
import {
  Menu,
  Cpu,
  Home,
  Users,
  UserCog,
  UserCheck,
  User,
  FileText,
  CircleUser,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"

export default function SideNav() {
  return (
    <aside className="flex flex-col border-r overflow-y-auto max-h-screen">
      <div className="flex-none hidden md:flex justify-between items-center border-b h-14 px-4">
        <div className="flex items-center font-semibold gap-2">
          <Cpu className="w-8 h-8" />
          <span>StoicDev</span>
        </div>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Side</span>
        </Button>
      </div>
      <nav className="flex-1 hidden md:flex flex-col gap-2 p-5 transition-all">
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
          Profil
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
      <header className="flex-none md:hidden flex justify-between items-center border-b h-14 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
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
                Profil
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
          <span>StoicDev</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
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
      </header>
    </aside>
  )
}
