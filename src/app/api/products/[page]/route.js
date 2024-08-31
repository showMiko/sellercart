import { firestore } from "@/util/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { page = 1, limit: pageSize = 10 } = params; // Example of pagination
        const productsCollection = collection(firestore, "products");
        
        // Create a query to fetch products, ordered by price and limited by page size
        const productsQuery = query(productsCollection, orderBy("price"), limit(pageSize));
        const querySnapshot = await getDocs(productsQuery);
        
        const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
