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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate())
      .then(() => setIsLoaded(true))
      .then(() => dispatch(thunkGetAllTexts()))
      .then(() => dispatch(thunkGetAllScores()))

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/test'>
            <TextPage></TextPage>
          </Route>
          <Route path='/user/:username'>
            <ProfilePage></ProfilePage>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
