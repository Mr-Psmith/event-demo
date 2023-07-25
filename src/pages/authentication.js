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

  return redirect("/");
};