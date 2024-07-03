import type { Metadata } from "next"
import SideNav from "@/components/sidenav"

export const metadata: Metadata = {
  title: "Dashboard | Next.js Shadcn Example",
  description: "Next.js page with Shadcn",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] md:grid-rows-[auto] grid-cols-[auto] md:grid-cols-[280px_1fr] min-h-screen w-full">
      <SideNav />
      <div className="bg-muted/40">
        <main className="flex justify-center content-center p-5">
          {children}
        </main>
      </div>
    </div>
  )
}
