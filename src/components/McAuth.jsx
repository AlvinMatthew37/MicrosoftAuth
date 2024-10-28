import React from "react";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';
import { loginRequest } from "../authConfig";

export default () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogout = (logoutType) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    }

    const handleLogin = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
    return (
        <>
            {isAuthenticated ? 
                <button onClick={() => handleLogout("redirect")}>
                    Sign Out
                </button> :
                <button onClick={() => handleLogin("redirect")}>
                    Sign in with Microsoft Azure
                </button> }
        </>
        
    )
};
