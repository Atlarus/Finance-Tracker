import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const AccessPage = () => {
    const [companyID, setCompanyID] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [shown, setShown] = useState(false);
    const type = shown ? "text" : "password";
    const Icon = shown ? EyeIcon : EyeSlashIcon;

    const handleInsertUser = async () => {
        try {
          const response = await fetch(`http://localhost:3001/insert-user/${companyID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              UID: userID,
              password: password,
            }),
          });
    
          if (!response.ok) {
            const data = await response.json();
            console.error("User insertion failed:", data.message);
            // Handle the failure, show an error message, etc.
          } else {
            const data = await response.json();
            console.log("User inserted successfully. Inserted ID:", data.insertedId);
            // Handle success, perform other actions, etc.
          }
        } catch (error) {
          console.error("User insertion failed:", error.message);
          // Handle the failure, show an error message, etc.
        }
    };

    return (
        <div className="shadow-lg rounded-md border my-4 p-8 pt-4 mx-auto">
          <h1 className="text-center pb-4">Add New User</h1>
          <form className="grid grid-cols-2 gap-y-4" autoComplete="off">
            <label>User ID:</label>
            <input
              className="px-2 border rounded-md"
              type="text"
              onChange={(e) => setUserID(e.target.value)}
            />
            <div className="grid grid-cols-2 col-span-2">
              <label>Password:</label>
              <div className="border flex items-center rounded-md overflow-hidden">
                <input
                  className=" px-2 border-r outline-none"
                  type={type}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={(e) => {
                    e.preventDefault();
                    setShown(!shown);
                }} className="px-2 ">
                  <Icon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <button className="col-span-2 border rounded-md" type="button" onClick={handleInsertUser}>
              Insert User
            </button>
          </form>
        </div>
    );
};

export default AccessPage;