"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/datatable-header-column"
import UserStatusActions from "./actions"

// define data
export type UserStatuses = {
  id: string
  userStatusName: string
  userRoleDescription: string
  name: string
  email: string
}

export const columns: ColumnDef<UserStatuses>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    accessorKey: "userStatusName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Status" />
    ),
  },
  {
    accessorKey: "userStatusDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
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
        <UserStatusActions id={row.original.id} />
      </div>
    ),
  },
]
