import { firestore } from "@/util/firebase";
import { doc, getDoc } from "firebase/firestore";
// import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request,{params})
{
    // const data=request.json();
    const {productId}=params
    console.log(productId)
    // const {searchParams}=request.nextUrl;
    // const productId=searchParams('productId');

    try{
        const docRef=doc(firestore,"products",productId);
        const productDoc=await getDoc(docRef);
        const data=productDoc.data();
        // console.log(data,'from the individual product api')

        return NextResponse.json({data},{status:200});
    }
    catch(error)
    {
        return NextResponse.json({error},{status:500});
    }

}