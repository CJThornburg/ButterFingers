import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { thunkGetAllProfiles } from '../../store/users'
import './SignupForm.css';


function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile_imageURL, setProfile_imageURL] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [vaErrors, setVaErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);


  const [ppLoading, setPPLoading] = useState(false);
  const [coverPhotoLoading, setCoverPhotoLoading] = useState(false);







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
    if (email.length > 35)
      err["Email"] = "Email needs to be less than 35 or more characters";


    // if (name.trim().length > 0) {
    //   console.log("in trim error")
    //   err["Name"] = "Name can not just be a bunch of spaces"
    // }

    if (username.length < 3)
      err["Username"] = "Username needs 3 or more characters";
    if (username.length > 25)
      err["Username"] = "Username needs to be less than 25 or more characters";

    if (password.length < 8) {
      err["Password"] = "Password needs 8 or more characters";
    }
    if (password.length > 100) {
      err["Password"] = "Password needs to be less than 100 characters";
    }

    if (password.toLocaleLowerCase() === "password" || password.toLocaleLowerCase() === "qwerty" || password === "123456" || password === "123456789" || password.toLocaleLowerCase() === "asdfg") {
      err["Password"] = "Password too weak";
    }




    // console.log(err)
    setVaErrors(err);
  }, [email, username, password, confirmPassword, coverPhoto, profile_imageURL]);


















  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (Object.keys(vaErrors).length) {
      return;
    }

    if (password === confirmPassword) {
      const formData = new FormData();

      // !append the rest, this print is printing an empty object D:
      console.log(username)
      formData.append("username", username)
      console.log(email)
      formData.append("email", email)
      console.log(password)
      formData.append("password", password)
      console.log(profile_imageURL)
      formData.append("profile_imageURL", profile_imageURL);
      setPPLoading(true)
      console.log(coverPhoto)
      formData.append("coverPhoto", coverPhoto);
      setCoverPhotoLoading(true)
      console.log("form data!", formData.entries())
      const data = await dispatch(signUp(formData));
      if (data) {
        setErrors(data)
      } else {
        console.log("in history push else before dispatch")
        const users = await dispatch(thunkGetAllProfiles())
        console.log("in history push else after dispatch")
        // history.push("/test")
      }


    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };






  return (
    <>
      <h1 className="yt SP-title pFont">register</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="SFP-div">
        {errors.length > 0 && <ul>
          {errors.map((error, idx) => <li className="error-text" key={idx}>{error}</li>)}
        </ul>}

        {vaErrors.Email && submitted && (
          <p className="error-text">*{vaErrors.Email}</p>
        )}
        <label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email"
            required
            className="placeholder-Text"
          />
        </label>
        {vaErrors.Username && submitted && (
          <p className="error-text">*{vaErrors.Username}</p>
        )}
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=" Username"
            required
            className="placeholder-Text"
          />
        </label>
        {vaErrors.Password && submitted && (
          <p className="error-text">*{vaErrors.Password}</p>
        )}
        <label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password"
            required
            className="placeholder-Text"
          />
        </label>

        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=" Confirm Password"
            required
            className="placeholder-Text"
          />
        </label>
        {vaErrors.ProfilePicture && submitted && (
          <p className="error-text">*{vaErrors.ProfilePicture}</p>
        )}
        {/* <label>

          <input
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder=" Profile Picture (not required)"
            className="placeholder-Text"
          />
        </label> */}
        <label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfile_imageURL(e.target.files[0])}
            placeholder=" Profile Picture (not required)"
            className="placeholder-Text"
          />
        </label>
        {/* <label>
          <input
            type="text"
            value={coverPhoto}
            onChange={(e) => setCoverPhoto(e.target.value)}
            placeholder=" Cover Photo (not required)"
            className="placeholder-Text"
          />
        </label> */}
        <label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverPhoto(e.target.files[0])}
            placeholder=" Cover Photo (not required)"
            className="placeholder-Text"
          />
        </label>
        <button type="submit" className="default_button pointer"> <i class="buttonIcon fa-solid fas fa-user-plus wgt "></i>   <span className="">Sign Up!</span> </button>
        {(ppLoading || coverPhotoLoading) && <p>Loading...</p>}
      </form>

    </>
  );
}

export default SignupFormPage;
