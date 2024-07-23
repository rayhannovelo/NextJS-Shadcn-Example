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
import { getUserStatuses } from "@/actions/userStatusesAction"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export const metadata: Metadata = {
  title: "User Statuses",
}

export default async function UserStatuses() {
  const data = await getUserStatuses()

  return (
    <DashboardLayout>
      <main className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>User Statuses</CardTitle>
            <CardDescription>User Statuses Management</CardDescription>
          </CardHeader>
          <CardContent>
            {!data.success && (
              <Alert variant="destructive" className="mb-5">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error Fetching Data</AlertTitle>
                <AlertDescription>{data.message}</AlertDescription>
              </Alert>
            )}
            <Link href="/user-statuses/create" className="flex justify-end">
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
