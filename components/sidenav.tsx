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
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SideNav() {
  return (
    <aside className="flex flex-col h-full w-full border-r">
      <ScrollArea className="max-h-screen hidden md:block">
        <div className="flex justify-center items-center border-b h-14 px-4">
          <div className="flex items-center font-semibold gap-2">
            <Cpu className="w-8 h-8" />
            <span>StoicDev</span>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Side</span>
          </Button>
        </div>
        <div className="flex-1 flex flex-col gap-2 p-5">
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
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <User className="h-4 w-4" />
            Profil
          </Link>
          <span className="text-primary font-bold px-3 py-2">
            User Management
          </span>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <UserCog className="h-4 w-4" />
            User Roles
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <UserCheck className="h-4 w-4" />
            User Statuses
          </Link>
          <span className="text-primary font-bold px-3 py-2">
            Post Management
          </span>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <FileText className="h-4 w-4" />
            Post
          </Link>
        </div>
      </ScrollArea>
    </aside>
  )
}
