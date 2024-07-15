import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { formatNumber } from "@/lib/utils"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 px-2">
      <div className="flex items-center text-sm font-medium">
        Showing{" "}
        {formatNumber(
          table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1
        )}{" "}
        to{" "}
        {formatNumber(
          table.getCanNextPage()
            ? (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize
            : table.getRowCount()
        )}{" "}
        of {formatNumber(table.getRowCount())} entries
      </div>
      <div className="sm:ml-auto flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="h-8 w-8 p-0" disabled={true}>
          {formatNumber(table.getState().pagination.pageIndex + 1)}
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
