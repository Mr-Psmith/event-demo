import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
const data = useLoaderData();
const events = data.events;

 return (
   <EventsList events={events} />
  );
}

export default EventsPage;

export async function loaderUpToUs() {
    const response = await fetch('http://localhost:8080/events');
            if (!response.ok) {
              //setError('Fetching events failed.');
            } else {
                return response; //But we can just return the response like this and useLoaderData will then automatically give us the data that's part of the response.
                // const resData = await response.json();
                // return resData.events;
                // const res = new Response("any data", {status: 201}); // we can configure it with help of an extra object that can be set as a second argument.
                // return res;
            }
          };