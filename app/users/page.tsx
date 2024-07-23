import { Metadata } from "next"
import Link from "next/link"
import { AlertCircle, Plus } from "lucide-react"
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
import { Button } from "@/components/ui/button"
import { getUsers } from "@/actions/usersAction"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata: Metadata = {
  title: "Users",
}

export default async function Users() {
  const data = await getUsers()

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
            <Link href="/users/create" className="flex justify-end">
              <Button variant="default">
                <Plus className="w-4 h-4 mr-1" /> Create
              </Button>
            </Link>
            <DataTable columns={columns} data={data.data ?? []} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </DashboardLayout>
  )
}
