"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import apiservices from '@/lib/apiservice';

const ClientsPage = () => {
    const { data:session, status } = useSession();
    const [ clients, setClients ] = useState([]);

    useEffect(() => {
        const loadClients = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const data = await apiservices.get("account/clients/", session.accessToken);
            
            setClients(data);
        }
        loadClients();
    }, [session]);

    return (
        <section className="flex flex-col p-6">
            <DataTable columns={columns} data={clients} />
        </section>
    )
}

export default ClientsPage