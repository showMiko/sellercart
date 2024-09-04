import { NextResponse } from "next/server";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/util/firebase";
// import { firestore } from "@/lib/firebase"; // Adjust the import based on your Firebase setup

export async function POST(req, { params }) {
    try {
        const data = await req.json();
        const { currentAddress, buyNowItems, uid,name } = data;
        console.log("Data Fetched From Frontend");
        
        // Step 1: Fetch the user document using uid
        const userDocRef = doc(firestore, "users", uid);
        const userDoc = await getDoc(userDocRef);
        
        if (!userDoc.exists()) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        
        const userData = userDoc.data();
        
        console.log("user Ref Found");
        // Step 2: Create a new order object
        const newOrder = {
            address: currentAddress,
            Items: buyNowItems,
        };
        
        await updateDoc(userDocRef, {
            orders: arrayUnion(newOrder) // Add product ID to user's listed products
        });
        console.log("Order Array Updated");

        for (const item of buyNowItems) {
            const listedByUid = item.listedBy; // Assuming ListedBy is a field in each item

            // Fetch the user who listed the item
            const listedByDocRef = doc(firestore, "users", listedByUid);
            const listedByDoc = await getDoc(listedByDocRef);

            if (listedByDoc.exists()) {
                const listedByData = listedByDoc.data();
                const newCustomerEntry = {
                    item: item,
                    address: currentAddress,
                    confirmed: false,
                    orderedBy: uid,
                    customerName:name
                };


                await updateDoc(listedByDocRef, {
                    customers: arrayUnion(newCustomerEntry) // Add product ID to user's listed products
                });
                console.log("Added to Sellers");
            }
        }

        return NextResponse.json({ message: "Success" }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
