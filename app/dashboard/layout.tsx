import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "@/styles/globals.css"
import Main from "@/components/Main"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Dashboard | Next.js Shadcn Example",
  description: "Next.js page with Shadcn",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Main>{children}</Main>
}
