"use client"

import { Button } from '@/components/ui/button';
import apiservices from '@/lib/apiservice';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrderIdPage = () => {
    const params = useParams();
    const { data:session, status } = useSession();
    const [ orderData, setOrderData ] = useState<any>({});

    useEffect(() => {
        const loadData = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }

            const resp = await apiservices.get(`logistics/admin/order_details/${params.orderId}/`, session.accessToken);
            
            setOrderData(resp);
        }
        loadData();
    }, [session]);

    return (
        <section className="flex flex-col p-6">


            <div className="grid md:grid-cols-4 grid-cols-2 gap-10">
                <div>
                    <h1 className="text-amber-600 font-bold text-xl">{orderData?.order_id}</h1>
                    <p className="pt-3">{new Date(orderData?.created_at).toDateString()}</p>
                </div>
                <div>
                    <h1 className="font-bold pt-2">Sender</h1>
                    <p>{orderData?.sender_fullname}</p>
                    <p>{orderData?.sender_phone}</p>
                    <p>{orderData?.sender_email}</p>
                </div>
                <div>
                    <h1 className="font-bold pt-2">Recipient</h1>
                    <p>{orderData?.recipient_fullname}</p>
                    <p>{orderData?.recipient_phone}</p>
                    <p>{orderData?.recipient_email}</p>
                </div>
                <div>
                    {orderData?.details?.transaction_id != null
                        ? (<div className="flex flex-col space-y-3 pt-2">
                            <p>{new Date(orderData?.pickup_datetime).toLocaleString()}</p>
                            <p>{orderData?.pickup_location}</p>
                            {/* <Button className="cursor-pointer">Assign Pickup</Button> */}

                        </div>
                        )
                        : (<p className="text-red-600">Not Paid</p>)
                    }
                </div>
            </div>

            <div className="mt-8 py-6 border-t-4 border-slate-50">
                <h1 className="text-amber-600 font-semibold pb-3">Delivery details</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <div>
                        <h1>{orderData?.details?.delivery_stage}</h1>
                        <h1>{orderData?.details?.delivery_status}</h1>
                    </div>
                    <div>
                        <p className="text-amber-700">Pickup</p>
                        <h1>{orderData?.pickup_location}</h1>

                    </div>
                    <div>
                        <p className="text-amber-700">Destination</p>
                        <h1>{orderData?.recipient_location}</h1>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default OrderIdPage