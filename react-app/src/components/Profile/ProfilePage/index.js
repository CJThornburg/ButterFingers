import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTexts } from "../../../store/texts"
import { useParams, useHistory } from "react-router-dom";
import { getLevel } from "../../../utils";


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
  console.log("total exp", totalExp)
  // console.log(totalMistakes)
  // console.log(averageKpm)
  const level = getLevel( totalExp)

  console.log("level", level)

  // in minutes, note to self, demo has a bunch of scores to their name
  console.log((totalTime / 1000) / 60)



  // number of cards

// checks i need
          // current profile page is owned by current user
                  // if so render whole page + delete profile button
          // friendship exist at all
                  // if exist and is active render whole page
                  // if exist but is pending
                          // if request is from current user render disabled pending button
                          // if request is to current user render accept request button and decline button
                                  // if accept, update record to "active"
                                  // if rejected, delete record    or turn to rejected
                  // if does not exist
                        // render send request button, current user = fromUser, toUser is to profile page on



  return (
    <>
      <h1>

        profilePage
      </h1>
      <div>
        <img className="PP-pp" src={userObj?.profile_imageURL}></img>

        <p className="PP-main-Profile-info PP-username">
          {userObj?.username}
        </p>
        <p className="PP-main-Profile-info PP-joined">
           joined:  {userObj?.createdAt}
        </p>
        <p className="PP-main-Profile-info PP-level">
          Level: {level}

        </p>

{/* if not current user friends and no request sent render send request button */}
        <div>
        <
        </div>

      </div>
    </>
  );
}

export default ProfilePage;
