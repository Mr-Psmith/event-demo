//import { useState } from 'react';
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() { 
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === 'submitting';

  //below state based solution is being switched of for a query based one
  // const [isLogin, setIsLogin] = useState(true);

  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => ( //lect 349. as max grinds this down as it is evident ofc
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}> 
          <Link to={`?mode${isLogin ? "=signup" : "=login"}`}> {/* MAX WROTE "signup" and "login" without = here, but it didnt work. with = it works */}
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
          {/* <button onClick={switchAuthHandler} type="button">
            {isLogin ? 'Create new user' : 'Login'}
          </button> */}
          {/* <button>Save</button> */}
        </div>
      </Form>
    </>
  );
}

export default AuthForm;

// ERROR! 
// Can't switch back to "Login" after switching to "create New User". I am sure that its a trivial problem to someone who knows what 's doing, 
// So this further strengthen the feeling that I would need a mentor of sorts if I want to work in the field
// For now I hope that it will sort out itself, and I go firther, as I cant find any error in my code. 
// It is either a code change in new react comparison to max's version, some deep logic err, or a problem so simple that I can't comprehend it yet.
  //SOLUTION: I puit an extra = before the login, and the signup, and nmow it switches, saves, etc. Just I dont understand clearly what I have done, and why id I need to do it