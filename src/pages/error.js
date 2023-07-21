import { useRouteError } from "react-router-dom";
import PageContent from "../components/page-comp";
import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
    const error = useRouteError();

    let titlepr = "An error occured!";
    let messagepr= "This is much more helpful!";
    if (error.status === 500) {
        messagepr = error.data.message; //but we are keeping the title as we are not accessing it
    }               //JSON.parse() should be, but as we are using just the json()utilityFunct we can omit it here
    if(error.status === 404) {
        titlepr = "Not found!";
        messagepr = "Could not find resource or page.";
    }

    return( 
        <>
            <MainNavigation />
            <PageContent title={titlepr}>
                <p>{messagepr}</p>
            </PageContent>
        </>
    );
};

export default ErrorPage;