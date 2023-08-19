import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateScore } from "../../../store/scores"
import { thunkDeleteText } from "../../../store/texts";
import { thunkGetAllTexts } from "../../../store/texts";
import './ProfilePage.css'
import { disablePaste } from '../../../utils'

function PlayerText({ text, username, owner }) {


    const [renderTest, setRenderTest] = useState(false)
    const [done, setDone] = useState(false)
    const [mistakes, setMistakes] = useState(0)
    const [ms, setMs] = useState()
    const [start, setStart] = useState(0)
    const [userText, setUserText] = useState("")
    const resultsObj = {}
    const dispatch = useDispatch();



    let currentIndex
    const userInputChange = (e) => {
        setUserText(e.target.value)
        currentIndex = userText.length
        if (e.target.value[currentIndex] !== text.typingText[currentIndex]) {
            setMistakes(mistakes + 1)
            setUserText(userText.substring(0, userText.length))
        }

        if (userText.length === text.typingText.length - 1) {
            let endTime = new Date().getTime()

            let timing = endTime - start
            resultsObj.time = timing
            resultsObj.mistakes = mistakes
            let done = true
            setDone(done)
            setMs(timing)


        }
    }



    const startTest = () => {

        let startTime = new Date().getTime()

        setStart(startTime)

    }


    const handleRunIt = (e, textId) => {
        startTest()
        setRenderTest(true)
    }

    const handleNext = async () => {
        let kpm = (((text.characterCount * 60)/ (ms /1000)))

        let res = await dispatch(thunkCreateScore(text.id, ms, mistakes, kpm, text.textExp, username.id))
        if (res?.error) {
            console.log("error", res)
        }
        setUserText("")
        setMistakes(0)
        setMs()
        setDone(false)
        startTest()
    }

    const handleClose = async () => {

        let kpm = (((text.characterCount * 60)/ (ms /1000)))
        console.log("text.characterCount", text.characterCount)
        console.log("ms", ms)
        console.log(kpm)
        let res = await dispatch(thunkCreateScore(text.id, ms, mistakes, kpm, text.textExp, username.id))
        if (res?.error) {
            console.log("error", res)
        }
        setDone(false)
        setRenderTest(false)
        setUserText("")
    }

    const handleEarlyClose = async () => {
        setDone(false)
        setRenderTest(false)
        setUserText("")
    }
    const handleDelete = (e, textId) => {

        async function deleteText() {

            await dispatch(thunkDeleteText(textId))

            await dispatch(thunkGetAllTexts())
        }

        deleteText()



    }



    if (done) {
        return (
            <>

                <h4 className="pFont wgt">Completed: <span className="yt "> {text.name}</span></h4>
                <h3 className="pFont wgt">KSPM: <span className="yt ">{((text.characterCount * 60) / (ms / 1000)).toFixed(2)}</span> </h3>
                <h3 className="pFont wgt">Time:  <span className="yt ">{(ms / 1000).toFixed(2)}</span></h3>
                <h3 className="pFont wgt">ACC: <span className="yt "> {(((text.characterCount) / (text.characterCount + mistakes)) * 100).toFixed(2)}%</span></h3>
                <h4 className="pFont wgt">Word Count: <span className="yt "> {text.wordCount}</span></h4>
                <h4 className="pFont wgt">Mistakes: <span className="yt ">{mistakes}</span> </h4>
                <h4 className="pFont wgt">Characters: <span className="yt ">{text.characterCount}</span>  </h4>
                <h4 className="pFont wgt">non space Characters: <span className="yt ">{text.noSpaceCharacterCount}</span> </h4>
                <h4 className="pFont wgt">exp: <span className="yt ">{text.textExp}</span> </h4>
                <div className="PT-button-div">

                    <button className="default_button" autoFocus onClick={handleNext}>Again!</button>
                    <button className="default_button" onClick={handleClose}>Close</button>

                </div>
            </>
        )
    }




    return (
        <>

            <h4 className="wgt pFont">{text.name}</h4>
            {/* TODO add onclick to redirect to testing with this card :') */}


            <div className="PT-button-div-run-del">
                {!renderTest && <button className="default_button" onClick={(e) => handleRunIt(e, text.id)}>run it!</button>}


                {/* !!!!!!!!!!!!!!!!!!!!!!! */}
                {/* {owner && !renderTest &&
                    <button className="default_button">
                        <i onClick={(e) => handleDelete(e, text.id)} className=" fa-solid fas fa-trash"></i> </button>} */}
            </div>

            {renderTest && <>


                <form>

                    <p className="pFont wgt">{text.typingText}</p>


                    <textarea
                        value={userText}
                        onChange={(e) => userInputChange(e)}
                        className=" placeholder-Text noSizeChange"
                        autoFocus
                        id="PP-textAreas"
                        onPaste={(e) => disablePaste(e)}
                    >
                    </textarea>

                </form>
                <div className="TP-current-stats">


                    <div ><p className="TP-current-stat HFont wgt">Characters left: <span className="pFont yt">{` ${userText.length}/${text.typingText.length}`}</span></p>  </div>
                    <div ><p className="TP-current-stat HFont wgt">Mistakes: <span className="pFont yt">{mistakes}</span></p></div>

                </div>
                <button className="default_button" onClick={handleEarlyClose}>Quit</button>




            </>}
        </>
    );
}

export default PlayerText;
