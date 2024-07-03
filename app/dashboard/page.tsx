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
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center text-4xl">Login Success</CardTitle>
        </CardHeader>
        <CardContent>
          <h3>Session data:</h3>
          <pre className="text-wrap">{JSON.stringify(session, null, 2)}</pre>
        </CardContent>
        <CardFooter className="flex-col">
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/?alert=logout", redirect: true })
            }}
          >
            <Button type="submit">Sign Out</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
