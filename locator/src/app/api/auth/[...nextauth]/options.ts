import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import dbconnect from "@/app/lib/dbconnect";
import UserModel from "@/app/models/User";



export const authOptions : NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name : "credentials",
            credentials : {
                email : {label : "email",type : "text"},
                password: { label: "password", type: "password" }
            },
            async authorize(credentials : any): Promise<any>{
                await dbconnect()
                try {
                    console.log("The email u are checking is :" + credentials.email)
                    const user = await UserModel.findOne({
                        $or:[{email : credentials.email}]
                    })
                    if(!user){
                        throw new Error("No user exists with this email")
                    } else{
                        const ispasscorrect = credentials.password == user.password; 
                        if(ispasscorrect){
                            return user
                        } else{
                            throw new Error("Incorrect password")
                        }
                    }
                } catch (e:any) {
                    throw new Error(e)
                }
            }
        })
    ],
    callbacks :{
        async session ({session,token}){
            if(token){
                session.user._id = token._id,
                session.user.username = token.username
            }
            return session
        },
        async jwt ({token,user}){
            if(user){
                token._id = user._id?.toString();
                token.username = user.username;
            }
            return token
        }
    },
    pages : {
        signIn : '/sign-in'
    },
    session :{
        strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET
}