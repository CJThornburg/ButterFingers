import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTexts } from "../../../store/texts"


function ProfilePage() {

  const dispatch = useDispatch();
// need query by all but just username and id, so can filter texts and scores by user id
// const texts = useSelector(state => Object.values(state.texts))

// const texts = useSelector(state => Object.values(state.texts))
const texts = useSelector(state => Object.values(state.texts))



useEffect(() => {

dispatch(thunkGetAllTexts())



}, [dispatch]);



// if (texts.length === 0) return null







  return (
    <>
    <h1>
      rendering:
      profilePage
    </h1>
    </>
  );
}

export default ProfilePage;
