"use client"

import apiservices from '@/lib/apiservice';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const OrdersPage = () => {
  const { data:session, status } = useSession();
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    const loadOrders = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const resp = await apiservices.get("logistics/admin/orders", session.accessToken)
      setOrders(resp)
    }
    loadOrders();
  },[session]);

  return (
    <section className="flex flex-col p-6">
      <DataTable columns={columns} data={orders} />
    </section>
  )
}

export default OrdersPage