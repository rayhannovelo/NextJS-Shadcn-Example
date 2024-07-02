"use client"

import Sidenav from "@/components/sidenav"
import { useState } from "react"

export default function Main({ children }: { children: React.ReactNode }) {
  const [showSideNav, setshowSideNav] = useState<boolean>(true)

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <Sidenav showSideNav={showSideNav} />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  )
}
