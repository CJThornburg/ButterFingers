import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
// import { thunkGetAllTexts } from "../../../store/texts"

import { thunkCreateFriendRelationship, thunkAcceptFriend, thunkRejectFriend, thunkUndoRejectFriend, thunkDeleteFriend, thunkGetAllFriends } from "../../../store/friends"
import { useParams, useHistory, Link } from "react-router-dom";
import { getLevel } from "../../../utils";
import PlayerText from "./PlayerText";
import ResultsGraph from "../../ResultsGraph";
import { jsDMYDateFormatter } from "../../../utils";



function ProfilePage() {
  const { username } = useParams();
  const dispatch = useDispatch();



  const userObj = useSelector(state => Object.values(state.users).find(user => user.username.toLowerCase() === username.toLowerCase()))
  const currentUsername = useSelector(state => state.session.user.username)
  const textObjs = useSelector(state => state.texts)
  const texts = useSelector(state => Object.values(state.texts))
  const scores = useSelector(state => Object.values(state.scores))
  const friends = useSelector(state => Object.values(state.friends))




  if (texts.length === 0) {
    return null
  }


  // onClicks
  const handleFriendRequest = async () => {
    const data = await dispatch(thunkCreateFriendRelationship(username));
  }

  const handleAccept = async () => {
    const data = await dispatch(thunkAcceptFriend(username))
  }
  const handleAcceptFromOwn = async (username) => {
    const data = await dispatch(thunkAcceptFriend(username))
  }

  const handleReject = async () => {
    const data = await dispatch(thunkRejectFriend(username))
    console.log(data)
  }
  const handleRejectFromOwn = async (username) => {
    const data = await dispatch(thunkRejectFriend(username))
    console.log(data)
  }


  const handleUndoReject = async () => {
    const data = await dispatch(thunkUndoRejectFriend(username))

  }

  const removeFriend = async () => {
    // const data = await dispatch(thunkUndoRejectFriend(username))
    await dispatch(thunkDeleteFriend(relevantFriends.id))
    // await thunkGetAllFriends()
  }

  const removeFriendFromOwn = async (friendId) => {
    // const data = await dispatch(thunkUndoRejectFriend(username))
    await dispatch(thunkDeleteFriend(friendId))
    // await thunkGetAllFriends()
  }

  // ! why do i have to do ?, conditional short circuit for it is breaking code :(

  const userScores = scores.filter((score => score.userId === userObj?.id))

  const totalExp = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.runExp, 0);
  const totalMistakes = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.mistakes, 0)

  const totalTime = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0)
  const totalKpm = userScores.reduce((accumulator, currentValue) => accumulator + currentValue.kpm, 0);

  let averageKpm = 0
  if (totalKpm === 0) {
    averageKpm = 0
  } else {

    averageKpm = totalKpm / userScores.length;
  }

  // Below:for each score, search text and sum all the characterCount noSpaceCharacterCount wordCount

  let totalChars = 0
  let totalCharsNospace = 0
  let totalWords = 0
  for (const score of userScores) {
    let currentTextId = score.textId

    totalChars += textObjs[currentTextId].characterCount
    totalCharsNospace += textObjs[currentTextId].noSpaceCharacterCount
    totalWords += textObjs[currentTextId].wordCount
  }




  const userTexts = texts.filter((score => score.userId === userObj?.id))

  const level = getLevel(totalExp)




  let totalTimeMin = (totalTime / 60000)


  // currentUsername === logged in user

  // Filterers for current user friends list, request lists

  const currentSentFriendRequests = friends.filter(friend => (friend.fromUser.toLowerCase() === currentUsername.toLowerCase() && friend.status === "pending"));
  console.log("sent friend request", currentSentFriendRequests)
  // number of cards

  const currentReceivedFriendRequests = friends.filter(friend => (friend.toUser.toLowerCase() === currentUsername.toLowerCase() && friend.status === "pending"));
  console.log("received friend request", currentReceivedFriendRequests)


  const currentFriendsTo = friends.filter(friend => (
    (friend.toUser.toLowerCase() === currentUsername.toLowerCase()) && friend.status === "active"));
  // grab fromUser username


  const currentFriendsFrom = friends.filter(friend => (
    friend.fromUser.toLowerCase() === currentUsername.toLowerCase() && friend.status === "active"));

  // grab toUser userName
  console.log("current friends TO current user", currentFriendsTo)
  console.log("current friend FRom current user", currentFriendsFrom)
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

    let owner = true



    return (
      <>
        <div className="PP-columnHolder">
          <div className="column ">

            <div className="PP-cp-pp-div">
              <div className="PP-cp-div">
                <img className="PP-cp" src={userObj?.coverPhoto}></img>

              </div>
              <div className="PP-pp-div">
                <img className="PP-pp" src={userObj?.profile_imageURL}></img>

              </div>
            </div>

            <p className="PP-main-Profile-info pFont yt  PP-username">
              {userObj?.username}
            </p>

            <p className="PP-main-Profile-info  pFont wgt PP-level">
              Level: <span className="yt"> {level}</span>

            </p>

            <p className="PP-main-Profile-info  pFont wgt PP-joined">
              joined: <span className="yt"> { jsDMYDateFormatter(userObj?.createdAt)} </span>
            </p>

            {userScores.length > 3 &&  <ResultsGraph relevantScores={userScores}></ResultsGraph>}
            {userScores.length < 3 && <div className="PP-noGraph-div HFont"> <h1 className="st">You have not run enough tests to generate a graph :( </h1></div> }



            <div className="PP-lists-div">
              <div className="PP-list-div">
                <h4 className="wgt HFont">Friends</h4>



                {currentFriendsTo.map((friend) => (
                  <div className="user-delete-div">
                    <Link className="anti-link wgt" to={`/users/${friend.fromUser}`}><button className="default_button" >{friend.fromUser}</button>  </Link><button className="default_button">
                      <i onClick={(e) => removeFriendFromOwn(friend.id)} className="fa-solid fas fa-trash cursor"></i></button>
                  </div>
                ))}
                {currentFriendsFrom.map((friend) => (
                  <div className="user-delete-div">
                    <Link className="anti-link wgt" to={`/users/${friend.toUser}`}><button className="default_button" >{friend.toUser}</button>  </Link><button className="default_button">
                      <i onClick={(e) => removeFriendFromOwn(friend.id)} className="fa-solid fas fa-trash cursor"></i></button>
                  </div>
                ))}


              </div>



              {currentSentFriendRequests.length > 0 &&

                <div className="PP-list-div">
                  <h4 className="wgt HFont">Pending Sent Request</h4>
                  {currentSentFriendRequests.map((friend) => (
                    <div className="user-delete-div">
                      <Link className="anti-link wgt" to={`/users/${friend.toUser}`}><button className="default_button" >{friend.toUser}</button>  </Link><button className="default_button">
                        <i onClick={(e) => removeFriendFromOwn(friend.id)} className="fa-solid fas fa-trash cursor"></i></button>
                    </div>
                  ))}

                </div>
              }




              {currentReceivedFriendRequests.length > 0 &&
                <div className="PP-list-div">
                  <h4 className="wgt HFont">Pending Received Request</h4>
                  {currentReceivedFriendRequests.map((friend) => (
                    <div className="user-delete-div" >
                      <Link className="anti-link wgt" to={`/users/${friend.fromUser}`}><button className="default_button" >{friend.fromUser}</button>  </Link>
                      <button className="default_button" onClick={(e) => handleAcceptFromOwn(friend.fromUser)} >accept</button>
                      <button className="default_button" onClick={(e) => handleRejectFromOwn(friend.fromUser)} > decline</button>
                    </div>
                  ))}


                </div>
              }


            </div>

            <p className="PP-tests wgt pFont">Tests Completed:  <span className="yt pFont"> {userScores.length}</span> </p>
            <p className="PP-kpm wgt pFont">Average Key stokes per min: <span className="yt pFont">{averageKpm.toFixed(2)} </span> </p>
            <p className="PP-time wgt pFont">Total time typing:  <span className="yt pFont"> </span>{totalTimeMin.toFixed(2)}mins</p>


            {/* if friends or current user */}
            <div className="PP-stats2 PP-totals">
              <p className="PP-mistakes wgt pFont"> typed characters:  <span className="yt pFont">{totalChars} </span></p>
              <p className="PP-mistakes wgt pFont">typed non-space characters:  <span className="yt pFont">{totalCharsNospace} </span></p>
              <p className="PP-mistakes wgt pFont">totals mistakes: <span className="yt pFont"> {totalMistakes}</span> </p>

            </div>



            <div>
              {userTexts.map((text) => (
                <>
                  <div className="Player-card overflow ">


                    <PlayerText key={text.id}
                      text={text}
                      owner={owner}
                      username={username}
                    >

                    </PlayerText>
                  </div>
                </>
              ))}

            </div>





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
  // pending request sent




  //


  const relevantFriends = friends.find(friend => (friend.fromUser.toLowerCase() === currentUsername.toLowerCase() && friend.toUser.toLowerCase() === username.toLowerCase()) ||
    (friend.toUser.toLowerCase() === currentUsername.toLowerCase() && friend.fromUser.toLowerCase() === username.toLowerCase()));
  console.log(relevantFriends)



  // not existing means not friends and not rejected
  // this and other render conditionals prevents multiple request from being made
  // ! current user is not friends with user page they are on
  if (!relevantFriends) {
    return (<>
      <div className="PP-columnHolder">
        <div className="column ">

          <div className="PP-cp-pp-div">
            <div className="PP-cp-div">
              <img className="PP-cp" src={userObj?.coverPhoto}></img>

            </div>
            <div className="PP-pp-div">
              <img className="PP-pp" src={userObj?.profile_imageURL}></img>

            </div>
          </div>

          <p className="PP-main-Profile-info pFont yt  PP-username">
            {userObj?.username}
          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-level">
            Level: {level}

          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-joined">
            joined:  {userObj?.createdAt}
          </p>

          <div>
            <button className="default_button" onClick={handleFriendRequest}> send friend request</button>
          </div>


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
  // TODO accept and reject and undo TESTING
  // !!!!!!!!!!!!!
  //
  if (relevantFriends.toUser === currentUsername && relevantFriends.status === "pending") {
    return (<>
      <div className="PP-columnHolder">
        <div className="column ">

          <div className="PP-cp-pp-div">
            <div className="PP-cp-div">
              <img className="PP-cp" src={userObj?.coverPhoto}></img>

            </div>
            <div className="PP-pp-div">
              <img className="PP-pp" src={userObj?.profile_imageURL}></img>

            </div>
          </div>

          <p className="PP-main-Profile-info pFont yt  PP-username">
            {userObj?.username}
          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-level">
            Level: {level}

          </p>



          <p className="PP-main-Profile-info  pFont wgt PP-joined">
            joined:  {userObj?.createdAt}
          </p>


          <div>
            <button className="default_button" onClick={handleAccept} >accept</button>
            <button className="default_button" onClick={handleReject} >reject</button>
          </div>


        </div>
      </div>
    </>)
  }

  // current user rejected, but can cancel and send request
  if (relevantFriends.toUser === currentUsername && relevantFriends.status === "rejected") {
    return (<>
      <div className="PP-columnHolder">
        <div className="column ">

          <div className="PP-cp-pp-div">
            <div className="PP-cp-div">
              <img className="PP-cp" src={userObj?.coverPhoto}></img>

            </div>
            <div className="PP-pp-div">
              <img className="PP-pp" src={userObj?.profile_imageURL}></img>

            </div>
          </div>

          <p className="PP-main-Profile-info pFont yt  PP-username">
            {userObj?.username}
          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-joined">
            joined:  {userObj?.createdAt}
          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-level">
            Level: {level}

          </p>
          <div>

            <button className="default_button" disabled >rejected</button>
            <button className="default_button" onClick={handleUndoReject}>undo rejection </button>
          </div>


        </div>
      </div>
    </>)
  }

  // change status to pending, and flip to and from

  // ! current user has sent a request to other user and waiting for response
  // ! or the toUser  user rejected it
  if (relevantFriends.fromUser === currentUsername && ((relevantFriends.status === "pending") || relevantFriends.status === "rejected")) {
    return (<>
      <div className="PP-columnHolder">
        <div className="column ">

          <div className="PP-cp-pp-div">
            <div className="PP-cp-div">
              <img className="PP-cp" src={userObj?.coverPhoto}></img>

            </div>
            <div className="PP-pp-div">
              <img className="PP-pp" src={userObj?.profile_imageURL}></img>

            </div>
          </div>

          <p className="PP-main-Profile-info pFont yt  PP-username">
            {userObj?.username}
          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-level">
            Level: {level}

          </p>
          <p className="PP-main-Profile-info  pFont wgt PP-joined">
            joined:  {userObj?.createdAt}
          </p>

          <div>
            <button className="default_button" onClick={removeFriend}>Cancel Friend Request </button>
          </div>
        </div>
      </div>
    </>)
  }




  // ! current user is friends with the user of this page
  if (relevantFriends.status === "active")

  console.log(userScores)
    return (
      <>
        <div className="PP-columnHolder">
          <div className="column ">
            <div className="PP-cp-pp-div">
              <div className="PP-cp-div">
                <img className="PP-cp" src={userObj?.coverPhoto}></img>

              </div>
              <div className="PP-pp-div">
                <img className="PP-pp" src={userObj?.profile_imageURL}></img>

              </div>
            </div>

            <p className="PP-main-Profile-info pFont yt  PP-username">
              {userObj?.username}
            </p>
            <p className="PP-main-Profile-info  pFont wgt PP-level">
              Level: {level}

            </p>
            <p className="PP-main-Profile-info  pFont wgt PP-joined">
              joined:  {userObj?.createdAt}
            </p>

            {userScores.length > 3 &&  <ResultsGraph relevantScores={userScores}></ResultsGraph>}
            {userScores.length < 3 && <div className="PP-noGraph-div HFont"> <h1 className="st">User has not run enough tests to generate a graph. :( </h1></div> }


            {/* if friends render more stats */}
            <p className="PP-tests wgt pFont">Tests Completed:  <span className="yt pFont"> {userScores.length}</span> </p>
            <p className="PP-kpm wgt pFont">Average Key stokes per min: <span className="yt pFont">{averageKpm.toFixed(2)} </span> </p>
            <p className="PP-time wgt pFont">Total time typing:  <span className="yt pFont"> </span>{totalTimeMin.toFixed(2)}mins</p>




            <div className="PP-stats2 PP-totals">
              <p className="PP-mistakes wgt pFont"> typed characters:  <span className="yt pFont">{totalChars} </span></p>
              <p className="PP-mistakes wgt pFont">typed non-space characters:  <span className="yt pFont">{totalCharsNospace} </span></p>
              <p className="PP-mistakes wgt pFont">totals mistakes: <span className="yt pFont"> {totalMistakes}</span> </p>

            </div>




            <div>
              {userTexts.map((text) => (
                <>
                  <div className="Player-card overflow ">


                    <PlayerText key={text.id}
                      text={text}

                      username={username}
                    >

                    </PlayerText>
                  </div>
                </>
              ))}

            </div>

          </div>
        </div>
      </>
    );



}

export default ProfilePage;
