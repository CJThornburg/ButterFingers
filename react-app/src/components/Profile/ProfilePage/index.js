import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTexts } from "../../../store/texts"
import { useParams, useHistory } from "react-router-dom";
import { getLevel } from "../../../utils";
import PlayerText from "./PlayerText";



function ProfilePage() {
  const { username } = useParams();
  const dispatch = useDispatch();



  const userObj = useSelector(state => Object.values(state.users).find(user => user.username.toLowerCase() === username.toLowerCase()))
  const textObjs = useSelector(state => state.texts)
  const texts = useSelector(state => Object.values(state.texts))
  const scores = useSelector(state => Object.values(state.scores))



  if (texts.length === 0) {
    return null
  }



  // ! why do i have to do ?, conditional short circuit for it is breaking code :(

  const userScores = scores.filter((score => score.userId === userObj?.id))
  const totalExp = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.runExp, 0);
  const totalMistakes = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.mistakes, 0)

  const totalTime = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0)
  const totalKpm = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.kpm, 0);
  const averageKpm = totalKpm / userScores.length;

  // Below:for each score, search text and sum all the characterCount noSpaceCharacterCount wordCount
  let totalChars = 0
  let totalCharsNospace = 0
  let totalWords = 0
  for (const score of scores) {
    let currentTextId = score.textId

    totalChars += textObjs[currentTextId].characterCount
    totalCharsNospace += textObjs[currentTextId].noSpaceCharacterCount
    totalWords += textObjs[currentTextId].wordCount
  }




  const userTexts = texts.filter((score => score.userId === userObj?.id))

  const level = getLevel(totalExp)




  let totalTimeMin = (totalTime / 60000)



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
        {/* if friends render more stats */}
        <p className="PP-tests">Tests Completed: {userScores.length}</p>
        <p className="PP-kpm">Average KPM: {averageKpm.toFixed(2)}</p>
        <p className="PP-time">Total time: {totalTimeMin.toFixed(2)}mins</p>





        {/* div for mistakes, characters and noSpace characters */}




        {/* if not current user friends and no request sent render send request button */}
        <div>

        </div>

        {/* if friends or current user */}
        <div className="PP-stats2 PP-totals">
          <p className="PP-mistakes"> typed characters: {totalChars}</p>
          <p className="PP-mistakes">typed non-space characters: {totalCharsNospace}</p>
          <p className="PP-mistakes">totals mistakes: {totalMistakes}</p>

        </div>


        {/* if friends or current user */}
        <div>
          {userTexts.map((text) => (
            <>
              <PlayerText key={text.id}
              text={text}
              username={username}
              >

              </PlayerText>
            </>
          ))}

        </div>

      </div>
    </>
  );
}

export default ProfilePage;
