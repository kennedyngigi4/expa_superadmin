import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/account/login/`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });

                

                const user = await res.json();
                

                if (user.access) {
                    return user;
                }
                return null;

            }

        })
    ],


    session: {
        strategy: "jwt",
    },


    callbacks: {
        async jwt({ user, token }){
            if(user){
                token.accessToken = user?.access,
                token.id = user?.id,
                token.email = user?.email,
                token.name = user?.name
            }

            return token
        },

        async session({ session, token }){
            if(token){
                session.accessToken = token.accessToken as string,
                session.user.id = token.id as string,
                session.user.email = token.email as string,
                session.user.name = token.name as string
            }
            return session;
        }
    },


    pages: {
        signIn: "/auth/signin"
    }


})



