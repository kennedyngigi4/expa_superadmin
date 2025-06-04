"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RegisterUser } from '@/lib/serverservices';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';

const AddDriverModal = () => {
  const { data: session, status } = useSession();
  const [ fullname, setFullname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ password, setPassword ] = useState("");


  const handleRegistration = async() => {
    if(fullname !="" && email != "" && phone != "" && password != ""){
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("role", "Driver");
      
      const res = await RegisterUser(formData, session?.accessToken)
      if (res?.success){
        toast.success(res?.message, { position: "top-center" });
        window.location.reload();
      } else {
        toast.error(res?.message, { position: "top-center" });
      }
    } else {
      toast.error("Fill all form fields", { position: "top-center" });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer"><PlusCircle /> Add Driver</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
          <DialogDescription>Driver registration.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="fullname" className="pb-1">Full Name</Label>
            <Input type="text" className="w-full" value={fullname} onChange={(e) => setFullname(e.target.value)} placeholder="e.g John Doe" />
          </div>
          <div>
            <Label htmlFor="email" className="pb-1">Email</Label>
            <Input type="email" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="e.g johndoe@gmail.com" />
          </div>
          <div>
            <Label htmlFor="phone" className="pb-1">Phone</Label>
            <Input type="tel" className="w-full" value={phone} onChange={(e) => setPhone(e.target.value)}  placeholder="e.g +254 722 620 988" />
          </div>
          <div>
            <Label htmlFor="password" className="pb-1">Password</Label>
            <Input type="password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="********" />
          </div>
        </div>
        <DialogFooter className="flex justify-center">
          <Button className="cursor-pointer" onClick={handleRegistration} type="submit">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDriverModal