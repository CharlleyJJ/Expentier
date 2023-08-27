import React from "react";
import { useContext } from "react";
import { authContext } from '@/lib/store/auth-context.js';
import {FcGoogle} from "react-icons/fc"

function SignIn() {

const {googleLoginHandler} = useContext(authContext);

    return(
        <main className="container max-w-2xl px-6 mx-auto h-[95vh]  overflow-hidden" >
            <h1 className="mb-6 text-6xl font-bold text-center">Expense Tier 📜</h1>


            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
                <div className="h-[40vh]">
                    <img
                    className="object-cover w-full h-[40vh]"
                    src="https://i.ytimg.com/vi/C3Y72UoRFwM/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAAw0dfHzH0ISxE-Ynm_dDJzrsgRA"
                    />
                  

                </div>

                <div className="px-4 py-2">
                    <h3 className="text-2xl text-center">
                        Sign in now, for Free ! 
                    </h3>
                    
                </div>
                <small className=" pt-2 text-sm text-center"> Find out, who is your Balance Arch Nemesis !</small>
                <small className=" pt-2 text-md text-center text-gray-300"> Login using your account</small>

                <div className="px-4 pb-4">
                    <button onClick={googleLoginHandler} className="btn btn-primary-outline flex self-start gap-2 mx-auto mt-4 font-medium text-white align-middle">
                        <FcGoogle className="text-2xl"/>
                        Google
                    </button>
                </div>
            </div>

        </main>
    )
    
}

export default SignIn;