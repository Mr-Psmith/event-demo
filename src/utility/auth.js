import { redirect } from "react-router-dom";
import { gettokenDuration } from "../pages/authentication";

export function getAuthToken() {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return null; //as if nothing, than it is undefinded, which the loader wont return to the components
    }

    const tokenDuration = gettokenDuration();

    if (tokenDuration < 0) {
        return "EXPIRED";
    }


    return token;
};

export function tokenLoader() {
    return getAuthToken();
};

export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect("/auth"); //or redirect to an errior page?
    }

    return null;
};