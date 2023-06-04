import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google"


export default NextAuth({
    providers : [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ], 
    secret: "c0d0447ef6754a014ff7fab8e1b26fcd",
    

})

