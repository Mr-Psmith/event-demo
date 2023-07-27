import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/edit-event';
import EventDetailPage, {action as deleteEventAction,  loader as eventDetailLoader} from './pages/event-detail';
import EventsPage, { loaderUpToUs as eventsLoader } from './pages/events';
import EventsRootLayout from './pages/events-root';
import HomePage from './pages/home';
import NewEventPage from './pages/new-event';
import RootLayout from './pages/root';
import ErrorPage from './pages/error';
import {action as manipulateEventActions} from "./components/EventForm";
import AuthenticationPage, {action as authAction} from './pages/authentication';
import {action as logoutAction } from "./pages/logout";
import { checkAuthLoader, tokenLoader } from "./utility/auth";
import { Suspense, lazy } from 'react';
//import NewsletterPage, {action as newsLetterAction} from './pages/newsletter';
const NewsletterPage = () => lazy(import('./pages/newsletter')); // this alone is not enough, because this here is not a valid functional component, bec a function is only a valid component if it returns JSX code or something like this
                                                                                                //This function here however, returns a promise because as I mentioned before, import actually yields a promise. which is not a valid react funct
                                                                                                      //To solve this problem React gives us a special function which we have to wrap around this function =>lazy()



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
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
              { path: 'edit', element: <EditEventPage />, action:manipulateEventActions, loader: checkAuthLoader },
            ],
           },
          { path: 'new', element: <NewEventPage />, action: manipulateEventActions, loader: checkAuthLoader },
        ],
      },
      {path: "auth", element: <AuthenticationPage />, action: authAction},
      {
        path: "newsletter",
        element: <Suspense fallback={<p>Loading...</p>}> <NewsletterPage /></Suspense>, //lazy loading so takes time to download, therefore he wrapping with the Suspense comp
        action: () => import('./pages/newsletter').then(module => module.action()),
      },
      {
        path: "logout",
        action: logoutAction
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;