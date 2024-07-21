"use client"

import { useRouter } from "next/navigation"
import { useTransition, useState } from "react"
import { Check, CircleAlert, Pencil, Settings, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteUser } from "@/actions/usersAction"
import { useToast } from "@/components/ui/use-toast"

export default function Actions({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const deleteAction = (id: string) => {
    startTransition(async () => {
      const data = await deleteUser(id)

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

        router.refresh()
      } else {
        toast({
          variant: "destructive",
          description: (
            <div className="flex gap-2 items-center">
              <div className="flex flex-col justify-start ">
                <CircleAlert className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-lg">{data.message}</p>
              </div>
            </div>
          ),
        })
      }
    })
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Pencil className="h-4 w-4 mr-2" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-destructive focus:text-white"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => deleteAction(id)}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
