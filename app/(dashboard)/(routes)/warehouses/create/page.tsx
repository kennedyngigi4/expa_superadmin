"use client"

import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import apiservices from '@/lib/apiservice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const formSchema = z.object({
    name: z.string({ required_error: "Name is required"  }).min(2, { "message": "Warehouse name must be at least 2 characters"}),
    county: z.string({ required_error: "County is required" }),
    subcounty: z.string({ required_error: "Sub-county is required"  }),
    latitude: z.string({ required_error: "Latitude is required"  }),
    longitude: z.string({ required_error: "Longitude is required"  }),
    phone: z.string({ required_error: "Phone number is required"  }),
    email: z.string({ required_error: "Email address is required"  }),
    storage_type: z.string({ required_error: "Storage type is required"  }),
    status: z.string({ required_error: "Status is required"  }),
    description: z.string({}),
})

const CreateWarehouse = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [ employees, setEmployees ] = useState([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
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
    })

    const { isValid, isSubmitting } = form.formState;


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

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        if (!session?.accessToken) {
            throw new Error("You need to have a token, please login");
        }

        const res = await apiservices.post("logistics/admin/warehouses/", session.accessToken, values);
        
        if(res){
            toast.success(`${res.name} created`, { position: "top-center" })
            router.push(`/warehouses/${res.wid}`);
        } else {
            toast.error("Something went wrong", { position: "top-center" });
        }
    }

    return (
        <section className="p-6 w-2/3 mx-auto">
            <div className="flex flex-col items-start justify-center">
                <div className="mb-10">
                    <h1 className="text-xl font-bold text-orange-600">Add New Office/Agent</h1>
                    <p className="text-slate-500">Fill all required form fields</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                        <div className="">
                            <FormField 
                                name="name"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Office name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="text"
                                                placeholder="e.g. Nairobi main office"
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
                                                placeholder="e.g. nairobioffice@email.com"
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                                placeholder="Enter office description here ..." 
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
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Button disabled={!isValid || isSubmitting} className="cursor-pointer" variant="default" type="submit">Submit</Button>
                        </div>


                    </form>
                </Form>
            </div>
        </section>
    )
}

export default CreateWarehouse