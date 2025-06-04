"use client"

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table'
import { columns, Warehouse } from './_components/columns'
import apiservices from '@/lib/apiservice'
import { useSession } from 'next-auth/react';


const Warehouses = () => {
  const { data:session, status } = useSession();
  const [warehouses, setWarehouses ] = useState([]);
  

  useEffect(() => {
    const loadWarehouses = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const data = await apiservices.get("logistics/admin/warehouses/", session.accessToken);
      console.log(data)
      setWarehouses(data);
      
    }

    loadWarehouses();
  }, [session]);

  return (
    <section className="p-6 flex flex-col">
      <div className="mt-1">
        <DataTable columns={columns} data={warehouses} />
      </div>
    </section>
  )
}

export default Warehouses