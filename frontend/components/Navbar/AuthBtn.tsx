"use client";

import { signOut, useSession } from "next-auth/react";
import { PrimaryBtn, PrimaryBtn_Fn } from "../Buttons";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function AuthBtn(){

    const session = useSession();
    
    useEffect(()=>{
        console.log(session)
    },[])

    return <div className="flex">
        <PrimaryBtn_Fn onClick={()=>{
            session.data ? signOut() : signIn("google")
        }}>
            {
                session.data ? "Sign Out" : "Sign in with Google"
            }
        </PrimaryBtn_Fn>
        {session.data && <PrimaryBtn link="/dashboard">Dashboard</PrimaryBtn>}
    </div>
}