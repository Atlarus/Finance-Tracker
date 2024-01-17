import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Auth = ({setIsAuthenticated}) => {
    const [shown, setShown] = useState(false);
    const type = shown ? "text" : "password";
    const Icon = shown ? EyeIcon : EyeSlashIcon;
    const [companyID, setCompanyID] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        console.log(companyID + " " + userID + " " + password);
        setIsAuthenticated(true);
    }

    return(
        <div className="shadow-lg rounded-md border my-4 p-8 pt-4 mx-auto">
            <h1 className="text-center pb-4">Login</h1>
            <form className="grid grid-cols-2 gap-y-4" autoComplete="off">
                <label>Company ID:</label>
                <input className="px-2 border rounded-md" type="text" onChange={(e) => setCompanyID(e.target.value)}/>
                <label>User ID:</label>
                <input className="px-2 border rounded-md" type="text" onChange={(e) => setUserID(e.target.value)}/>
                <div className="grid grid-cols-2 col-span-2">
                    <label>Password:</label>
                    <div className="border flex items-center rounded-md overflow-hidden">
                        <input className=" px-2 border-r outline-none" type={type} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={() => setShown(!shown)} className="px-2 ">
                            <Icon className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>
                <button className="col-span-2 border rounded-md" type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default Auth;