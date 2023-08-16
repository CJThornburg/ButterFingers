import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import { useHistory } from "react-router-dom";

function LoginFormPage({ from }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = async (e) => {
    e.preventDefault();
    // setErrors([])
    const data = await dispatch(login(email, password));
    console.log(data)
    if (data) {
      console.log("in errors")
      setErrors(data);
    }else {

      if (from === "splash") {
        history.push("/test")
      }

    }

  };


  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      if (from === "splash") {
        history.push("/test")
      }

    }
  };

  const handleDemoSubmit1 = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo1@aa.io", "password"));
    if (data) {
      setErrors(data);
    } else {
      if (from === "splash") {
        history.push("/test")
      }

    }
  };

  return (
    <>
      <h1 className="wgt LFP-title">login</h1>
      <form onSubmit={handleSubmit} className="LFP-div">
      {errors.length > 0 &&<ul>
          {errors.map((error, idx) => <li className="error-text" key={idx}>{error}</li>)}
        </ul>}
        <label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="placeholder-Text"
          />
        </label>
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="placeholder-Text"
          />

        </label>

        <button className="default_button  pointer" type="submit "> <i className="fa-solid fas fa-keyboard buttonIcon"></i> login</button>
      </form>
      <form onSubmit={handleDemoSubmit} className="LFP-div">
        <button className="LP-button default_button pointer" id="Demo-user" type="submit"><i class="fa-solid fas fa-id-card buttonIcon"></i> DemoUser</button>
      </form>
      <form onSubmit={handleDemoSubmit1} className="LFP-div">
        <button  className="LP-button default_button pointer"  id="Demo-user" type="submit"><i class="fa-solid  fas fa-id-card buttonIcon"></i> DemoUser1</button>
      </form>
    </>
  );
}

export default LoginFormPage;
