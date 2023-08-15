import {useState} from "react";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";

function Splash() {

    const [logIn, setLogIn] = useState(false)
    const [signUp, setSignUp] = useState(false)


    const handleLogin = () => {
        setLogIn(true)
        setSignUp(false)
    }

    const handleSignUp = () => {
        setLogIn(false)
        setSignUp(true)
    }

    return (


      <>
      <h1>
        Welcome to ButterFingers, let those fingers rip!
      </h1>
       <h2>
       Connect and speed run your friends!
       </h2>
        {logIn && <LoginFormPage from="splash"></LoginFormPage>}
        {signUp && <SignupFormPage from="splash"></SignupFormPage>}
    <button onClick={handleLogin}>Login</button>
    <button onClick={handleSignUp}>Sign up</button>
      </>
    );
  }

  export default Splash;
