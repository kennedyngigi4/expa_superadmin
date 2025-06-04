"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Agent = {
    uid: string
    name: string
    status: "active" | "inactive"
    email: string
    phone: string
    warehouse: string
    is_active: boolean
}

export const columns: ColumnDef<Agent>[] = [
    {
        accessorKey: "fullname",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "profiles.account_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Account Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        
    },
    {
        header: "Action",
        cell: ({row}) => {
            const uid = row?.original?.uid
            return (
                <Link href={`user/${uid}`}><MoreHorizontal className="h-4 w-4" /></Link>
            )
        }
    }
]
