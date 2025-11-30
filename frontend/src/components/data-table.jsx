import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// -------------------
// COLUMNS
// -------------------
const columns = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const d = new Date(row.original.date);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`capitalize px-2 ${
          row.original.status === "present"
            ? "text-green-600"
            : row.original.status === "late"
            ? "text-yellow-600"
            : "text-red-600"
        }`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "checkIn",
    header: "Check In",
    cell: ({ row }) =>
      row.original.checkIn
        ? new Date(row.original.checkIn).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
  },
  {
    accessorKey: "checkOut",
    header: "Check Out",
    cell: ({ row }) =>
      row.original.checkOut
        ? new Date(row.original.checkOut).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "-",
  },
  {
    accessorKey: "totalHours",
    header: "Hours Worked",
    cell: ({ row }) => (row.original.totalHours ?? 0).toFixed(2),
  },
];

// -------------------
// COMPONENT
// -------------------
export function AttendanceTable({ data }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="rounded-md border bg-card m-6 px-4 pt-4 sm:px-6 sm:pt-6">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-6"
              >
                No attendance records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
