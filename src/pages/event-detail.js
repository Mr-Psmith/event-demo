import { useParams } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <EventItem event={} />
    </>
  );
}

export default EventDetailPage;

export async function loader({request, params}) {
  
  fetch("http://localhost:8080/events/");
}