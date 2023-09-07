import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ProfilePage from './components/Profile/ProfilePage'
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import TextPage from './components/Texts/TextPage'
import { thunkGetAllTexts } from "./store/texts";
import { thunkGetAllScores } from './store/scores'
import { thunkGetAllProfiles } from './store/users'
import { thunkGetAllFriends } from './store/friends'
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Splash from './components/Splash';
import Page404 from './components/Page404'
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true))
      .then(() => dispatch(thunkGetAllTexts()))
      .then(() => dispatch(thunkGetAllScores()))
      .then(() => dispatch(thunkGetAllProfiles()))
      .then(() => dispatch(thunkGetAllFriends()))


  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
            <SignupFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/test'>
            <ProtectedRoute>
              <TextPage></TextPage>
            </ProtectedRoute>
          </Route>
          <Route path='/users/:username'>

            <ProfilePage></ProfilePage>

          </Route>
          <Route exact path="/">
            <Splash></Splash>
          </Route>

          <Route path="*">
            <ProtectedRoute>
              <Page404></Page404>
            </ProtectedRoute>
          </Route>

        </Switch>

      )}

    </>
  );
}

export default App;
