import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from "@/util/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.json();
    const { firstName, lastName, mobileNo, email, password } = data;
    const listedProducts = [];
    const orders = [];
    const customers = [];
    const cart = [];
    const addresses = [];
    try {
        // Create user with email and password
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        const userId =userCreds.user.uid;
        // console.log(userId,"From the Api Call");
        
        // Send email verification
        await sendEmailVerification(userCreds.user);


        // Store user data in Firestore with a verification flag
        const docRef=doc(firestore,'users',userId);
        await setDoc(docRef,{firstName,
            lastName,
            mobileNo,
            email,
            listedProducts,
            customers,
            cart,
            addresses,
            orders,
            pprofileImage:null,
            isVerified: false })
        return NextResponse.json({ message: "User Created Successfully. Please verify your email.", userCreds }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
