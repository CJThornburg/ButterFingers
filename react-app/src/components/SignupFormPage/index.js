import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [vaErrors, setVaErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);










  useEffect(() => {
    const err = {};





    if (!email.replace(/\s/g, '').length) {
      err["Email"] = 'Name can not contain only whitespace (ie. spaces, tabs or line breaks)'

    }
    if (!username.replace(/\s/g, '').length) {
      err["Username"] = 'Username can not contain only whitespace (ie. spaces, tabs or line breaks)'

    }
    if (!password.replace(/\s/g, '').length) {
      err["Password"] = 'Password can not contain only whitespace (ie. spaces, tabs or line breaks)'

    }

    // if (name.trim().length > 0) {
    //   console.log("in trim error")
    //   err["Name"] = "Name can not just be a bunch of spaces"
    // }

    if (username.length < 3)
      err["Username"] = "Username needs 3 or more characters";
    if (username.length > 25)
      err["Username"] = "Username needs to be less than 25 or more characters";

    if (password.length < 8) {
      err["Password"] = "Name  needs 8 or more characters";
    }
    if (password.length > 100) {
      err["Password"] = "Name needs to be less than 25 or more characters";
    }


    // console.log(err)
    setVaErrors(err);
  }, [email, username, password, confirmPassword]);


















  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (Object.keys(vaErrors).length) {
      return;
    }

    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };






  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>

        {vaErrors.Email && submitted && (
          <p className="error-text">*{vaErrors.Email}</p>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {vaErrors.Username && submitted && (
          <p className="error-text">*{vaErrors.Username}</p>
        )}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {vaErrors.Password && submitted && (
          <p className="error-text">*{vaErrors.Password}</p>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
