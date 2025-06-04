
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RegisterEmployee, RegisterUser } from '@/lib/serverservices';
import { useSession } from "next-auth/react";
import { toast } from 'sonner';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import apiservices from '@/lib/apiservice';



const AddAgentModal = () => {
  const { data: session, status } = useSession();
  const [ warehouses, setWarehouses ] = useState([]);
  const [ fullname, setFullname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ office, setOffice] = useState<any>("");
  const [ category, setCategory ] = useState("");
  


  useEffect(() => {
    const fetchOffices = async() => {
      if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
      }

      const res = await apiservices.get("logistics/admin/warehouses/", session.accessToken);
      setWarehouses(res);
      console.log(res);
    }
    fetchOffices();
  }, [session]);

  const handleRegistration = async() => {
    if(fullname !="" && email != "" && phone != ""){
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", "password123");
      formData.append("role", "Agent");
      formData.append("office", office);
      formData.append("category", category);
      
      const res = await RegisterEmployee(formData, session?.accessToken)
      if (res?.success){
        toast.success(res?.message, { position: "top-center" });
        window.location.reload();
      } else {
        toast.error(res?.message, { position: "top-center" });
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer"><PlusCircle /> Add Employee</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>Employees who work in EXPA offices.</DialogDescription>
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
            <Label htmlFor="office" className="pb-1">Office</Label>
            <Select onValueChange={(e) => setOffice(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose office" />
              </SelectTrigger>
              <SelectContent>
                {warehouses.length > 0 && (
                  <>
                    {warehouses.map((office: any) => (
                      <SelectItem key={office?.wid} value={office?.wid}>{office?.name}</SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
            
          </div>
          <div>
            <Label htmlFor="job" className="pb-1">Job category</Label>
            <Select onValueChange={(e) => setCategory(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Agent">Agent</SelectItem>
              </SelectContent>
            </Select>

          </div>
          <div>
            <Label htmlFor="password" className="pb-1">Password</Label>
            <Input type="text" className="w-full" value="pasword123" disabled />
          </div>
        </div>
        <DialogFooter className="flex">
          <Button className="cursor-pointer" onClick={handleRegistration} type="submit">Register</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddAgentModal