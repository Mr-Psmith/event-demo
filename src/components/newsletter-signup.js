import { Form, useFetcher } from "react-router-dom";
import classes from "./newsletter-signup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const {data, state} = fetcher; // we can get hold of the data, ansd a state value by obj destructuring. state val can be the "idle", "loading" or "submitting" like with useNavigation

  useEffect(() => {
    if (state === "idle" && data && data.message) { //so if we are idle, and we got a data with a message property
    window.alert("Signup succesful!");
    }
    }, [data,state])

  return (
    <fetcher.Form method="post" action="/newsletter" className={classes.newsletter}> {/* We used this with the newsletter part of our app where with Form we could automatically trigger the newsletter signup action, but the problem is that every time we would be forwarded to the main signup page, instead of just taking the email, oszt okay. useFetcher solves this*/} 
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;