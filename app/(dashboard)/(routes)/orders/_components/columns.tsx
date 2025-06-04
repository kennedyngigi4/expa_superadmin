"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
    id: string;
    order_number: string;
    order_id: string;
    transaction_id: string;
    sender_fullname: string;
    details: any;
}

export const columns: ColumnDef<Driver>[] = [
    {
        accessorKey: "order_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    No.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "order_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Waybill Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "transaction_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Payment
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const transactionId = row?.original?.details?.transaction_id;
            return(
                <div>{transactionId ? (<p className="text-green-600">{transactionId}</p>) : (<p className="text-red-600">Not Paid</p>)}</div>
            )
        }
    },
    {
        accessorKey: "sender_fullname",
        header: "Sender"
    },
    {
        header: "Action",
        cell: ({row}) => {
            const id = row?.original?.id
            return (
                <Link href={`/orders/${id}`}><MoreHorizontal className="h-4 w-4" /></Link>
            )
        }
    }
]
