import React from "react";

const Auth = () => {
    return(
        <div className="shadow-lg rounded-md border my-4 p-8 pt-4 mx-auto">
            <h1 className="text-center pb-4">Login</h1>
            <form className="grid grid-cols-2 gap-4">
                <label>Company ID:</label>
                <input className="border rounded-md" type="text"/>
                <label>User ID:</label>
                <input className="border rounded-md" type="text"/>
                <label>Password:</label>
                <input className="border rounded-md" type="password"/>
                <button className="col-span-2 border rounded-md" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Auth;