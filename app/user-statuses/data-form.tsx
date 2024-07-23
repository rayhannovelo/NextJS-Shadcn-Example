"use client"

import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { Check, CircleAlert } from "lucide-react"
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
import { createUserStatus, editUserStatus } from "@/actions/userStatusesAction"
import { serialize } from "object-to-formdata"

export default function UserForm({ data }: { data?: any }) {
  const router = useRouter()
  const { toast } = useToast()

  const formSchema = z.object({
    userStatusName: z.coerce.string().min(1, "User Status Name is required"),
    userStatusDescription: z.coerce
      .string()
      .min(1, "User Role Description is required"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          userStatusName: data.userStatusName ?? "",
          userStatusDescription: data.userStatusDescription ?? "",
        }
      : {
          userStatusName: "",
          userStatusDescription: "",
        },
  })

  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = serialize(values)
      const response = data
        ? await editUserStatus(data.id, formData)
        : await createUserStatus(formData)

      if (response.success) {
        toast({
          variant: "success",
          description: (
            <div className="flex gap-2 items-start">
              <div className="flex flex-col justify-start ">
                <Check className="w-10 h-10" />
              </div>
              <div>
                <p className="font-bold text-lg">Success</p>
                <p>{response.message}</p>
              </div>
            </div>
          ),
        })

        router.push("/user-statuses")
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
                <p className="font-bold text-lg">{response.message}</p>
                <ul className="list-disc pl-5">
                  {response.data.map((val: any, key: number) => (
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
          name="userStatusName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Status</FormLabel>
              <FormControl>
                <Input type="text" placeholder="User Status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userStatusDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Description" {...field} />
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
