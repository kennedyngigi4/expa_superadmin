"use client"

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import apiservices from '@/lib/apiservice';
import { useSession } from 'next-auth/react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';


const formSchema = z.object({
  name: z.string({ "required_error": "Route name is required" }),
})


const RoutesPage = () => {
  const { data:session, status } = useSession();
  const [ routes, setRoutes ] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  })

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    if (!session?.accessToken) {
      throw new Error("You need to have a token, please login");
    }

    const res = await apiservices.post("logistics/admin/routes/", session.accessToken, values);
    if(res.success){
      toast.success(res.message, { position: "top-center" });
      window.location.reload();
    } else {
      toast.error(res.message, { position: "top-center" });
      window.location.reload();
    }
  }



  useEffect(() => {
    const fetchRoutes = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const res = await apiservices.get("logistics/admin/routes/", session.accessToken);
      setRoutes(res);
      
    }
    fetchRoutes();
  }, [session]);

  return (
    <section className="p-6 flex md:flex-row flex-col gap-5">
      <div className="md:basis-1/3">
        <div className="bg-slate-50 border-2 border-slate-100 p-5">
          <h1 className="font-bold">Add New Route</h1>
          <p className="text-sm">Route means the area of operation.</p>
          <div className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="bg-white w-full"
                          placeholder="e.g Nairobi - Kisumu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button disabled={!isValid || isSubmitting} className="cursor-pointer" size="sm">Create</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="md:basis-2/3">
            <DataTable data={routes} columns={columns} />
      </div>
    </section>
  )
}

export default RoutesPage