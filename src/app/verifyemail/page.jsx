"use client"
import { useEffect } from 'react';
import { getAuth, applyActionCode } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { firestore } from "@/util/firebase";
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
    const router = useRouter();

    useEffect(() => {
        const verifyEmail = async () => {
            const auth = getAuth();
            const { oobCode } = router.query; // Extract oobCode from query parameters

            if (oobCode) {
                try {
                    // Apply the action code to verify the email
                    await applyActionCode(auth, oobCode);

                    // Now update the user's verification status in Firestore
                    const user = auth.currentUser;

                    if (user) {
                        const userDocRef = doc(firestore, "users", user.uid);
                        await updateDoc(userDocRef, { isVerified: true });

                        // Redirect to a success page
                        router.push('/verification-success');
                    } else {
                        console.error("No user is logged in.");
                    }
                } catch (error) {
                    console.error("Error verifying email:", error);
                }
            }
        };

        verifyEmail();
    }, [router]);

    return (
        <div>
            <h1>Verifying Email...</h1>
            <p>Please wait while we verify your email address.</p>
        </div>
    );
};

export default VerifyEmail;