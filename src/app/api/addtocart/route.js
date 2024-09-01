// pages/api/updateProfile.js
import {  ref, uploadString, getDownloadURL } from "firebase/storage";
import {  arrayUnion, doc, updateDoc } from "firebase/firestore"; 
import { firestore, storage } from "@/util/firebase";
import { NextResponse } from "next/server";
import { useContextApi } from "@/context/context";


export async function POST(req)
{
    const data=await req.json();
    const { product,uid } = data;
        try {
            const userRef = doc(firestore, 'users', uid);
        await updateDoc(userRef, {
            cart: arrayUnion(product) // Add product ID to user's listed products
        });
            return NextResponse.json({message:"Added to Cart"},{status:200});
        } catch (error) {
            console.error('Error updating profile:', error);
            return NextResponse.json({message:"Failed to add to Cart"},{status:500});
        }
}