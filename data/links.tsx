import { Users, UserCog, UserCheck, User, FileText, Bell } from "lucide-react"

export const links = [
  { name: "Home", href: "", icon: null },
  { name: "Dashboard", href: "/dashboard", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "User Management", href: "", icon: null },
  { name: "Users", href: "/users", icon: Users },
  { name: "User Roles", href: "/user-roles", icon: UserCog },
  { name: "User Statuses", href: "/user-statuses", icon: UserCheck },
  { name: "Post Management", href: "", icon: null },
  { name: "Posts", href: "/posts", icon: FileText },
]
