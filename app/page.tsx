"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTransition, useState, useEffect, use } from "react"
import { handleSignIn } from "./actions/authAction"
import { useRouter, useSearchParams } from "next/navigation"

const formSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
})

type AlertType = {
  variant: "destructive" | "success" | "warning" | "info"
  title: string
  description: string
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const alertParam = searchParams.get("alert")
  const [alert, setAlert] = useState<AlertType | null>(null)

  useEffect(() => {
    if (alertParam) {
      if (alertParam == "logout") {
        setAlert({
          variant: "success",
          title: "Success",
          description: "Logout success!",
        })
      } else if (alertParam == "unauthorized") {
        setAlert({
          variant: "warning",
          title: "Warning",
          description: "Unauthorized Access!",
        })
      }

      router.push("/")
    }
  }, [router, alertParam])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setAlert(null)
    startTransition(async () => {
      const data = await handleSignIn(values)
      if (data && data.error)
        setAlert({
          variant: "destructive",
          title: "error",
          description: data!.error,
        })
    })
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full m-5 sm:min-w-96">
        <CardHeader>
          <CardTitle className="text-center text-4xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          {alert && (
            <Alert variant={alert.variant} className="mb-5">
              <AlertCircle
                className="
              h-4 w-4"
              />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col">
          <p>
            © 2024 Powered By <span className="font-semibold">StoicDev</span>
          </p>
          <p>All rights reserved</p>
        </CardFooter>
      </Card>
    </div>
  )
}
