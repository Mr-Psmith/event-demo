import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
  const searchParams = new URL(request.url).searchParams; //URL() is a built in method provided by the browser //searchParams was not accessible on its own as "this is not a component", but here it is accessible bec... dunno max doesnt care to explain shit
  const mode = searchParams.get("mode") || "login"; // || "login" means that "if this is undefined than be "login""

  if (mode !== "login" && mode !== "signup") { 
    throw json({message: "Unsupported mode"}, {status: 422});
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({message: "Could not authenticate user."}, {status: 500})
  }

  const resData = await response.json();
  const token= resData.token; // bec of the backend it contains the token

  localStorage.setItem("token", token); // here we store the token in the local Storage, I dont know whether is this safe enogh? so cant it be manipulated this way? Read from the outside?
  const expiration = new Date(); //built in obj
  expiration.setHours(expiration.getHours() + 1); //built in method //this creates a date 1 hour in the future
  localStorage.setItem("expiration", expiration.toISOString())


  return redirect("/");
};