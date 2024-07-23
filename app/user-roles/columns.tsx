"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/datatable-header-column"
import UserRoleActions from "./actions"

// define data
export type UserRoles = {
  id: string
  userRoleName: string
  userRoleDescription: string
  name: string
  email: string
}

export const columns: ColumnDef<UserRoles>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="text-center">{row.original.id}</div>,
  },
  {
    accessorKey: "userRoleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Role" />
    ),
  },
  {
    accessorKey: "userRoleDescription",
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
        <UserRoleActions id={row.original.id} />
      </div>
    ),
  },
]
