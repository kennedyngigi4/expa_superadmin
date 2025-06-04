"use client"

import apiservices from '@/lib/apiservice'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'



const chartConfig = {
  orderscount: {
    label: "Orders count",
    color: "#2563eb",
  },
  deliveriescounts: {
    label: "Deliveries count",
    color: "#60a5fa",
  },
  
} satisfies ChartConfig

const Dashboard = () => {
  const { data:session, status } = useSession();
  const [ statsData, setStatsData ] = useState<any>([]);

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  useEffect(() => {
    const loadStatistics = async() => {
      if(!session?.accessToken){
        throw new Error("You need to have a token, please login");
      }

      const statistics = await apiservices.get("logistics/admin/statistics/", session.accessToken);
      setStatsData(statistics);
    }
    loadStatistics();
  }, [session]);

  return (
    <section className="flex flex-col p-6">

      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl text-amber-600">{statsData?.total_customers}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-black font-bold">Clients</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl text-amber-600">{statsData?.total_employees}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-black font-bold">Employees</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl text-amber-600">{statsData?.total_drivers}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-black font-bold">Drivers</CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl text-amber-600">{statsData?.total_orders}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-black font-bold">Orders</CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="w-full mt-10">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={statsData?.result}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="orderscount" fill="var(--color-orderscount)" radius={4} />
            <Bar dataKey="deliveriescounts" fill="var(--color-deliveriescounts)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </section>
  )
}

export default Dashboard