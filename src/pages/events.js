import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
const data = useLoaderData();

//if (data.isError) {//so if the isError is truthy. Which I dont understadn, that why react understands here the data. part. Where does it come from?
 // return <p>{data.message}</p> //than we output the message set below. okeay this as well, only that WHERE DOUS THE DATA COME FROM. AND WHY IsNT MAX MENTIONING THIS?
//}
const events = data.events;

 return (
   <EventsList events={events} />
  );
}

export default EventsPage;

export async function loaderUpToUs() {
    const response = await fetch('http://localhost:8080/events');
            if (!response.ok) {
              //1return {isError: true, message: "Could not get any events."} this was too simple
              //2throw new Response(JSON.stringify({message: "could not fetch events."}), {status: 500} ); //when an error gets thrown in a loader react-router has a special reaction for this: it renders the closest error element.
                                    //we  can throw a new Response as well, and we need to call JSON.stringify if we want on obj there. /ans status: 500 shows that we have what kind of problem
              return json({message: "could not fetch events."},  //this is the same as abowe, except with less code, and we dont have to parse it in the error.js file
              { status: 500 });
            } else {     
                return response; //But we can just return the response like this and useLoaderData will then automatically give us the data that's part of the response.
                // const resData = await response.json();
                // return resData.events;
                // const res = new Response("any data", {status: 201}); // we can configure it with help of an extra object that can be set as a second argument.
                // return res;
            }
          };