"use client"
import axios from "axios";
import { createContext,useContext, useEffect, useState } from "react";

export const DataContext=createContext();

export function ContextProvider({children})
{
    const [userEmail,setUserEmail]=useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [addresses,setAddress]=useState([]);
    const [cart,setCart]=useState([]);
    const [customers,setCustomers]=useState([]);
    const [listedProducts,setListedProducts]=useState([]);
    const [orders,setOrders]=useState([]);
    const [email, setEmail] = useState('');
    const [userData,setUserData]=useState('');
    const [uid,setUid]=useState('');

    useEffect(() => {
        const fetchData=async(userId)=>{
            if (!userId) return;
        try {
            const response = await axios.get(`/api/userData/${userId}`)
            .then((response)=>setUserData(response.data.data))
            console.log("User Data Api Called from Context APi")
            
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        }
        setUserEmail(localStorage.getItem('email'));
        setUid(localStorage.getItem('uid'));
        if(userEmail!==null && uid!==null)
        {
            console.log(uid);
            fetchData(uid);
            console.log(userData);
        }
    }, [userEmail,uid]);
    const values={userEmail,setUserEmail,uid,setUid,userData};
    return(
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export const useContextApi=()=>useContext(DataContext);
