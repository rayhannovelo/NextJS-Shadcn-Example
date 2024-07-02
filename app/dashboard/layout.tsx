import type { Metadata } from "next"
import SideNav from "@/components/sidenav"

export const metadata: Metadata = {
  title: "Dashboard | Next.js Shadcn Example",
  description: "Next.js page with Shadcn",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <SideNav />
      <div className="bg-muted/40">
        <main>{children}</main>
      </div>
    </div>
  )
}
