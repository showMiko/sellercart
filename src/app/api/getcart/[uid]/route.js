import { firestore } from "@/util/firebase";
import { collection, getDocs, query, orderBy, limit, getDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const {uid}=params;
    try {
        // const {uid}=params;
        const docRef= doc(firestore,"users",uid);
        const userDoc=await getDoc(docRef);

        const cart=userDoc.data().cart;

        return NextResponse.json({ cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
