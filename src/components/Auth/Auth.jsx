import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Auth = () => {
    const navigate = useNavigate();
    const [shown, setShown] = useState(false);
    const type = shown ? "text" : "password";
    const Icon = shown ? EyeIcon : EyeSlashIcon;

    const handleSubmit = (e) => {
        const companyID = e.target[0].value;
        const userID = e.target[1].value;
        const password = e.target[2].value;
        console.log(companyID + " " + userID + " " + password);
        navigate("/");
    }

    return(
        <div className="shadow-lg rounded-md border my-4 p-8 pt-4 mx-auto">
            <h1 className="text-center pb-4">Login</h1>
            <form className="grid grid-cols-2 gap-y-4" onSubmit={handleSubmit} autoComplete="false">
                <label>Company ID:</label>
                <input className="px-2 border rounded-md" type="text"/>
                <label>User ID:</label>
                <input className="px-2 border rounded-md" type="text"/>
                <div className="grid grid-cols-2 col-span-2">
                    <label>Password:</label>
                    <div className="border flex items-center rounded-md overflow-hidden">
                        <input className=" px-2 border-r outline-none" type={type}/>
                        <button onClick={() => setShown(!shown)} className="px-2 ">
                            <Icon className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
                <button className="col-span-2 border rounded-md" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Auth;