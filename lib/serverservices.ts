"use server"

import { signIn, signOut } from "@/auth"

export async function AdminLogin(email: string, password: string): Promise<any> {
    try {
        const res = await signIn('credentials', { email: email, password: password, redirect: false });
        if (res?.error) {
            return { "success": false, "message": "Email or Password is invalid!" }
        } else {
            return { "success": true, "message": "Login successful!" }
        }

    } catch (error) {
        return { "success": false, "message": "Something went wrong!" }
    }
}


export async function RegisterUser(userData: any, accessToken: any): Promise<any> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/account/register/`, {
            method: "POST",
            body: userData,
            headers: {
                "Authorization": `Token ${accessToken}`
            }
        });
        const data = await res.json()
        return { "success": true, "message": "Registration successful", "uid": data.uid }
    } catch (e) {
        return { "success": false, "message": "Something went wrong!" }
    }
}



export async function RegisterEmployee(userData: any, accessToken: any): Promise<any> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/account/admin/register_employee/`, {
            method: "POST",
            body: userData,
            headers: {
                "Authorization": `Token ${accessToken}`
            }
        });
        const data = await res.json()
        return { "success": true, "message": "Registration successful", "uid": data.uid }
    } catch (e) {
        return { "success": false, "message": "Something went wrong!" }
    }
}





