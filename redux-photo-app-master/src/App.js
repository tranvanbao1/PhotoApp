import { unwrapResult } from '@reduxjs/toolkit';
import { getMe } from 'app/userSlice';
import SignIn from 'features/Auth/pages/SignIn';
import firebase from 'firebase';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Lazy load - Code splitting
const Photo = React.lazy(() => import('./features/Photo'));

// Configure Firebase.
const config = {
  apiKey:'AIzaSyDEl_slXO_RBwFxMK6LUDxEaSptJjPlkO0',
  authDomain: 'photo-app-c0749.firebaseapp.com'
  // apiKey: process.env.REACT_APP_FIREBASE_API,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
};
firebase.initializeApp(config);

function App() {
  const dispatch = useDispatch();

  // Handle firebase auth changed
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        // user logs out, handle something here
        console.log('User is not logged in');
        return;
      }

      // Get me when signed in
      // const action = getMe();
      try {
        const actionResult = await dispatch(getMe());
        const currentUser = unwrapResult(actionResult);
        console.log('Logged in user: ', currentUser);
      } catch (error) {
        console.log('Failed to login ', error.message);
        // show toast error
      }
    });

    return () => unregisterAuthObserver();
  }, []);



  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route path="/sign-in" component={SignIn} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;