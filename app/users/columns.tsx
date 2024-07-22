"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/datatable-header-column"
import Actions from "./actions"

// define data
export type Users = {
  id: string
  userRoleId: number
  user_role: {
    userRoleName: string
  }
  user_status: {
    userStatusName: string
  }
  username: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Users>[] = [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="text-center">{row.index + 1}</div>,
  },
  {
    accessorKey: "user_role.userRoleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Role" />
    ),
  },
  {
    accessorKey: "user_status.userStatusName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Status" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
  },
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => (
      <div className="text-center">
        <Actions id={row.original.id} />
      </div>
    ),
  },
]
