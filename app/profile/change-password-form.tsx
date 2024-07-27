"use client"

import { useRouter } from "next/navigation"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Check, CircleAlert, Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { serialize } from "object-to-formdata"
import { changePassword } from "@/actions/authAction"

export default function ChangePasswordForm() {
  const router = useRouter()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)
  const { toast } = useToast()

  const formSchema = z
    .object({
      currentPassword: z.coerce.string().min(1, "Current password is required"),
      password: z.string().min(8),
      passwordConfirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message:
        "The password field and passwordConfirmation field must be the same",
      path: ["passwordConfirmation"],
    })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = serialize(values)
      const data = await changePassword(formData)

      if (data.success) {
        toast({
          variant: "success",
          description: (
            <div className="flex gap-2 items-start">
              <div className="flex flex-col justify-start ">
                <Check className="w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-lg">Success</p>
                <p>{data.message}</p>
              </div>
            </div>
          ),
        })

        form.reset()
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          description: (
            <div className="flex gap-2 items-start">
              <div className="flex flex-col justify-start ">
                <CircleAlert className="w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-lg">{data.message}</p>
                <ul className="list-disc pl-5">
                  {data.data.map((val: any, key: number) => (
                    <li key={key}>{val.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          ),
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  {showCurrentPassword ? (
                    <Eye
                      className="absolute right-2.5 top-2.5 h-5 w-5"
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-2.5 top-2.5 h-5 w-5"
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                    />
                  )}
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </div>
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
                <div className="relative">
                  {showPassword ? (
                    <Eye
                      className="absolute right-2.5 top-2.5 h-5 w-5"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-2.5 top-2.5 h-5 w-5"
                      onClick={() => setShowPassword((prev) => !prev)}
                    />
                  )}
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <div className="relative">
                  {showPasswordConfirmation ? (
                    <Eye
                      className="absolute right-2.5 top-2.5 h-5 w-5"
                      onClick={() =>
                        setShowPasswordConfirmation((prev) => !prev)
                      }
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-2.5 top-2.5 h-5 w-5"
                      onClick={() =>
                        setShowPasswordConfirmation((prev) => !prev)
                      }
                    />
                  )}
                  <Input
                    type={showPasswordConfirmation ? "text" : "password"}
                    placeholder="Password Confirmation"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
