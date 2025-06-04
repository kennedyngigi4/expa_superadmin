"use client"

import React, { useEffect, useState } from 'react';
import apiservices from '@/lib/apiservice';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { DataTable } from '../../../agents/_components/data-table';
import { columns } from './_components/columns';



const WarehouseEmployees = () => {
  const { data:session, status } = useSession(); 
  const params = useParams();
  const [ employees, setEmployees ] = useState([]);

  useEffect(() => {
    const fetchEmployees = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const resp = await apiservices.get(`logistics/admin/warehouse_employees/${params.warehouseId}/`, session?.accessToken);
      setEmployees(resp);
      
    }
    fetchEmployees();
  }, [session, params]);

  return (
    <section className="w-full min-h-screen p-6">
      <DataTable columns={columns} data={employees} />
    </section>
  )
}

export default WarehouseEmployees