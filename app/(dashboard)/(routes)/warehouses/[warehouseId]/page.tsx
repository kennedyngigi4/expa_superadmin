"use client"

import apiservices from '@/lib/apiservice';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from  "zod";
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormItem, FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';


const formSchema = z.object({
    name: z.string({ required_error: "Name is required"  }).min(2, { "message": "Warehouse name must be at least 2 characters"}),
    manager: z.string({ required_error: "Manager is required"  }),
    county: z.string({ required_error: "County is required" }),
    subcounty: z.string({ required_error: "Sub-county is required"  }),
    latitude: z.string({ required_error: "Latitude is required"  }),
    longitude: z.string({ required_error: "Longitude is required"  }),
    phone: z.string({ required_error: "Phone number is required"  }),
    email: z.string({ required_error: "Email address is required"  }),
    storage_type: z.string({ required_error: "Storage type is required"  }),
    status: z.string({ required_error: "Status is required"  }),
    description: z.string({}),
});

const WarehouseIdPage = () => {
    const { data:session, status } = useSession();
    const params = useParams();
    const [ warehouseData, setWarehouseData ] = useState<any>({});
    const [ employees, setEmployees ] = useState([]);

    useEffect(() => {
        const getData = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const res = await apiservices.get(`logistics/admin/warehouses/${params?.warehouseId}`, session.accessToken);
            setWarehouseData(res)
        }
        getData();
    }, [params, session]);


    useEffect(() => {
        const fetchEmployees = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const data = await apiservices.get("account/employees/", session.accessToken);
            setEmployees(data);
        }
        fetchEmployees();
    }, [session]);

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            manager: warehouseData?.managerdata?.uid,
            county: "",
            subcounty: "",
            longitude: "",
            latitude: "",
            email: "",
            phone: "",
            storage_type: "",
            status: "",
            description: ""
        }
    });

    const { isValid, isSubmitting } = form.formState;

    useEffect(() => {
        if(warehouseData){
            form.reset(warehouseData);
        }
    }, [warehouseData, form]);

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        if (!session?.accessToken) {
            throw new Error("You need to have a token, please login");
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("manager", values.manager);
        formData.append("county", values.county);
        formData.append("subcounty", values.subcounty);
        formData.append("longitude", values.longitude);
        formData.append("latitude", values.latitude);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("storage_type", values.storage_type);
        formData.append("status", values.status);
        formData.append("description", values.description);
        
        const res = await apiservices.patch(`logistics/admin/warehouses/${warehouseData?.wid}/`, session?.accessToken, formData);
        if(res){
            toast.success("Warehouse updated!", { position: "top-center" });
            window.location.reload();
        } else {
            toast.error("Something went wrong!", { position: "top-center" });
            window.location.reload();
        }
    }

  return (
    <>
        <div className="bg-slate-50 p-4 flex justify-between items-center">
            <div>
                  <Link href="/warehouses"><Button variant="ghost" className="pb-4 text-slate-400 cursor-pointer"><ArrowLeft /> Back to offices</Button></Link>
                  <h1 className="text-xl font-bold text-amber-600 p-2">{warehouseData?.name}</h1>
            </div>
            <div>
                <Link href={`/warehouses/${params?.warehouseId}/employees`}>
                    <Button className="cursor-pointer"><Users /> Employees</Button>
                </Link>
            </div>
        </div>
    
        <section className="p-6 w-full flex flex-col">
            <div className="flex flex-col py-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <div className="">
                            <FormField 
                                name="name"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Warehouse name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text"
                                                placeholder="e.g. Nairobi main warehouse"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField 
                                name="county"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>County</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text"
                                                placeholder="e.g. Nairobi"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="subcounty"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Sub-county</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. Westlands"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="latitude"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. 1.32432"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="longitude"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. 36.32432"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-1 gap-4">
                            <FormField 
                                name="manager"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Manager</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Assign Manager" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {employees.length > 0 && (
                                                        <>
                                                            {employees.map((employee: any) => (
                                                                <SelectItem key={employee.uid} value={employee.uid}>{employee.fullname}</SelectItem>
                                                            ))}
                                                        </>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. nairobiwarehouse@email.com"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="phone"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="e.g. +254 722 620 988"
                                                className=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>            
                        <div className="grid md:grid-cols-1 gap-4">
                            <FormField
                                name="storage_type"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Storage type</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose storage" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Cold Storage">Cold Storage</SelectItem>
                                                    <SelectItem value="Dry Storage">Dry Storage</SelectItem>
                                                    <SelectItem value="Mixed Storage">Mixed Storage</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-1 gap-4">
                            <FormField 
                                name="description"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Enter warehouse description here ..." 
                                                className=""
                                                {...field}    
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                                name="status"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Choose status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Active">Active</SelectItem>
                                                    <SelectItem value="Coming soon">Coming soon</SelectItem>
                                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                        </div>
                        <div>
                            <Button className="cursor-pointer" variant="default" type="submit">Save changes</Button>
                        </div>


                    </form>
                </Form>
            </div>
        </section>
    </>
  );
}

export default WarehouseIdPage