"use client"

import apiservices from '@/lib/apiservice';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DataTable } from './_components/driver/data-table';
import { columns } from './_components/driver/columns';
import { clientOrderColumns } from './_components/client/columns';
import { AgentColumns } from './_components/agent/columns';
import UserModal from './_components/user_modal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import { toast } from 'sonner';

const UserIdPage = () => {
    const params = useParams()
    const { data:session, status } = useSession();
    const [ userData, setUserData ] = useState<any>({});
    const [ shipments, setShipments ] = useState([]);
    const [ clientOrders, setClientOrders ] = useState([]);
    const [ clientAccountType, setClientAccountType ] = useState("");

    const [ driverVehicleType, setDriverVehicleType ] = useState("");
    const [ driverVehicleReg, setDriverVehicleReg ] = useState("");
    const [ driverActiveBlock, setDriverActiveBlock] = useState("");


    useEffect(() => {
        const loadUser = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const resp = await apiservices.get(`account/user_details/${params?.userId}/`, session.accessToken);
            setUserData(resp);
            if (userData?.profiles?.account_type) {
                setClientAccountType(userData?.profiles?.account_type);
            }
        }
        loadUser();
    }, [params?.userId, session]);


    useEffect(() => {
        const fetchShipments = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const res = await apiservices.get(`logistics/admin/courier/${params?.userId}/shipments/`, session.accessToken);
            
            setShipments(res);
        }
        fetchShipments();
    }, [session, params]);



    useEffect(() => {
        const fetchClientOrders = async () => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const res = await apiservices.get(`logistics/admin/client/${params?.userId}/orders/`, session.accessToken);
            
            setClientOrders(res);
        }
        fetchClientOrders();
    }, [session, params]);


    const handleClientTypeUpdate = async() => {
        const data = {
            profiles: {
                "account_type": clientAccountType,
            }
        }

        if (!session?.accessToken) {
            throw new Error("You need to have a token, please login");
        }

        const res = await apiservices.patch(`account/admin/updateuser/${params?.userId}/`, session.accessToken, data);
        if(res.success){
            toast.success("Updated", { position: "top-center" });
            window.location.reload();
        } else {
            toast.error("Failed, try again.", { position: "top-center" });
            window.location.reload();
        }
    }


    const handleDriverUpdate = async() => {
        const data = {
            "is_active": driverActiveBlock,
            driverlocation: {
                "vehicle_type": driverVehicleType,
                "vehicle_registration": driverVehicleReg,

            }
        }

        if (!session?.accessToken) {
            throw new Error("You need to have a token, please login");
        }

        const res = await apiservices.patch(`account/admin/updateuser/${params?.userId}/`, session.accessToken, data);
        if (res.success) {
            toast.success("Updated", { position: "top-center" });
            window.location.reload();
        } else {
            toast.error("Failed, try again.", { position: "top-center" });
            window.location.reload();
        }
    }

    return (
        <section className="p-6">
            <div className="grid md:grid-cols-3 grid-cols-1">
                <div>
                    <h1 className="font-bold text-amber-600 text-2xl mb-3">{userData?.fullname}</h1>
                    
                </div>
                <div>
                    <h1 className="">{userData?.email}</h1>
                    <h1 className="">{userData?.phone}</h1>
                </div>
                <div>
                    <h1 className="text-amber-600 font-bold">{userData?.role}</h1>
                    
                    {userData?.role == "Agent" && (
                        <>
                            <h2>{userData?.profiles?.category}</h2>
                            <h2>{userData?.profiles?.warehousename}</h2>
                            
                        </>
                    )}

                    {userData?.role == "Driver" && (
                        <>
                            <h2>{userData?.driverlocation?.vehicle_type}</h2>
                            <h2>{userData?.driverlocation?.vehicle_registration}</h2>
                            <h1>{userData?.profiles?.account_type}</h1>

                            <UserModal
                                triggerText="Edit Profile"
                                triggerIcon={Edit}
                                title="Driver Profile"
                                description="Make some changes to driver profile"
                                buttonText="Save"
                                onClick={handleDriverUpdate}
                            >
                                <form>
                                    <div className="pb-4">
                                        <Label className="pb-2">Vehicle Type</Label>
                                        <Select onValueChange={setDriverVehicleType} value={driverVehicleType}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Motorbike">Motorbike</SelectItem>
                                                <SelectItem value="Car">Car</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="pb-4"> 
                                        <Label className="pb-2">Vehicle Registration</Label>
                                        <Input type="text" onChange={(e) => setDriverVehicleReg(e.target.value)} placeholder="e.g. KDT123P" />
                                    </div>
                                    <div className="pb-4">
                                        <Label className="pb-2">Activate or Block</Label>
                                        <Select onValueChange={setDriverActiveBlock} value={driverActiveBlock}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="True">Activate</SelectItem>
                                                <SelectItem value="False">Block</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </form>
                            </UserModal>
                        </>
                    )}

                    {userData?.role == "Client" && (
                        <>
                            <UserModal
                                triggerText={userData?.profiles?.account_type}
                                triggerIcon={Edit}
                                title="Profile"
                                description="Make some changes to client profile"
                                buttonText="Save"
                                onClick={handleClientTypeUpdate}
                            >
                                <form>
                                    <Label className="pb-2">Account Type</Label>
                                    <Select onValueChange={setClientAccountType} value={clientAccountType}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Business">Business</SelectItem>
                                            <SelectItem value="Personal">Personal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </form>
                            </UserModal>
                        </>
                    )}
                    
                </div>
            </div>


            {userData?.role == "Agent" && (
                <div className="w-full pt-8 pb-3">
                    <h1 className="text-lg text-orange-400 pb-3">{shipments.length} Shipments Created</h1>

                    <DataTable columns={AgentColumns} data={shipments} />
                </div>
            )}
        
            
            {userData?.role == "Driver" && (
                <div className="w-full pt-8 pb-3">
                    <h1 className="text-lg text-orange-400 pb-3">{shipments.length} Assigned Shipments</h1>

                    <DataTable columns={columns} data={shipments} />
                </div>
            )}


            {userData?.role == "Client" && (
                <div className="w-full pt-8 pb-3">
                    <h1 className="text-lg text-orange-400 pb-3">{clientOrders.length} Orders Placed</h1>

                    <DataTable columns={clientOrderColumns} data={clientOrders} />
                </div>
            )}


        </section>
    )
}

export default UserIdPage