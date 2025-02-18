import dbconnect from "@/app/lib/dbconnect";
import UserModel from "@/app/models/User";
import bcrypt from 'bcrypt'

export async function POST(request:Request) {
    await dbconnect()

    try {
        const {username,email,password} = await request.json()
        const existinguser  =  await UserModel.findOne({
            username : true
        })
        const existinguserByemail  = await UserModel.findOne({email})
       if (existinguser){  
        return Response.json({
            success : true,
            message : "username already taken",
            status : 400,
        })
       }
       if(existinguserByemail){
        return Response.json({
            success : true,
            message : "This email is already registered",
            status : 400,
        })
       } 
         // if by email is not existing then , register the new man
         const hashedpass = bcrypt.hash(password,10)  
         const newUser = new UserModel(
           {
            username,
            email,
            password    ,
           }
         )
         await newUser.save()
       
       return Response.json({
        success : true,
        message : "User registered successfully"
      },{status : 200})

          } catch (error) {
        console.error("This error is in the signup post request",error)
        return Response.json({
            success : false,
            message : "This error is in the sign up page",
            status : 500,
        })
    }
}

// there is not a shit like const async respnse

// check for the username as it is verified or not , so that we can tell that , either the man can pick that username or not , afterward we can check through mail.
//check for the verificationby email , that is it is verified by mail or not , if verified return response verified but if not verified then create a new verificatio code for them to verify them if userbyemail is not existing , then create a new user