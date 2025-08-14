import { useState } from 'react';
import { createContext } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import {toast} from 'react-toastify';

export const AppContext =createContext();
const AppContextProvider = (props) => {

    const [credit,setCredit]=useState(false);
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const {getToken}=useAuth();
    const loadCreditsData=async(req,res)=>{
        console.log("Credits loaded successfully:");
       try {
    console.log("Token fetching...");
    const token = await getToken();
    console.log("Token:", token);

    console.log("Requesting credits...");
    const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } });
    console.log("Credits API Response:", data);

    if (data.success) {
        setCredit(data.credits);
        console.log("Credits loaded successfully:", data.credits);
    } else {
        console.warn("Credits API failed:", data.message);
        setCredit(0);
    }
} catch (error) {
    console.error("Error loading credits:", error);
    toast.error(error.message);
}


    }

    const value={
        credit,
        setCredit,
        loadCreditsData,
        backendUrl


    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;