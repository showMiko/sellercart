// pages/api/addProduct.js
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore"; 
import { firestore, storage } from "@/util/firebase";
import { NextResponse } from "next/server";

export async function POST(req) {
    const data = await req.json();
    const { productName, category, description, price, listedBy, images } = data;
    
    
    try {
        // Step 1: Store product data in Firestore
        // const productRef=doc(collection(firestore,"products"));
        const productRef=await addDoc(collection(firestore,'products'),
        
            {
                productName,
                category,
                description,
                price,
                listedBy,
            }
        )
        
        const productId=productRef.id;
        // console.log("Product Added to Product DB")

        // Step 2: Upload images to Firebase Storage
        const imageRefs = [];
        const userFolderRef = `products/${listedBy}/${productId}/`; // Folder structure

        for (let index = 0; index < images.length; index++) {
            const image = images[index];
            const imageRef = ref(storage, `${userFolderRef}image_${index}`); // Use index for image name
            await uploadString(imageRef, image, 'data_url');
        
            // Get the download URL
            const imageUrl = await getDownloadURL(imageRef);
            imageRefs.push(imageUrl);
        }

        // Step 3: Update Firestore with image references
        await updateDoc(productRef, {
            productImages: imageRefs,
        });

        // console.log("Product Image Ref added to Products DB")

        const userProductsAddition={
            imageRefs,
            productName,
            category,
            description,
            price,
            productId,
            listedBy    
        }
        // Step 4: Update user's listed products
        const userRef = doc(firestore, 'users', listedBy);
        await updateDoc(userRef, {
            listedProducts: arrayUnion(userProductsAddition) // Add product ID to user's listed products
        });

        // console.log("Product red added to users");

        return NextResponse.json({ message: "Product added successfully", productId }, { status: 200 });
    } catch (error) {
        console.error('Error adding product:', error);
        return NextResponse.json({ message: "Failed to add product" }, { status: 500 });
    }
}
