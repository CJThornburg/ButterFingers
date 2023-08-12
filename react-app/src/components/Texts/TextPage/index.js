import React, { useState } from "react";
import { thunkCreateScore } from "../../../store/scores"
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
  const [done, setDone] = useState(false)
  const dispatch = useDispatch();
  const [ms, setMs] = useState()

  const user = useSelector(state => state.session.user.id)
  const texts = useSelector(state => Object.values(state.texts))
  const resultsObj = {}


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
    let matchingLengthTexts
    let randomInt
    if (num !== -1) {

      matchingLengthTexts = texts.filter((text) => text.wordCount === num)
      randomInt = getRandomInt(matchingLengthTexts.length - 1)
    }



    switch (num) {
      case 20:
        // let twentyWords = texts.filter((text) => text.wordCount === 20)
        // let twentyRandomInt = getRandomInt(twentyWords.length - 1)
        setTextObj(matchingLengthTexts[randomInt])
        setCopyText(matchingLengthTexts[randomInt].typingText)
        setUserText("")
        setOption(num)
        break;

      case 50:
        setTextObj(matchingLengthTexts[randomInt])
        setCopyText(matchingLengthTexts[randomInt].typingText)
        setUserText("")
        setOption(num)
        break;
      case 100:
        setTextObj(matchingLengthTexts[randomInt])
        setCopyText(matchingLengthTexts[randomInt].typingText)
        setUserText("")
        setOption(num)
        break;

      case -1:
        let textCount = texts.length
        randomInt = getRandomInt(textCount - 1)
        setTextObj(texts[randomInt])
        setCopyText(texts[randomInt].typingText)
        setUserText("")
        setOption(num)
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
    currentIndex = userText.length
    if (e.target.value[currentIndex] !== copyText[currentIndex]) {
      setMistakes(mistakes + 1)
      setUserText(userText.substring(0, userText.length))
    }

    if (userText.length === copyText.length - 1) {
      let end = new Date().getTime()
      let timing = end - start
      resultsObj.time = timing
      resultsObj.mistakes = mistakes
      let done = true
      setDone(done)
      setMs(timing)
      // grab end time to find time it took
      // create the text object to pass to the the results return
      // render a results page and un-render

    }
  }



  // buttons on "stats" page
  const handleNext = async () => {
    let kpm = (textObj.characterCount / (ms / 1000))
    let res = await dispatch(thunkCreateScore(textObj.id, ms, mistakes, kpm, textObj.textExp, user))
    if (res) {
      console.log("error", res)
    }
    setUserText("")
    setMistakes(0)
    setMs()
    setDone(false)
    handleLengthChange("e", option)
  }

  const handleDelete = async () => {

    setUserText("")
    setMistakes(0)
    setMs()
    setDone(false)
    handleLengthChange("e", option)
  }



  if (done) {

    // TODO add data showing users overall stats for this text
    // TODO if characters less than ~20, for KPM just say "too short of text sample to calculate kpm"

    return (<>
      <h3>KPM {((textObj.characterCount / ms) * 60000).toFixed(2)}</h3>
      <h3>Time: {(ms / 1000).toFixed(2)}</h3>
      <h3>ACC: {(((textObj.characterCount) / (textObj.characterCount + mistakes)) * 100).toFixed(2)}%</h3>
      <h4>Word Count: {textObj.wordCount}</h4>
      <h4>Mistakes: {mistakes}</h4>
      <h4>Characters: {textObj.characterCount} </h4>
      <h4>non space Characters: {textObj.noSpaceCharacterCount}</h4>
      <h4>exp: {textObj.textExp}</h4>
      {/*
      <h1>vs</h1>

      <h2>Text card history</h2> */}
      <button autoFocus onClick={handleNext}>Next!</button>
      {/* if delete  just reset state don't commit  */}
      <button onClick={handleDelete}>Delete :(</button>

      {/* if redo, load current text object again */}
    </>)
  }

  // const [copyText, setCopyText] = useState("")
  // const [option, setOption] = useState('')
  // const [textObj, setTextObj] = useState({})
  return (
    <>

      <div className="TP-textType-buttons">
        <p className="TP-A-words"><span className="TP-A">A</span>words </p>
        <button onClick={(e) => { handleLengthChange(e, 20) }}>20</button>
        <button onClick={(e) => { handleLengthChange(e, 50) }}>50</button>
        <button onClick={(e) => { handleLengthChange(e, 100) }}>100</button>
        <button onClick={(e) => { handleLengthChange(e, -1) }}>Random</button>

        {/* if clicked, render change button, and a default text and clicking that one that will open modal. The default is there to prevent errors if its a new user and they have no texts to render without having to give everyone a default card*/}
        {/* const [showTextArea, setShowTextArea] = useState(false) */}
        <button onClick={showChange}>Custom</button>
        {change && <OpenModalButton
          buttonText="Change"
          onItemClick={closeMenu}
          modalComponent={<TextFormModal from="Post" setTextObj={setTextObj} setCopyText={setCopyText} setShowTextArea={setShowTextArea} />}


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
