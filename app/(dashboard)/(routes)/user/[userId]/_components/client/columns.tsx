"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
    order_id: string;
    freight_type: string;
    delivery_type: string;
    price: string;
    shipment_type: string;
    recipient_location: string;
    items: any;
}

export const clientOrderColumns: ColumnDef<Driver>[] = [
    {
        accessorKey: "order_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "freight_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Freight Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "delivery_type",
        header: "Delivery Type"
    },
    {
        accessorKey: "recipient_location",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Destination
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({row}) => {
            const price = row?.original.price;
            const formattedPrice = parseInt(price).toLocaleString();

            return (
                <p>KShs. {formattedPrice}</p>
            );
        }
    },
]
