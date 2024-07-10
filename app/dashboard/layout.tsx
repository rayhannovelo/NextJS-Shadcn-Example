"use client"

import SideNav from "@/components/sidenav"
import Header from "@/components/header"
import { useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div
      className={`grid grid-rows-[auto_1fr] grid-cols-[auto] ${
        isSidebarOpen ? "md:grid-cols-[280px_1fr]" : "md:grid-cols-[140px_1fr]"
      } md:grid-rows-[100vh] min-h-screen w-full`}
    >
      <SideNav isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="bg-muted/40 overflow-y-auto">
        <Header />
        {children}
      </div>
    </div>
  )
}
