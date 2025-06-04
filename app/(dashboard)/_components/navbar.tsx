"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { User2 } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';

const Navbar = () => {
  const { data:session, status } = useSession();

  const handleLogout = async() => {
    await signOut();
  }

  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
        <div>

        </div>
        <div className="bg-amber-600 text-white p-2 rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger className='cursor-pointer'>
                <User2 className="w-4 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
  )
}

export default Navbar