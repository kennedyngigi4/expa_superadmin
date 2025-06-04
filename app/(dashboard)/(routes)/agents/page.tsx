"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { columns, Agent } from './_components/columns'
import AddAgentModal from './_components/add_agent_modal'
import apiservices from '@/lib/apiservice'
import { useSession } from 'next-auth/react'
import { DataTable } from './_components/data-table'


const Agents = () => {
  const { data:session, status } = useSession();
  const [ employees, setEmployees ] = useState([]);

  useEffect(() => {
    const loadEmployees = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const data = await apiservices.get("account/employees/", session.accessToken);
      setEmployees(data)
    }
    loadEmployees();
  },[session]);

  return (
    <section className="p-6 flex flex-col">
      <div className="mt-1">
        <DataTable columns={columns} data={employees} />
      </div>
    </section>
  )
}

export default Agents