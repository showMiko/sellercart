import { firestore } from "@/util/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    try {
        // const url=new URL(request.url);
        const {userId}=params;
        // const userId = url.searchParams.get('userId');
        const docRef= doc(firestore,"users",userId);
        const userDoc=await getDoc(docRef);
        const data=userDoc.data()
        return NextResponse.json({data},{status:200});

    }
    catch(error)
    {
        return NextResponse.json(error);
    }
}
