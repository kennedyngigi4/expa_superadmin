"use client"

import { Button } from "@/components/ui/button"
import apiservices from "@/lib/apiservice"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
    id: string
    name: string
    
}

export const columns: ColumnDef<Driver>[] = [
    {
        accessorKey: "id",
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Route
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        header: "Action",
        cell: ({row}) => {
            const { data:session, status } = useSession();
            const id = row?.original?.id;

            const handleDelete = async() => {
                if (!session?.accessToken) {
                    throw new Error("You need to have a token, please login");
                }

                const res = await apiservices.delete(`logistics/admin/routes/${id}/`, session.accessToken);
                window.location.reload();
            }

            return (
                <Button variant="ghost" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
            )
        }
    }
]
