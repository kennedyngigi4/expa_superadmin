"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Agent = {
    uid: string;
    fullname: string;
    email: string;
    phone: string;
    warehouse: string;
    category: string;
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
                    Full Name
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
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const category = row?.original?.category;
            return (
                <p className={cn("text-sm text-green-600", category == "Agent" && "text-orange-600")}>{category}</p>
            )
        }
    },
    {
        accessorKey: "warehouse",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Warehouse
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
                <Link href={`/user/${uid}`}><MoreHorizontal className="h-4 w-4" /></Link>
            )
        }
    }
]
