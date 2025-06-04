"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const SettingsPage = () => {
  return (
    <section className="flex flex-col p-6">
      <h1 className="text-amber-600 text-2xl font-bold">All Settings</h1>

      <div className="mt-8 py-3">
        <h1 className="text-amber-600 text-lg font-semibold pb-1 mb-5 border-b-2 border-slate-100">Payment</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
            <h1 className="text-sm text-slate-500 pb-2">Till Number</h1>
            <div>
              <Input  className="bg-white" placeholder="e.g 173646" />
            </div>
            <div className="mt-3">
              <Button>Save</Button>
            </div>
          </div>
          <div className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
            <h1 className="text-sm text-slate-500 pb-2">Price for 1CBM</h1>
            <div>
              <Input className="bg-white" placeholder="e.g 20000" />
            </div>
            <div className="mt-3">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-8 py-3">
        <h1 className="text-amber-600 text-lg font-semibold pb-1 mb-5 border-b-2 border-slate-100">Messaging</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
            <h1 className="text-sm text-slate-500 pb-2">Sender ID</h1>
            <div>
              <Input className="bg-white" placeholder="e.g EX90ADRES" />
            </div>
            <div className="mt-3">
              <Button>Save</Button>
            </div>
          </div>
          <div className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
            <h1 className="text-sm text-slate-500 pb-2">Email</h1>
            <div>
              <Input className="bg-white" placeholder="e.g email@expa.co.ke" />
            </div>
            <div className="mt-3">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>


      <div className="mt-8 py-3">
        <h1 className="text-amber-600 text-lg font-semibold pb-1 mb-5 border-b-2 border-slate-100">Contacts</h1>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
          <div className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
            <h1 className="text-sm text-slate-500 pb-2">Phone</h1>
            <div>
              <Input className="bg-white" placeholder="e.g 0722 620 988" />
            </div>
            <div className="mt-3">
              <Button>Save</Button>
            </div>
          </div>
          <div className="w-full bg-slate-50 border-2 border-slate-200 p-4 rounded-lg">
            <h1 className="text-sm text-slate-500 pb-2">Email</h1>
            <div>
              <Input className="bg-white" placeholder="e.g email@expa.co.ke" />
            </div>
            <div className="mt-3">
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SettingsPage