import { Metadata } from "next"
import { auth } from "@/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Dashboard() {
  const session = await auth()

  return (
    <DashboardLayout>
      <main className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Default dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Session data</p>
            <pre className="text-wrap bg-slate-800 text-muted rounded-lg mt-3 p-3">
              <code className="text-white">
                {JSON.stringify(session, null, 2)}
              </code>
            </pre>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </DashboardLayout>
  )
}
