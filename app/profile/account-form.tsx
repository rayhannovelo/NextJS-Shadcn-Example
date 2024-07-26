"use client"

import { useRouter } from "next/navigation"
import { useTransition, useEffect } from "react"
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
import { getProfile, updateProfile } from "@/actions/authAction"
import { serialize } from "object-to-formdata"
import { useSession } from "next-auth/react"

export default function AccountForm() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { toast } = useToast()

  const formSchema = z.object({
    user_role: z.object({ userRoleName: z.string().optional() }),
    username: z.string().min(1, "Username is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email().min(1, "Email is required"),
    photo: z
      .instanceof(File)
      .refine((file) => file?.size <= 5 * 1024 * 1024, `Max image size is 5MB.`)
      .refine(
        (file) =>
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            file?.type
          ),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      )
      .nullable()
      .optional(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_role: {
        userRoleName: "",
      },
      username: "",
      name: "",
      email: "",
      photo: null,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProfile()

      if (response.success) {
        form.reset({ ...response.data, photo: null })
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
                  {response.data &&
                    response.data.map((val: any, key: number) => (
                      <li key={key}>{val.message}</li>
                    ))}
                </ul>
              </div>
            </div>
          ),
        })
      }
    }

    fetchData()
  }, [form, toast])

  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = serialize(values)
      const data = await updateProfile(formData)

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

        // update session
        update({
          ...session,
          user: {
            ...session?.user,
            ...data.data,
          },
        })

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
          name="user_role.userRoleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="User Role"
                  {...field}
                  disabled={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Username"
                  {...field}
                  disabled={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !form.formState.isValid}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
