import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import NewEventForm from './components/NewEventForm';

import Homepage from './components/Homepage'
import EventDetails from './components/EventDetails';
import TicketsPage from './components/TicketsPage';
import Footer from './components/Footer';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (


    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <Homepage />
        </Route>
        <Route path='/new-event' exact={true}>
          <NewEventForm />
        </Route>
        <Route path='/events/:eventId' exact={true}>
          <EventDetails />
        </Route>
        <Route path='/tickets/:userId' exact={true}>
          <TicketsPage />
        </Route>
      </Switch>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
