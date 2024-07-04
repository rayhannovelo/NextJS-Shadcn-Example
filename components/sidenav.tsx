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
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SideNav() {
  return (
    <aside className="flex flex-col border-r overflow-y-auto max-h-screen">
      <div className="flex-none hidden md:flex justify-between items-center border-b h-16 px-4">
        <div className="flex items-center font-semibold gap-2">
          <Cpu className="w-8 h-8" />
          <span>StoicDev</span>
        </div>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Side Menu</span>
        </Button>
      </div>
      <nav className="flex-1 hidden md:flex flex-col gap-2 p-5 transition-all">
        <span className="text-primary font-bold px-3 py-2">Home</span>
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
    </aside>
  )
}
