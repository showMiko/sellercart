// pages/api/updateProfile.js
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"; 
import { firestore, storage } from "@/util/firebase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { message } from "antd";

export async function POST(req) {
    const data = await req.json();
    const { values, uid } = data;
    // Generate a unique ID for each address
    const valuesWithId = {
        ...values,
        id: uuidv4() // Generate a unique ID using UUID
    };

    try {
        const userRef = doc(firestore, 'users', uid);
        await updateDoc(userRef, {
            addresses: arrayUnion(valuesWithId) // Spread operator to add each address
        });
        
        return NextResponse.json({ message: "Address Added" }, { status: 200 });
    } catch (error) {
        console.error('Error Adding Address', error);
        return NextResponse.json({ message: "Failed to add address" }, { status: 500 });
    }
}
export async function PUT(req) {
    const data = await req.json();
    const { values, id,uid} = data;
    // Generate a unique ID for each address

    try {
        const userRef = doc(firestore, 'users', uid);    
        const userSnap = await getDoc(userRef);

        const userData = userSnap.data();
        const addresses = userData.addresses || [];
        const addressIndex = addresses.findIndex(address => address.id === id);

        console.log(addressIndex, " index from the APi")

        if (addressIndex === -1) {
            return NextResponse.json({ message: "Address not found" }, { status: 404 });
        }

        // Update the address with new values
        addresses[addressIndex] = { ...addresses[addressIndex], ...values };

        // // Save the updated addresses array back to Firestore
        await updateDoc(userRef, { addresses });

        return NextResponse.json({ message: "Address Updated" }, { status: 200 });
    } catch (error) {
        console.error('Error Updating Address', error);
        return NextResponse.json({ message: "Failed to Edit Address" }, { status: 500 });
    }
}


export async function GET(request, { params }) {
    const { searchParams } = request.nextUrl;
    const uid = searchParams.get('uid'); // Get uid from query parameters
    console.log(uid, "from Get Api of Address");

    try {
        // Assuming you fetch user data from Firestore
        const docRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(docRef);
        const userData = userDoc.data();
        const addressData = userData.addresses;

        return NextResponse.json({ addressData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, {params})
{
    // const data=await request.json();
    // const {uid,id}=data;
    const { searchParams } = request.nextUrl;
    const uid = searchParams.get('uid');
    const id = searchParams.get('id');

    try {
        const docRef=doc(firestore,"users",uid);
        const userDoc=await getDoc(docRef);
        const userData=userDoc.data();
        const updatedAddresses = userData.addresses.filter(address => address.id !== id);
        await updateDoc(docRef,{
            addresses:updatedAddresses
        });

        return NextResponse.json({message:"Address Deleted Successfully"},{status:200});

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}