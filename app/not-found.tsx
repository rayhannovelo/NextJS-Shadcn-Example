import { Metadata } from "next"
import Link from "next/link"
import { CircleArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Not Found",
}

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <div className="flex justify-center items-center gap-3 mb-5">
        <p className="text-3xl border-r-2 border-black pr-3">404</p>
        <p className="text-xl">Not Found</p>
      </div>
      <Link
        href="/"
        className="flex items-center gap-2 hover:underline text-sm"
      >
        <CircleArrowLeft />
        Return Home
      </Link>
    </div>
  )
}
