import {
  Users,
  UserCog,
  UserCheck,
  User,
  FileText,
  Bell,
  Home,
} from "lucide-react"

export const links = [
  { name: "Main Navigation", href: "", icon: null },
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "User Management", href: "", icon: null },
  { name: "Users", href: "/users", icon: Users },
  { name: "User Roles", href: "/user-roles", icon: UserCog },
  { name: "User Statuses", href: "/user-statuses", icon: UserCheck },
  { name: "Post Management", href: "", icon: null },
  { name: "Posts", href: "/posts", icon: FileText },
]
