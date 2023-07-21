import { Await, Link, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventDetailPage() {
  const {event, events} = useRouteLoaderData("event-detail");

  //const params = useParams();

  return (
    <>
      <Suspense fallback={<p style={{textAlign: "center"}}>Loading....</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: "center"}}>Loading....</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
      <p><Link to=".." relative='path'>Back</Link></p>
    </>
  );
}

export default EventDetailPage;


async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({message: "Could not fetch details for selected event."}, { status: 500})
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
//copyed from events.js bec of defer controlling 
async function loadEvents() { 
  const response = await fetch('http://localhost:8080/events');
            if (!response.ok) {
              return json({message: "could not fetch events."},
              { status: 500 });
            } else {
              const resData = await response.json();
              return resData.events;     
            }
};

                                  //react router, passes an object to this loader function when executing it which contains two important pieces of data: 
                                    //A request property, which contains a request object, and a params property, which contains an object with all your route parameters.
export async function loader({request, params}) { //this is to load the event, which we could do with param and useEffect, or with this loader in the app.js(I think), or like this
  const id = params.eventId; //from the path from app.js if I get it well. 

  return defer({
    event: await loadEvent(id), //having async loader with the async function, simply adding the await keyword here, will make sure that defer waits for this data to be loaded before loading this page component at all
    events: loadEvents()          //So await can be a lever - switch for controlling which data should be awaited before moving to this page, and which data should be deferred
  });


  //the below code we put abowe in the loadEvent funct bec of defer
  // const response = await fetch("http://localhost:8080/events/" + id);
  // if (!response.ok) {
  //   throw json({message: "Could not fetch details for selected event."}, { status: 500})
  // } else {
  //   return response;
  // }
}

export async function action({params, request}) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method, //method: request.params is the dinamyc way, or method: "DELETE", is the hardcoded, 
  });

  if (!response.ok) {
    throw json({message: "Could not delete selected event."}, { status: 500})
  } else {
    return redirect("/events");
  }
}