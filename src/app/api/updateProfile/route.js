// pages/api/updateProfile.js
import {  ref, uploadString, getDownloadURL } from "firebase/storage";
import {  doc, updateDoc } from "firebase/firestore"; 
import { firestore, storage } from "@/util/firebase";
import { NextResponse } from "next/server";
import { useContextApi } from "@/context/context";


export async function PUT(req)
{
    const data=await req.json();
    const { uid, values, avatar,profileImage } = data;
    // const {userData}=useContextApi();
        try {
            // console.log("Init")
            let profileImageUrl=profileImage;
            if(avatar)
            {
                // console.log(avatar, "from Route Js")
                // console.log(profileImageUrl);
                const imageRef = ref(storage, `profileImages/${uid}`);
                // console.log("imageRef made")
                await uploadString(imageRef, avatar, 'data_url');
                // console.log("Image uploaded")
                profileImageUrl = await getDownloadURL(imageRef);
                // console.log("Getting Url")
            }
            const userRef = doc(firestore, 'users', uid);
            // console.log("Uploading Doc")
            await updateDoc(userRef, {
                ...values,
                profileImage: profileImageUrl, // Add the profileImage field
            });
            return NextResponse.json({message:"Updated Successfully"},{status:200});
        } catch (error) {
            console.error('Error updating profile:', error);
            return NextResponse.json({message:"Failed Operation"},{status:500});
        }
}