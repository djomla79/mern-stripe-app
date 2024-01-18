import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserPlaces from './places/pages/UserPlaces/UserPlaces';
import AllPlaces from './places/pages/AllPlaces/AllPlaces';
// import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace/UpdatePlace';
import Auth from './user/pages/Auth';
// import Payment from './shared/stripe/Payment/Payment';
import NavigationBar from './shared/components/Navigation/NavigationBar';
import {
  AuthContextProvider,
  PlaceContextProvider,
} from './shared/context/index';

const App = () => {
  return (
    <AuthContextProvider>
      <PlaceContextProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <Routes>
            <Route path='/' element={<NavigationBar />}>
              <Route index path='/' element={<AllPlaces />} />
              <Route path='/authenticate' element={<Auth />} />
              <Route path='/:userId/places' element={<UserPlaces />} />
              <Route path='/places/new' element={<NewPlace />} />
              <Route path='/places/:pid' element={<UpdatePlace />} />
              {/*<Route path='/payment' element={<Payment />} />*/}
            </Route>
          </Routes>
        </GoogleOAuthProvider>
      </PlaceContextProvider>
    </AuthContextProvider>
  );
};

export default App;
