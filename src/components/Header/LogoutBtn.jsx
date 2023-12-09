import React from "react";
import authService from "../../appwrite_services/auth";
import { logout } from "../../redux_store/slices/authSlice";
import { useDispatch } from "react-redux";
import conf from "../../appwrite_config/config";
import { Client,Account } from "appwrite";

function LogoutBtn() {
    const dispatch = useDispatch();

    function logOutHandler() {
        // authService.LogOut().then(() => {
        //     dispatch(logout);
        // })
        const client = new Client();
        const account = new Account(client);
        client
            .setEndpoint(conf.aw_URL)
            .setProject(conf.aw_ProjectId);
        ;
        const promise = account.deleteSessions();
        promise.then(function (response) {
             dispatch(logout(response));
            console.log(response); // Success
            console.log("Logged Out.")
        }, function (error) {
           console.log("Falied In Logged Out")
        });
    }

    return (
        <>
            <button type="button" className="ml-3 focus:outline-none text-white bg-rose-500 mt-1 
           hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg
            text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 
            dark:focus:ring-purple-900" onClick={logOutHandler}>Log Out</button>
        </>
    )
}

export default LogoutBtn