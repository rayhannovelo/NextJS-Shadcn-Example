import { auth } from "@/auth"
import { SignOutButton } from "@/components/signout-button"
import { redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) return redirect("/")

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="sm:min-w-96">
        <CardHeader>
          <CardTitle className="text-center text-4xl">Login Success</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>Session data:</h3>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </CardContent>
        <CardFooter className="flex-col">
          <SignOutButton />
        </CardFooter>
      </Card>
    </div>
  )
}
