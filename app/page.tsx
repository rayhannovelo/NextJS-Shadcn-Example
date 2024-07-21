"use client"

import { useRouter } from "next/navigation"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { handleSignIn } from "@/actions/authAction"

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
})

type AlertType = {
  variant: "destructive" | "success" | "warning" | "info"
  title: string
  description: string
}

export default function Page({
  searchParams,
}: {
  searchParams?: {
    alert?: string
  }
}) {
  const router = useRouter()
  const alertParam = searchParams?.alert || null
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

      router.replace("/")
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
      if (data && data.error) {
        setAlert({
          variant: "destructive",
          title: "Error",
          description: data!.error,
        })
      }
    })
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="w-full sm:w-96 m-5">
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
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col">
          <p>
            © 2024 Powered By
            <span className="font-semibold">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </p>
          <p>All rights reserved</p>
        </CardFooter>
      </Card>
    </div>
  )
}
