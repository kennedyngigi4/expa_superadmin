



const apiservices = {
    post: async function(url: string, accessToken: string, data: any): Promise<any>{
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${accessToken}`
                    },
                    body: JSON.stringify(data),
                });
                const response = await res.json();
                resolve(response);
            } catch(e){
                reject(e);
            }
        });
    },


    get: async function(url: string, accessToken: string): Promise<any>{
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "GET",
                headers: {
                    "Authorization": `Token ${accessToken}`,
                }
            });
            const data = await response.json()

            if(data){
                return data
            } else {
                return { "success": false, "message": "Something went wrong!" };
            }
        } catch(e) {
            return { "success": false, "message": e };
        }
    },


    patch: async function(url: string, accessToken: string, data: any): Promise<any>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Token ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await res.json();
            return { "success": true, "message": response };
        } catch(e) {
            return{ "success": false, "message": "Something went wrong" };
        }
    },


    delete: async function(url: string, accessToken: string): Promise<any>{
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/${url}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${accessToken}`,
                }
            });
            return res;
        } catch(e){
            return { "success": false, "message": "Something went wrong", }
        }
    }

}


export default apiservices;



