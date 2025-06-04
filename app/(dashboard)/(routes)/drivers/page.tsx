"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table'
import { columns, Driver } from './_components/columns'
import { PlusCircle } from 'lucide-react'
import AddDriverModal from './_components/add_driver_modal'
import apiservices from '@/lib/apiservice'
import { useSession } from 'next-auth/react'


const Agents = () => {
  const { data:session, status } = useSession();
  const [ drivers, setDrivers ] = useState([]);

  useEffect(() => {
    const loadEmployees = async () => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const data = await apiservices.get("account/drivers/", session?.accessToken);
      
      setDrivers(data)
    }
    loadEmployees();
  }, [session]);

  return (
    <section className="p-6 flex flex-col">
      

      <div className="mt-3">
        <DataTable columns={columns} data={drivers} />
      </div>
    </section>
  )
}

export default Agents