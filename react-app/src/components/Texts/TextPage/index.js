import React, { useState } from "react";
// import {thunkSaveText} from "../../../store/text"
import { useDispatch, useSelector } from "react-redux";

import OpenModalButton from "../../OpenModalButton";
import TextFormModal from "../TextFormModal"
import './TextPage.css'



/*
on first load want to just load text options
    clicking one
      1. grab appropriate text and set it with useState
      2. render the start button

  clicking start button
    1.renders the text to copy and the textarea
    1.2. sets focus to textarea so user doesn't have to click again
    2. starts a timer
    3. takes in user input from textarea and compares it to the actual text
            will prob need to index based on user input length and compare
                       if its a match good
                       if its not a match
                            increase mistake count by 1
                            chop off the last letter of user input
            when done useInput = text to copy
                1.grab the timer time/ stop the timer time
                2. create a results object that will be used to
                    > display on the next page
                    > be submitted to db
                3. render a result page
                  > next test button, just loads another random text based on current setting
                        >set copyText
                        >reset userText to ""
                        >reset timer?
                  > buttons to change options
                  >bonus, redo button
*/

function TextPage() {
  const [change, setChange] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false)
  const [showStartButton, setShowStartButton] = useState(false)
  const [userText, setUserText] = useState("")
  const [copyText, setCopyText] = useState("")
  const [option, setOption] = useState('')
  const [textObj, setTextObj] = useState({})
  const [mistakes, setMistakes] = useState(0)
  const [start, setStart] = useState(0)
  // const [end, setEnd] = useState(0)

  const sessionUser = useSelector((state) => state.session.user);
  const texts = useSelector(state => Object.values(state.texts))
  const resultsObj = {}
  // will need to have one where if user is using the preset length ones, change will be set back to false, onclick to any of those

  // have it staged, makes it way easier for me
  // only render buttons to choice type
  // after choosing that render start button
  // after click that start test and render text and textarea

  if (texts.length === 0) return null

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandom = () => {
    let randomInt = getRandomInt(texts.length - 1)
    console.log(randomInt)
  }

  const showChange = (e) => {
    setChange(true)
  }

  const handleLengthChange = (e, num) => {
    switch (num) {
      case 20:
        let twentyWords = texts.filter((text) => text.wordCount === 20)
        let twentyRandomInt = getRandomInt(twentyWords.length - 1)
        setTextObj(twentyWords[twentyRandomInt])
        setCopyText(twentyWords[twentyRandomInt].typingText)
        setUserText("")
        break;

      case 50:

        break;
      case 100:

        break;

      case -1:

        break;
      default:
        break;
    }


    setShowStartButton(true)
    setChange(false)
    // grab num and grab random public card from that length
    // if num === -1, just grab any random public card
    // grab
  }



  const startTest = () => {
    setShowTextArea(true)
    let startTime = new Date().getTime()
    setStart(startTime)

  }

  const handelSubmit = () => {
  }

  const closeMenu = () => setShowMenu(false);

  let currentIndex
  const userInputChange = (e) => {
    setUserText(e.target.value)
    // console.log(e.target.value)
    currentIndex = userText.length
    // console.log("USER TEXT?", e.target.value[currentIndex])
    // console.log(copyText[currentIndex])
    // console.log(currentIndex)
    // console.log(e.target.value[currentIndex] === copyText[currentIndex])
    if (e.target.value[currentIndex] !== copyText[currentIndex]) {
      setMistakes(mistakes + 1)
      setUserText(userText.substring(0, userText.length))
    }

    if (userText.length === copyText.length - 1) {
      let end = new Date().getTime()


      let timing = end - start
      console.log(timing)
      setTextObj({ ...textObj, time: timing })
      console.log(textObj)
      resultsObj.time = timing
      resultsObj.mistakes = mistakes
      console.log(resultsObj)
      // grab end time to find time it took
      // create the text object to pass to the the results return
      // render a results page and un-render
      console.log("Done")
    }
  }


  return (
    <>

      <div className="TP-textType-buttons">
        <p className="TP-A-words"><span className="TP-A">A</span>words </p>
        <button onClick={(e) => { handleLengthChange(e, 20) }}>20</button>
        <button onClick={(e) => { handleLengthChange(e, 50) }}>50</button>
        <button onClick={(e) => { handleLengthChange(e, 100) }}>100</button>
        <button onClick={(e) => { handleLengthChange(e, -1) }}>Random</button>

        {/* if clicked, render change button, and a default text and clicking that one that will open modal. The default is there to prevent errors if its a new user and they have no texts to render without having to give everyone a default card*/}
        <button onClick={showChange}>Custom</button>
        {change && <OpenModalButton
          buttonText="Change"
          onItemClick={closeMenu}
          modalComponent={<TextFormModal from="Post" />}
        />}
      </div>

      {showTextArea && <form onSubmit={handelSubmit}>

        <p>{copyText}</p>

        <textarea
          value={userText}
          onChange={(e) => userInputChange(e)}
          className="TP-textarea"
          autoFocus
        >
        </textarea>
      </form>}

      {showStartButton && <button onClick={startTest}>
        Click here to start test
      </button>}

    </>
  )
}

export default TextPage;
