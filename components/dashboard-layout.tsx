import SideNav from "@/components/sidenav"
import Header from "@/components/header"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className="grid grid-rows-[auto_1fr] grid-cols-[auto] md:grid-cols-[280px_1fr] md:grid-rows-[100vh] min-h-screen w-full">
        <SideNav session={session} />
        <div className="bg-muted/40 overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </SessionProvider>
  )
}
