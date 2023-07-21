import { Await, defer, json, useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
const {events} = useLoaderData();

//if (data.isError) {//so if the isError is truthy. Which I dont understadn, that why react understands here the data. part. Where does it come from?
 // return <p>{data.message}</p> //than we output the message set below. okeay this as well, only that WHERE DOUS THE DATA COME FROM. AND WHY IsNT MAX MENTIONING THIS?
//}
//const events = data.events;

 return (
  //  <EventsList events={events} /> Bec of DEFER() we dont directly return this here, but:
  <Suspense fallback={<p style={{textAlign: "center"}}>Loading....</p>}> {/* component which can be used in certain situations to show a fallback whilst we're waiting for other data to arrive. */}
    <Await resolve={events} >
      {(loadedEventsPr) => <EventsList events={loadedEventsPr} />}
    </Await> {/* //And await has a special resolve prop which wants one of our deferred values as a value. */}
  </Suspense>
  );
}

export default EventsPage;

async function loadEvents() { //outsourcing the code from loaderfunctioninto into this separate function, into an async function, bec in the loader don't want to await promise  
  const response = await fetch('http://localhost:8080/events');   //instead we get rid of this async keyword and use a special function - The defer function.
            if (!response.ok) {
              //1return {isError: true, message: "Could not get any events."} this was too simple
              //2throw new Response(JSON.stringify({message: "could not fetch events."}), {status: 500} ); //when an error gets thrown in a loader react-router has a special reaction for this: it renders the closest error element.
                                    //we  can throw a new Response as well, and we need to call JSON.stringify if we want on obj there. /ans status: 500 shows that we have what kind of problem
              return json({message: "could not fetch events."},  //this is the same as abowe, except with less code, and we dont have to parse it in the error.js file
              { status: 500 });
            } else {
              //Have to manually parse bec of defer()
              const resData = await response.json();
              return resData.events;     
                //return response; //But we can just return the response like this and useLoaderData will then automatically give us the data that's part of the response.
                // const resData = await response.json();
                // return resData.events;
                // const res = new Response("any data", {status: 201}); // we can configure it with help of an extra object that can be set as a second argument.
                // return res;
            }
};

export function loaderUpToUs() {
    defer({
      events: loadEvents(), //loadEvents returns a promise - so data isnt there yet - store that promise under the events key in this object which we pass to defer.
    });
  };