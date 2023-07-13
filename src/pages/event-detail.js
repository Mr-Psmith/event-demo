import { Link, useParams } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <EventItem event={} />

      <p><Link to=".." relative='path'>Back</Link></p>
    </>
  );
}

export default EventDetailPage;

export async function loader({request, params}) {
  

  fetch("http://localhost:8080/events/");
}