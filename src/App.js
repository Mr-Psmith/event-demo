// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/edit-event';
import EventDetailPage, {action as deleteEventAction,  loader as eventDetailLoader} from './pages/event-detail';
import EventsPage, { loaderUpToUs as eventsLoader } from './pages/events';
import EventsRootLayout from './pages/events-root';
import HomePage from './pages/home';
import NewEventPage, { action as newEventAction } from './pages/new-event';
import RootLayout from './pages/root';
import ErrorPage from './pages/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader,
          //async () => {
          //   const response = await fetch('http://localhost:8080/events');
          //   if (!response.ok) {
          //     //setError('Fetching events failed.');
          //   } else {
          //     const resData = await response.json();
          //     return resData.events;
          //   }
          // }
           },
           { // this is a nested parent for the events.?
            path: ":eventId",
            id: "event-detail", //this is for the useRouteLoaderData
            //we don't add an element as we dont want any shared layouts
            loader: eventDetailLoader, //and adding here this loader makes accessible to all children elements by using the useLoaderData() hook there
            children: [
              { index: true/*or path:""*/, element: <EventDetailPage/>, action: deleteEventAction},
              { path: 'edit', element: <EditEventPage /> },
            ],
           },
          { path: 'new', element: <NewEventPage />, action: newEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;