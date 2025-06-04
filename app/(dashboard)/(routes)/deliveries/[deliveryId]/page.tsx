"use client"

import apiservices from '@/lib/apiservice'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapIcon } from 'lucide-react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'


type Location = {
    id: number;
    lat: number;
    lng: number;
    iconUrl: string;
    driverType: "motorbike" | "truck";
};


const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: -1.2921,
    lng: 36.8219,
};



const locations: Location[] = [
    {
        id: 1,
        lat: -1.2833,
        lng: 36.8167,
        iconUrl: "/icons/motorbike.png", // Motorbike icon
        driverType: "motorbike",
    },
];

const DeliveryIdPage = () => {
    const params = useParams()
    const { data:session, status } = useSession();
    const [ deliveryData, setDeliveryData ] = useState<any>({});

    useEffect(() => {
        const loadData = async() => {
            if (!session?.accessToken) {
                throw new Error("You need to have a token, please login");
            }


            const resp = await apiservices.get(`logistics/admin/delivery_details/${params?.deliveryId}/`, session?.accessToken);

            console.log(resp);

            setDeliveryData(resp)
        }
        loadData();
    }, [params?.deliveryId, session]);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    return (
        <section className="">

            <div className="grid md:grid-cols-12 grid-cols-1 bg-slate-50 p-10">
                <div className="md:col-span-8">
                    <h1 className="text-xl font-bold">{deliveryData?.waybill_number}</h1>

                    <div className="pt-7">
                        <h1 className="pb-3"><span className="font-bold">Delivery Stage:</span> {deliveryData?.delivery_stage}</h1>
                        <h1 className="pb-3"><span className="font-bold">Delivery Status:</span> {deliveryData?.delivery_stage}</h1>
                        <h1 className="pb-3"><span className="font-bold">Driver/ Rider:</span> {deliveryData?.delivery_stage}</h1>
                    </div>

                </div>
                <div className="md:col-span-4">
                    <div className='pb-4'>
                        <h1><span className="font-bold">Created:</span> {new Date(deliveryData?.created_at).toDateString()}</h1>
                        <h1><span className="font-bold">Updated:</span> {new Date(deliveryData?.updated_at).toDateString()}</h1>
                        
                    </div>
                    <Image src={deliveryData?.barcode_svg} width={200} height={100} className="mx-auto" alt="Barcode" />
                </div>
            </div>

            <div className="p-8">
                <h1 className='text-amber-600 font-bold text-xl'>Batch Items</h1>
                {deliveryData?.waybills?.map((item: any) => (
                    <div key={item.id} className='py-4 border-b-2 border-slate-100 grid md:grid-cols-5 grid-cols-2 gap-6'>
                        <div><p className="text-slate-500">Order Id</p> {item.order_id}</div>
                        <div><p className="text-slate-500">Freight type</p> {item.freight_type}</div>
                        <div>
                            <p className="text-slate-500">Sender</p>
                            <p className="text-sm">{item.sender_fullname} <br /> {item.sender_phone}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Recipient</p>
                            <p className="text-sm">{item.recipient_fullname} <br /> {item.recipient_phone}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Destination</p>
                            <p>{item?.recipient_location}</p>
                        </div>
                    </div>

                ))}
            </div>

            <div className="p-6">
                <h1 className='text-amber-600 font-bold text-xl flex pb-4'><MapIcon /> Route progress</h1>
                {isLoaded ? (
                        <section className="h-screen">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                            {locations.map((loc) => (
                                <Marker
                                    key={loc.id}
                                    // position={{ lat: loc.lat, lng: loc.lng }}
                                    position={{ lat: loc.lat, lng: loc.lng }}
                                    icon={{
                                        url: loc.iconUrl,
                                        scaledSize: new window.google.maps.Size(40, 40),
                                    }}
                                    onLoad={(marker) => {
                                        console.log("Loaded marker", marker);
                                    }}
                                />
                            ))}
                        </GoogleMap>
                        </section>
                    ) : (
                        <section className="flex items-center justify-center">Loading map...</section>
                    )
                }
            </div>

        </section>
    )
}

export default DeliveryIdPage