import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTexts } from "../../../store/texts"
import { useParams, useHistory } from "react-router-dom";


function ProfilePage() {
  const { username } = useParams();
  const dispatch = useDispatch();

  // need query by all but just username and id, so can filter texts and scores by user id
  // const texts = useSelector(state => Object.values(state.texts))

  const userObj = useSelector(state => Object.values(state.users).find(user => user.username.toLowerCase() === username.toLowerCase()))
  const texts = useSelector(state => Object.values(state.texts))
  const scores = useSelector(state => Object.values(state.scores))



  if (texts.length === 0) {
    return null
  }

  // const currentUser = Object.values(userObj).find(user => user.username.toLowerCase() === username.toLowerCase());
  // console.log(username)
  // ! why do i have to do ?, conditional short circuit for it is breaking code :(
  console.log(userObj?.id);
  const userScores = scores.filter((score => score.userId === userObj?.id))
  const totalExp = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.runExp, 0);
  const totalMistakes = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.mistakes, 0)
  const totalTime = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0)
  const totalKpm = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.kpm, 0);
  const averageKpm = totalKpm / userScores.length;

  // console.log(currentUser, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  const userTexts = texts.filter((score => score.userId === userObj?.id))
  console.log("user ran:", userScores.length, "tests")
  console.log("user owns:", userTexts.length, "texts")
  console.log(totalExp)
  console.log(totalMistakes)
  console.log(averageKpm)

  // in minutes, note to self, demo has a bunch of scores to their name
  console.log((totalTime / 1000) / 60)



  // number of cards


  return (
    <>
      <h1>

        profilePage
      </h1>
      <div>
        
        {userObj?.username}

      </div>
    </>
  );
}

export default ProfilePage;
