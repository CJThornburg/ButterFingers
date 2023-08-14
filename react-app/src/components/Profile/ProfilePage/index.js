import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetAllTexts } from "../../../store/texts"
import { thunkCreateFriendRelationship } from "../../../store/friends"
import { useParams, useHistory } from "react-router-dom";
import { getLevel } from "../../../utils";
import PlayerText from "./PlayerText";



function ProfilePage() {
  const { username } = useParams();
  const dispatch = useDispatch();



  const userObj = useSelector(state => Object.values(state.users).find(user => user.username.toLowerCase() === username.toLowerCase()))
  const currentUsername = useSelector(state => state.session.user.username)
  const textObjs = useSelector(state => state.texts)
  const texts = useSelector(state => Object.values(state.texts))
  const scores = useSelector(state => Object.values(state.scores))
  const friends = useSelector(state => Object.values(state.friends))


  console.log(friends)

  if (texts.length === 0) {
    return null
  }



 const handleFriendRequest =async() => {
  const data = await dispatch(thunkCreateFriendRelationship(username));
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
  // TODO DELETE profile BUTTON
  // TODO render list of pending request to user and allow reject and accept

  // change this to an or with if logged in user is active friends for the profile owner     currentUsername.toLowerCase() === username.toLowerCase() as inner if for user only, to set owner only for owner but everything else should render
  // friendship exist at all
  // if exist and is active render whole page
  // ! current user is on own page
  if (currentUsername.toLowerCase() === username.toLowerCase()) {
    console.log("hi")
    let owner = true
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

          <p className="PP-tests">Tests Completed: {userScores.length}</p>
          <p className="PP-kpm">Average KPM: {averageKpm.toFixed(2)}</p>
          <p className="PP-time">Total time: {totalTimeMin.toFixed(2)}mins</p>

          <div>

          </div>

          {/* if friends or current user */}
          <div className="PP-stats2 PP-totals">
            <p className="PP-mistakes"> typed characters: {totalChars}</p>
            <p className="PP-mistakes">typed non-space characters: {totalCharsNospace}</p>
            <p className="PP-mistakes">totals mistakes: {totalMistakes}</p>

          </div>

          <div>
            {userTexts.map((text) => (
              <>
                <PlayerText key={text.id}
                  text={text}
                  owner={owner}
                  username={username}
                >

                </PlayerText>
              </>
            ))}

          </div>

        </div>
      </>
    )
  }

  // if exist but is pending
  // if request is from current user render disabled pending button
  // if request is to current user render accept request button and decline button
  // if accept, update record to "active"
  // if rejected, delete record    or turn to rejected
  // if does not exist
  // render send request button, current user = fromUser, toUser is to profile page on

  const relevantFriends = friends.find(friend => (friend.fromUser.toLowerCase() === currentUsername.toLowerCase() && friend.toUser.toLowerCase() === username.toLowerCase()) ||
    (friend.toUser.toLowerCase() === currentUsername.toLowerCase() && friend.fromUser.toLowerCase() === username.toLowerCase()));
  console.log(relevantFriends)



  // not existing means not friends and not rejected
  // this and other render conditionals prevents multiple request from being made
  // ! current user is not friends with user page they are on
  if (!relevantFriends) {
    return (<>
    <div className="PP-top-card-request">


      <div>
        <img className="PP-pp" src={userObj?.profile_imageURL}></img>

        <p className="PP-main-Profile-info PP-username">
          {userObj?.username}
        </p>
        <p className="PP-main-Profile-info PP-joined">
          joined:  {userObj?.createdAt}
        </p>
        <p className="PP-main-Profile-info PP-level">
          Level: {level} </p>
      </div>
      <div>
        <button onClick={handleFriendRequest}> send friend request</button>
      </div>


      </div>
    </>)

  }



  /*
  user1 sent a request to user2
  from                    to
  but user2 rejected it


  to   user2
  from user1
  status rejected


  */


  // if to user === currentUsername and status === pending
    // accept button
    // !current user has received a request from the user of this page
    // TODO accept and reject handling
  if (relevantFriends.toUser === currentUsername && relevantFriends.status === "pending") {
    return (<>
      <div className="PP-top-card-request">


        <div>
          <img className="PP-pp" src={userObj?.profile_imageURL}></img>

          <p className="PP-main-Profile-info PP-username">
            {userObj?.username}
          </p>
          <p className="PP-main-Profile-info PP-joined">
            joined:  {userObj?.createdAt}
          </p>
          <p className="PP-main-Profile-info PP-level">
            Level: {level} </p>
        </div>
        <div>
          <button >accept</button>
          <button >reject</button>
        </div>


        </div>
      </>)
  }


  // TODO current user rejected, but now wants to send a friend request
  // change status to pending, and flip to and from

  // ! current user has sent a request to other user and waiting for response
  // ! or the toUser  user rejected it
  if (relevantFriends.fromUser === currentUsername && ((relevantFriends.status === "pending") || relevantFriends.status === "rejected")) {
    return (<>
      <div className="PP-top-card-request">


        <div>
          <img className="PP-pp" src={userObj?.profile_imageURL}></img>

          <p className="PP-main-Profile-info PP-username">
            {userObj?.username}
          </p>
          <p className="PP-main-Profile-info PP-joined">
            joined:  {userObj?.createdAt}
          </p>
          <p className="PP-main-Profile-info PP-level">
            Level: {level} </p>
        </div>
        <div>
          <button disabled>Friend Request Sent</button>
        </div>
        </div>
      </>)
  }




  // ! current user is friends with the user of this page
   if (relevantFriends.status === "active")
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

        <div>

        </div>

        {/* if friends or current user */}
        <div className="PP-stats2 PP-totals">
          <p className="PP-mistakes"> typed characters: {totalChars}</p>
          <p className="PP-mistakes">typed non-space characters: {totalCharsNospace}</p>
          <p className="PP-mistakes">totals mistakes: {totalMistakes}</p>

        </div>

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
