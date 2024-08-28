import { signInWithEmailAndPassword } from "firebase/auth";
import { auth} from "@/util/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
    
    const data=await request.json();
    const { email, password } = data;
    // console.log(email,password);
    try{
        const userCreds= await signInWithEmailAndPassword(auth,email,password);
        // console.log("Login User",userCreds);
        return NextResponse.json({message:"User LoggedIn Successfully",userCreds},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({error:error.message},{status:500});
    }
};