import { Link, json, useLoaderData, useParams } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const data = useLoaderData();

  const params = useParams();

  return (
    <>
      <EventItem event={data.event} />

      <p><Link to=".." relative='path'>Back</Link></p>
    </>
  );
}

export default EventDetailPage;
                                  //react router, passes an object to this loader function when executing it which contains two important pieces of data: 
                                    //A request property, which contains a request object, and a params property, which contains an object with all your route parameters.
export async function loader({request, params}) { //this is to load the event, which we could do with param and useEffect, or with this loader in the app.js(I think), or like this
  const id = params.eventId; //from the path from app.js if I get it well. 

  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({message: "Could not fetch details for selected event."}, { status: 500})
  } else {
    return response;
  }
}