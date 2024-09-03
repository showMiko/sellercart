// pages/api/updateProfile.js
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"; 
import { firestore, storage } from "@/util/firebase";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { message } from "antd";

export async function GET(request, { params }) {
    const { searchParams } = request.nextUrl;
    const uid = searchParams.get('uid'); // Get uid from query parameters
    // console.log(uid, "from Get Api of Address");

    try {
        // Assuming you fetch user data from Firestore
        const docRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(docRef);
        const userData = userDoc.data();
        const cartData = userData.cart;

        return NextResponse.json({ cartData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}