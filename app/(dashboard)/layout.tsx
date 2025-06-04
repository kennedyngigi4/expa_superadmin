"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from './_components/sidebar'
import Navbar from './_components/navbar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/modals/loader'


const DashboardLayout = ({
    children
}: { children: React.ReactNode }) => {

  const { data:session, status } = useSession();
  const [ isReady, setIsReady ] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(status === "loading") return;

    if(status === "unauthenticated"){
      router.push("auth/signin");
    } else {
      setIsReady(true);
    }
  }, [router, status]);

  if (!isReady) {
    return <Loader />;
  }

  return (
    <div className="h-full">
        <div className="h-[45px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
            <Sidebar />
        </div>
        <main className="md:pl-56 md:pt-[45px] h-full">
            {children}
        </main>
        
    </div>
  )
}

export default DashboardLayout