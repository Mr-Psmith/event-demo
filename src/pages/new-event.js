import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {
  //sending data to server methods: 1.:
  //function submitHandler(event) {//submitevent of our form
  //event.preventDefault();
  //we could extract data from the form with help of two-way binding, or refs, for example. And, we could then manually send our HTDP request here, maybe manage some loading and error state, and ultimately navigate away from this page
  //}

  return <EventForm />;
}

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({message: "could not save event."}, {status: 500});
  }

  return redirect("/events");

}
