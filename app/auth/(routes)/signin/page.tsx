"use client"

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from "react-hook-form"
import { Form, FormField, FormControl, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminLogin } from '@/lib/serverservices';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Eye, EyeClosed } from 'lucide-react';


const formSchema = z.object({
    email: z.string({ "required_error": "Email is required"}).email({ "message": "Invalid email address"}),
    password: z.string({ "required_error": "Password is required"}).min(8, { "message": "Password must be at least 8 characters"}),
})

const SigninPage = () => {
    const router = useRouter()
    const [ passwordType, setPasswordType ] = useState(false);
    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        const res = await AdminLogin(values.email, values.password)
        console.log(res)
        if(res.success){
            toast.success(res.message, { position: "top-center" });
            window.location.href = "/";
        }else {
            toast.error(res.message, { position: "top-center" })
        }
    }


  return (
    <section className="flex flex-col justify-center items-center h-screen">
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:w-1/4 w-3/4 shadow p-5 bg-white rounded-2xl">
                <div>
                    <h1 className="font-semibold text-xl text-amber-600 self-center">Login</h1>
                    <p className="pb-4 text-sm">Welcome back to <span className="text-amber-600">EXPA</span></p>
                </div>
                <FormField 
                    name="email"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    type="email"
                                    placeholder="e.g. johndoe@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type={passwordType ? "text" : "password"}
                                        placeholder="********"
                                        {...field}
                                    />
                                    <div className="absolute z-50 right-3 top-3" onClick={() => setPasswordType((prev) => !prev)}>
                                        {passwordType ? <><Eye className="w-4 h-4 text-slate-500" /></> : <><EyeClosed className="w-4 h-4  text-slate-500" /></>}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="w-full">
                    <Button className="w-full cursor-pointer">Login</Button>
                </div>
            </form>
        </Form>
    </section>
  )
}

export default SigninPage