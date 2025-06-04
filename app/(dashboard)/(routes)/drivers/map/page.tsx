"use client"

import React, { useEffect, useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"


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
    {
        id: 2,
        lat: -1.2950,
        lng: 36.8220,
        iconUrl: "/icons/motorbike.png",
        driverType: "motorbike",
    },
    {
        id: 3,
        lat: -1.3001,
        lng: 36.8085,
        iconUrl: "/icons/truck.png", // Truck icon
        driverType: "truck",
    },
    {
        id: 4,
        lat: -1.2700,
        lng: 36.8300,
        iconUrl: "/icons/truck.png",
        driverType: "truck",
    },
    {
        id: 5,
        lat: -1.2788,
        lng: 36.8169,
        iconUrl: "/icons/motorbike.png",
        driverType: "motorbike",
    },
];





const DriversMap = () => {
    // const [locations, setLocations] = useState<Location[]>([]);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    

    return isLoaded ? (
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
    );
}

export default DriversMap