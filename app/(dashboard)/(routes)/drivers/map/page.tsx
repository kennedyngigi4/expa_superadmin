"use client"

import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useSession } from 'next-auth/react';
import apiservices from '@/lib/apiservice';


type Location = {
    latitude: any;
    longitude: any;
    vehicle_type: string;
    vehicle_registration: string;
}

type Driver = {
    uid: string;
    fullname: string;
    email: string;
    phone: string;
    iconUrl: string;
    driverlocation: Location;
};


const containerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: -1.2921,
    lng: 36.8219,
};

const DriversMap = () => {
    // const [locations, setLocations] = useState<Location[]>([]);
    const { data:session, status } = useSession();
    const [drivers, setDrivers] = useState<Driver[]>([]);
    
    useEffect(() => {
    const loadEmployees = async () => {
        if (!session?.accessToken) {
        throw new Error("You need to have a token, please login");
        }

        const data = await apiservices.get("account/drivers/", session?.accessToken);
        console.log(data);
        setDrivers(data)
    }
    loadEmployees();
    }, [session]);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    

    return isLoaded ? (
        <section className="h-screen">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
            {drivers.map((driver) => (
                <Marker
                    key={driver.uid}
                    // position={{ lat: loc.lat, lng: loc.lng }}
                    position={{ lat: driver.driverlocation.latitude, lng: driver.driverlocation.longitude }}
                    icon={{
                        url: `/icons/${driver.driverlocation.vehicle_type.toLowerCase()}.png`,
                        scaledSize: new window.google.maps.Size(35, 35),
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
    );
}

export default DriversMap