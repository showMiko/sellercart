"use client"
import { createContext,useContext, useEffect, useState } from "react";

export const DataContext=createContext();

export function ContextProvider({children})
{
    const [user,setUser]=useState();
    const values={user,setUser};
    return(
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}

export const useContextApi=()=>useContext(DataContext);
