"use client"

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import apiservices from '@/lib/apiservice';

const DeliveriesPage = () => {
  const { data:session, status } = useSession();
  const [ deliveries, setDeliveries ] = useState([]);

  useEffect(() => {
    const loadDeliveries = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const res = await apiservices.get("logistics/admin/deliveries/", session.accessToken);
      console.log(res);
      setDeliveries(res);
    }
    loadDeliveries();
  }, [session]);

  return (
    <section className="flex flex-col p-6">
      <DataTable columns={columns} data={deliveries} />
    </section>
  )
}

export default DeliveriesPage