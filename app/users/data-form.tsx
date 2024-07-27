"use client"

import { useRouter } from "next/navigation"
import { useTransition, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Check, ChevronsUpDown, CircleAlert, Eye, EyeOff } from "lucide-react"
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { getUserRoles } from "@/actions/userRolesAction"
import { getUserStatuses } from "@/actions/userStatusesAction"
import { createUser, editUser } from "@/actions/usersAction"
import { serialize } from "object-to-formdata"

type userRoles = {
  id: string
  userRoleName: string
}

type userStatuses = {
  id: string
  userStatusName: string
}

export default function UserForm({ user }: { user?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [userRoles, setUserRoles] = useState<userRoles[]>([])
  const [userStatuses, setUserStatuses] = useState<userStatuses[]>([])
  const [openUserRoles, setOpenUserRoles] = useState(false)
  const [openUserStatuses, setOpenUserStatuses] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false)

  const formSchema = z
    .object({
      userRoleId: z.coerce.string().min(1, "User Role is required"),
      userStatusId: z.coerce.string().min(1, "User Status is required"),
      username: z.string().min(1, "Username is required"),
      password: user ? z.string().min(8).or(z.literal("")) : z.string().min(8),
      passwordConfirmation: user
        ? z.string().min(8).or(z.literal(""))
        : z.string().min(8),
      name: z.string().min(1, "Name is required"),
      email: z.string().email().min(1, "Email is required"),
      photo: z
        .instanceof(File)
        .refine(
          (file) => file?.size <= 5 * 1024 * 1024,
          `Max image size is 5MB.`
        )
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
    .refine((data) => data.password === data.passwordConfirmation, {
      message:
        "The password field and passwordConfirmation field must be the same",
      path: ["passwordConfirmation"],
    })

  useEffect(() => {
    const fetchData = async () => {
      const userRoles = await getUserRoles()
      setUserRoles(userRoles.data)

      const userStatuses = await getUserStatuses()
      setUserStatuses(userStatuses.data)
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          userRoleId: user.userRoleId ?? "",
          userStatusId: user.userStatusId ?? "",
          username: user.username ?? "",
          password: "",
          passwordConfirmation: "",
          name: user.name ?? "",
          email: user.email ?? "",
          photo: undefined,
        }
      : {
          userRoleId: "",
          userStatusId: "",
          username: "",
          password: "",
          passwordConfirmation: "",
          name: "",
          email: "",
          photo: undefined,
        },
  })

  const [isPending, startTransition] = useTransition()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const formData = serialize(values)
      const data = user
        ? await editUser(user.id, formData)
        : await createUser(formData)

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

        router.push("/users")
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
          name="userRoleId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User Role</FormLabel>
              <Popover open={openUserRoles} onOpenChange={setOpenUserRoles}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? userRoles.find(
                            (userRoles) => userRoles.id === field.value
                          )?.userRoleName
                        : "Select User Role"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-1">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No User Role Found.</CommandEmpty>
                      <CommandGroup>
                        {userRoles.map((userRole) => (
                          <CommandItem
                            value={userRole.userRoleName}
                            key={userRole.id}
                            onSelect={() => {
                              form.setValue("userRoleId", userRole.id)
                              form.trigger("userRoleId")
                              setOpenUserRoles(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                userRole.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {userRole.userRoleName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userStatusId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>User Status</FormLabel>
              <Popover
                open={openUserStatuses}
                onOpenChange={setOpenUserStatuses}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? userStatuses.find(
                            (userStatuses) => userStatuses.id === field.value
                          )?.userStatusName
                        : "Select User Status"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-1">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No User Status Found.</CommandEmpty>
                      <CommandGroup>
                        {userStatuses.map((userStatus) => (
                          <CommandItem
                            value={userStatus.userStatusName}
                            key={userStatus.id}
                            onSelect={() => {
                              form.setValue("userStatusId", userStatus.id)
                              form.trigger("userStatusId")
                              setOpenUserStatuses(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                userStatus.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {userStatus.userStatusName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
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
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}
