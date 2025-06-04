"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Agent = {
    id: string;
    shipment_number: string;
    shipment_type: string;
    total_shipment_stages: string;
    delivery_status: string;
    items: any;
    created_at: string;
}

export const AgentColumns: ColumnDef<Agent>[] = [
    {
        accessorKey: "shipment_number",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Shipment Number
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "shipment_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Shipment Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "total_shipment_stages",
        header: "Shipment Stages"
    },
    {
        accessorKey: "delivery_status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Delivery Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "items",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Orders
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const items = row?.original?.items;
            return (
                <p>{items?.length}</p>
            );
        }
    },
    {
        accessorKey: "created_at",
        header: "Date Created",
        cell: ({ row }) => {
            const createdAt = new Date(row?.original?.created_at).toDateString()
            return (
                <p>{createdAt}</p>
            )
        }
    },
]
