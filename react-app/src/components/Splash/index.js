import {useState} from "react";
import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Splash.css"

function Splash() {

  const sessionUser = useSelector((state) => state.session.user);
    const [logIn, setLogIn] = useState(false)
    const [signUp, setSignUp] = useState(false)


    if (sessionUser) return <Redirect to="/test" />;

    // const handleLogin = () => {
    //     setLogIn(true)
    //     setSignUp(false)
    // }

    // const handleSignUp = () => {
    //     setLogIn(false)
    //     setSignUp(true)
    // }

    return (


      <>
      <div className="S-div-holder">


      <div className="">
      <h1 className="wgt">
        Welcome to ButterFingers, let those fingers rip!
      </h1>
       <h2 className="wgt">
       Connect and speed run your friends!
       </h2>
      </div>
      <div>

       <SignupFormPage from="splash"></SignupFormPage>
      </div>
      <div>

         <LoginFormPage from="splash"></LoginFormPage>
      </div>
      {/* <div>

    <button onClick={handleLogin}>Login</button>
      </div>
    <div>

    <button onClick={handleSignUp}>Sign up</button>
    </div> */}
    </div>
      </>
    );
  }

  export default Splash;
