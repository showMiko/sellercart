import { firestore } from "@/util/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function PUT(request,{params})
{

    const {itemId,uid}=params
    console.log(itemId,"   ",uid)

    try{
        const docRef=doc(firestore,"users",uid);
        const userDoc=await getDoc(docRef);
        const data=userDoc.data();
        const cart=data.cart;
        const index = parseInt(itemId, 10);
        if (isNaN(index) || index < 0 || index >= cart.length) {
            return NextResponse.json({ error: "Invalid item index" }, { status: 400 });
        }
        // console.log("not a Invalid No");

        // Remove the item from the cart
        cart.splice(index, 1);
        // console.log(cart, " is the new Cart arr");

        // Update the user document with the new cart
        await updateDoc(docRef, { cart });

        return NextResponse.json({ cart }, { status: 200 });
    }
    catch(error)
    {
        return NextResponse.json({error},{status:500});
    }

}