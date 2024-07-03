import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) return redirect("/?alert=unauthorized")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>Default dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Session data</p>
        <pre className="text-wrap bg-slate-800 text-muted rounded-lg mt-3 p-3">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  )
}
