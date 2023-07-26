import { Outlet, useNavigation, useRouteLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
    // const navigation = useNavigation();
    //Automatic logout :
    const token = useRouteLoaderData("root");//we could use simply the useLoaderData as well, as this is already the root file
    const submit = useSubmit();
    useEffect(() => {
      if (!token) {
        return;
      }

      setTimeout(() => {
        submit(null, {action:"/logout", method: "post"})
      }, 1 * 60 *60 * 1000) // 1*60 = 1 hour, *60 = 60seconds, *1000 thousands miliseconds, bec setTimeout expects the durations in miliseconds 

    }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading....</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;