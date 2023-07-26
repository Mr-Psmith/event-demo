import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem("token"); //so for logouting we simply remove  the token from the localStroage, and return the user to the home page, 
    return redirect("/");
}