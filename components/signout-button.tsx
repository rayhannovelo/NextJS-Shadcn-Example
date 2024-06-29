import { signOut } from "@/auth"
import { Button } from "./ui/button"

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({ redirectTo: "/", redirect: true })
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}
