"use client"

import { Boxes, CarFront, Contact, Landmark, Layout, Package, SignpostBigIcon, SlidersHorizontal, Users, Warehouse } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item';

const adminRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/",
    },
    {
        icon: Warehouse,
        label: "Offices",
        href: "/warehouses",
    },
    {
        icon: Users,
        label: "Employees",
        href: "/agents",
    },
    {
        icon: CarFront,
        label: "Drivers",
        href: "/drivers",
    },
    {
        icon: SignpostBigIcon,
        label: "Routes",
        href: "/routes",
    },
    {
        icon: Contact,
        label: "Clients",
        href: "/clients",
    },
    {
        icon: Package,
        label: "Orders",
        href: "/orders",
    },
    {
        icon: Boxes,
        label: "Deliveries",
        href: "/deliveries",
    },
    {
        icon: Landmark,
        label: "Payments",
        href: "/payments",
    },
    
    {
        icon: SlidersHorizontal,
        label: "Settings",
        href: "/settings",
    }
]


const SidebarRoutes = () => {
    const routes = adminRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem 
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes