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
import { getUserStatus } from "@/actions/userStatusesAction"
import { notFound } from "next/navigation"
import { decrypt } from "@/lib/crypto"
import DataForm from "../../data-form"

export const metadata: Metadata = {
  title: "Edit User Role",
}

export default async function edit({ params }: { params: { id: string } }) {
  const id = decrypt(decodeURIComponent(params.id))
  const data = await getUserStatus(id)

  if (data && !data.success) {
    notFound()
  }

  return (
    <DashboardLayout>
      <main className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Edit User Role</CardTitle>
            <CardDescription>Edit User Role Form</CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <DataForm data={data.data} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </DashboardLayout>
  )
}
