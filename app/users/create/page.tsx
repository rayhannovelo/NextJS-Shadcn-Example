import { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UserForm from "../user-form"

export const metadata: Metadata = {
  title: "Create User",
}

export default async function create() {
  return (
    <DashboardLayout>
      <main className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create User</CardTitle>
            <CardDescription>Create User Form</CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <UserForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </DashboardLayout>
  )
}
