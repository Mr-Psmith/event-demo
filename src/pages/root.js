import { Outlet, useNavigation, useRouteLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { gettokenDuration } from './authentication';

function RootLayout() {
    // const navigation = useNavigation();
    //Automatic logout :
    const token = useRouteLoaderData("root");//we could use simply the useLoaderData as well, as this is already the root file
    const submit = useSubmit();
    useEffect(() => {
      if (!token) {
        return;
      }

      if (token === "EXPIRED") {
        submit(null, {action:"/logout", method: "post"});
        return;
      }
      const tokenDuration = gettokenDuration();
      console.log(tokenDuration);

      setTimeout(() => {
        submit(null, {action:"/logout", method: "post"});
      }, tokenDuration) // 1 * 60 *60 * 1000 was here before tokenDuration => 1*60 = 1 hour, *60 = 60seconds, *1000 thousands miliseconds, bec setTimeout expects the durations in miliseconds //on the other hand it is not enough to set this to one hour, as this has to be dynamic

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