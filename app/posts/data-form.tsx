"use client"

import { useRouter } from "next/navigation"
import { useTransition, useRef, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { createPost, editPost } from "@/actions/postsAction"
import { serialize } from "object-to-formdata"

export default function UserForm({ data }: { data?: any }) {
  const formSchema = z.object({
    title: z.coerce.string().min(1, "Title is required"),
    body: z.coerce.string().min(1, "Body is required"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data
      ? {
          title: data.title ?? "",
          body: data.body ?? "",
        }
      : {
          title: "",
          body: "",
        },
  })

  const body = form.watch("body")
  const bodyRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.height = "auto"
      bodyRef.current.style.height = bodyRef.current.scrollHeight + "px"
    }
  }, [body])

  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = serialize(values)
      const response = data
        ? await editPost(data.id, formData)
        : await createPost(formData)

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

        router.push("/posts")
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea placeholder="Body" {...field} ref={bodyRef} />
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
