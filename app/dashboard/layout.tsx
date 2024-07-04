import type { Metadata } from "next"
import SideNav from "@/components/sidenav"
import Header from "@/components/header"

export const metadata: Metadata = {
  title: "Dashboard | Next.js Shadcn Example",
  description: "Next.js page with Shadcn",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-[auto] md:grid-cols-[280px_1fr] md:grid-rows-[100vh] min-h-screen w-full">
      <SideNav />
      <div className="bg-muted/40 overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  )
}
