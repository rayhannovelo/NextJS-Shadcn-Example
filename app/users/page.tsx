import { Metadata } from "next"
import { auth } from "@/auth"
import axios from "axios"
import { AlertCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata: Metadata = {
  title: "Users",
}

async function getData() {
  try {
    const session = await auth()
    const response = await axios.get(`${process.env.BACKEND_URL}/users`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}

export default async function Users() {
  const data = await getData()

  return (
    <DashboardLayout>
      <main className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Users Management</CardDescription>
          </CardHeader>
          <CardContent>
            {!data.success && (
              <Alert variant="destructive" className="mb-5">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Fetching Data</AlertTitle>
                <AlertDescription>{data.message}</AlertDescription>
              </Alert>
            )}
            <DataTable columns={columns} data={data.data ?? []} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </DashboardLayout>
  )
}
