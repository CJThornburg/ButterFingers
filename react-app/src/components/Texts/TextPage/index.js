import React, { useState } from "react";
import { thunkCreateScore } from "../../../store/scores"
import { useDispatch, useSelector } from "react-redux";
import ResultsGraph from '../../ResultsGraph'
import OpenModalButton from "../../OpenModalButton";
import TextFormModal from "../TextFormModal"
import './TextPage.css'
import { jsTimeFormatter, disablePaste } from "../../../utils"
import Footer from "../../Footer";

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
  const [end, setEnd] = useState()
  const [customYellow, setCustomYellow] = useState(false)
  const user = useSelector(state => state.session.user.id)
  const texts = useSelector(state => Object.values(state.texts))
  const scores = useSelector(state => Object.values(state.scores))
  const resultsObj = {}

  if (texts.length === 0) return null
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const getRandom = () => {
    let randomInt = getRandomInt(texts.length - 1)
  }

  const showChange = (e) => {
    setChange(true)
  }

  const handleLengthChange = (e, num, from) => {
    let matchingLengthTexts
    let randomInt
    setCustomYellow(false)
    if (num !== -1) {
      matchingLengthTexts = texts.filter((text) => text.wordCount === num)
      randomInt = getRandomInt(matchingLengthTexts.length - 1)
    }

    switch (num) {
      case 20:
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
    if (from === "select") {
      setShowStartButton(true)
      setShowTextArea(false)
    }
    setChange(false)
  }

  const startTest = () => {
    setShowTextArea(true)
    setShowStartButton(false)
    let startTime = new Date().getTime()
    setStart(startTime)
  }

  const clearOption = () => {
    setShowStartButton(false)
    setOption("")
    setCustomYellow(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  };

  let currentIndex
  const userInputChange = (e) => {
    setUserText(e.target.value)
    currentIndex = userText.length
    if (e.target.value[currentIndex] !== copyText[currentIndex]) {
      setMistakes(mistakes + 1)
      setUserText(userText.substring(0, userText.length))
    }

    if (userText.length === copyText.length - 1) {
      let endTime = new Date().getTime()
      setEnd(endTime)
      let timing = endTime - start
      resultsObj.time = timing
      resultsObj.mistakes = mistakes
      let done = true
      setDone(done)
      setMs(timing)
    }
  }


  const handleNext = async () => {
    let kpm = (((textObj.characterCount * 60) / (ms / 1000)))
    let res = await dispatch(thunkCreateScore(textObj.id, ms, mistakes, kpm, textObj.textExp, user))
    if (res) {
      console.log("error", res)
    }
    setUserText("")
    setMistakes(0)
    setMs()
    setDone(false)
    startTest()
    handleLengthChange("e", option, "next")
  }

  const handleDelete = async () => {
    setUserText("")
    setMistakes(0)
    setMs()
    setDone(false)
    handleLengthChange("e", option)
  }

  if (done) {

    let relevantScores = scores.filter((score) => score.userId === user)
    let formattedDate = jsTimeFormatter()

    const currentScore = {
      "kpm": ((textObj.characterCount * 60) / (ms / 1000)).toFixed(2),
      "createdAt": formattedDate
    }

    relevantScores.push(currentScore)
    return (<>
      <div className="column-holder-stats ">
        <div className="column ">
          <div className="spacer"></div>

          {relevantScores.length >= 3 && <ResultsGraph relevantScores={relevantScores}></ResultsGraph>}
          {relevantScores.length < 3 && <div className="PP-noGraph-div HFont"> <h1 className="st">User has not run enough tests to generate a graph. :( </h1></div>}

          <h3 className="pFont wgt">Key Strokes Per Minute: <span className="yt"> {((textObj.characterCount * 60) / (ms / 1000)).toFixed(2)} </span></h3>
          <h3 className="pFont wgt">Time: <span className="yt">{(ms / 1000).toFixed(2)}</span></h3>
          <h3 className="pFont wgt">Accuracy: <span className="yt">{(((textObj.characterCount) / (textObj.characterCount + mistakes)) * 100).toFixed(2)}% </span></h3>
          <h4 className="pFont wgt">Word Count: <span className="yt"> {textObj.wordCount}</span></h4>
          <h4 className="pFont wgt">Mistakes: <span className="yt"> {mistakes}</span></h4>
          <h4 className="pFont wgt">Characters: <span className="yt"> {textObj.characterCount} </span></h4>
          <h4 className="pFont wgt">non space Characters: <span className="yt">{textObj.noSpaceCharacterCount}</span></h4>
          <h4 className="pFont wgt">exp: <span className="yt">{textObj.textExp}</span> </h4>

          <div className="TP-next-delete-div">

            <button autoFocus className="default_button" onClick={handleNext}>Next!</button>
            {/* if delete  just reset state don't commit  */}
            <button className="default_button" onClick={handleDelete}>Delete :(</button>

          </div>
        </div>
      </div>
      {/* if redo, load current text object again */}
      <div className="footer-space"></div>
      <Footer></Footer>
    </>)
  }


  return (
    <>
      {/* <div className="TP-Whole-div"> */}

      <div className="column-holder">
        <div className="column">

          <div className="TP-textType-buttons TP-Whole-div">
            <div className="TP-Options-div">
              <p className="TP-A-words HFont wgt"><i class="fa-solid fas fa-font"></i> Options: </p>
              <button className="default_button_noBorder" onClick={(e) => { handleLengthChange(e, 20, "select") }}><span className={option === 20 ? `yt` : ` `}>   20 </span></button>
              <button className="default_button_noBorder" onClick={(e) => { handleLengthChange(e, 50, "select") }}><span className={option === 50 ? 'yt' : ''}>   50</span> </button>
              <button className="default_button_noBorder" onClick={(e) => { handleLengthChange(e, 100, "select") }}><span className={option === 100 ? 'yt' : ''}>  100 </span> </button>
              <button className="default_button_noBorder" onClick={(e) => { handleLengthChange(e, -1, "select") }}><span className={option === -1 ? 'yt' : ''}>  Random </span> </button>


              {/* <button className="default_button" onClick={showChange}>Custom</button> */}
              <span className="yt">
                <OpenModalButton
                  customYellow={customYellow}
                  buttonText="Custom"
                  onButtonClick={clearOption}
                  onItemClick={closeMenu}
                  modalComponent={<TextFormModal from="Post" setTextObj={setTextObj} setCopyText={setCopyText} setShowTextArea={setShowTextArea} setMistakes={setMistakes} setMs={setMs} setStart={setStart} setUserText={setUserText} startTest={startTest} />}


                />
              </span>
            </div>
          </div>

        </div>
        {/* if clicked, render change button, and a default text and clicking that one that will open modal. The default is there to prevent errors if its a new user and they have no texts to render without having to give everyone a default card*/}
        {/* const [showTextArea, setShowTextArea] = useState(false) */}

      </div>

      <div className="column-holder">
        <div className="column">

          {showTextArea &&
            <>
              <form className="TP-form">

                <p className="wgt TP-copyText pFont">{copyText}</p>

                <textarea
                  value={userText}
                  onChange={(e) => userInputChange(e)}
                  className="TP-textarea textarea-Text noSizeChange"
                  autoFocus
                  onPaste={(e) => disablePaste(e)}
                  spellcheck="false"
                >
                </textarea>
              </form>
              <div className="TP-current-stats">


                <div ><p className="TP-current-stat HFont wgt">Characters left: <span className="pFont yt">{` ${userText.length}/${copyText.length}`}</span></p>  </div>
                <div ><p className="TP-current-stat HFont wgt">Mistakes: <span className="pFont yt">{mistakes}</span></p></div>

              </div>
            </>
          }
        </div>
      </div>
      <div className="column-holder">
        <div className="column click-toStart">
          {showStartButton && <button className="default_button" onClick={startTest}>
            Click to start!
          </button>}
        </div>
      </div>

      {/* if not started bottom text-footer */}
      {!showTextArea &&
        <div className="text-footer">

          <Footer></Footer>
        </div>
      }


      {showTextArea &&

      <Footer></Footer>
      }

    </>
  )
}

export default TextPage;
