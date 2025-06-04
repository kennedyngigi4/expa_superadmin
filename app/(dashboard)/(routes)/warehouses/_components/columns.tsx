"use client"

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Warehouse = {
    wid: any;
    name: string;
    status: "coming" | "active" | "inactive";
    email: string;
    phone: string;
}

export const columns: ColumnDef<Warehouse>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (row) => {
            const status = row.getValue();
            return (
                <p className={cn("text-black capitalize", status === "Active" && "text-green-800 font-bold", status === "Inactive" && "text-red-600")}>
                    {status === "Active" && ( <>Active</>)}
                    {status === "Inactive" && (<>In-active</>)}
                </p>
            );
        }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        header: "Action",
        cell: ({row}) => {
            const { wid } = row?.original?.wid;
            return (
                <div>
                    <Link href={`/warehouses/${wid}`}><MoreHorizontal className="w-4 h-4" /></Link>
                </div>
            )
        }
    },
]


