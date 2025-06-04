"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Driver = {
    shipment_number: string;
    routename: string;
    partner_sharing: boolean;
    partner: string;
    shipment_type: string;
    delivery_status: string;
    items: any;
}

export const columns: ColumnDef<Driver>[] = [
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
        accessorKey: "routename",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Route Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "partner_sharing",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Partner Sharing
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const sharing = row?.getValue("partner_sharing");
            
            return(
                <p className="align-center">{sharing ? (<>Yes</>) : (<>No</>)}</p>
            );
        }
    },
    {
        accessorKey: "shipment_type",
        header: "Shipment Type"
    },
    {
        accessorKey: "delivery_status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        header: "Items",
        cell: ({row}) => {
            const items = row?.original?.items
            return (
                <p>{items.length}</p>
            )
        }
    }
]
