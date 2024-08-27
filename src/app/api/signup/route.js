import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { auth, firestore } from "@/util/firebase";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
export async function POST(request) {
    
    const data=await request.json();
    const { firstName, lastName, mobileNo, email, password } = data;
    const listedProducts=[];
    const orders=[];
    const customers=[];
    const cart=[];
    const addresses=[];
    try{
        const userCreds= await createUserWithEmailAndPassword(auth,email,password);
        const userData= await addDoc(collection(firestore,"users"),{
            firstName, lastName, mobileNo, email,listedProducts,customers,cart,addresses,orders
        })
        return NextResponse.json({message:"User Created Successfully",data},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({error:error.message},{status:500});
    }
};