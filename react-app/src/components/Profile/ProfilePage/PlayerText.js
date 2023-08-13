import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateScore } from "../../../store/scores"
function PlayerText({ text, username }) {


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
            // grab end time to find time it took
            // create the text object to pass to the the results return
            // render a results page and un-render

        }
    }



    const startTest = () => {

        let startTime = new Date().getTime()
        console.log("hi in start test")
        setStart(startTime)

    }


    const handleRunIt = (e, textId) => {
        startTest()
        setRenderTest(true)
    }

    const handleNext = async () => {

        let kpm = (text.characterCount / (ms / 1000))
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

        let kpm = (text.characterCount / (ms / 1000))
        let res = await dispatch(thunkCreateScore(text.id, ms, mistakes, kpm, text.textExp, username.id))
        if (res?.error) {
            console.log("error", res)
        }
        setDone(false)
        setRenderTest(false)
    }

    // TODO BACK FROM BREAK, add "again" button mimics "next"
    if (done) {
        return (
            <>
                <hr></hr>
                <h4>Completed: {text.name}</h4>
                <h3>KPM {((text.characterCount / ms) * 60000).toFixed(2)}</h3>
                <h3>Time: {(ms / 1000).toFixed(2)}</h3>
                <h3>ACC: {(((text.characterCount) / (text.characterCount + mistakes)) * 100).toFixed(2)}%</h3>
                <h4>Word Count: {text.wordCount}</h4>
                <h4>Mistakes: {mistakes}</h4>
                <h4>Characters: {text.characterCount} </h4>
                <h4>non space Characters: {text.noSpaceCharacterCount}</h4>
                <h4>exp: {text.textExp}</h4>
                <button autoFocus onClick={handleNext}>Again!</button>
                <button onClick={handleClose}>Close</button>
            </>
        )
    }




    return (
        <>
            <hr></hr>
            <h4>{text.name}</h4>
            {/* TODO add onclick to redirect to testing with this card :') */}

            <button onClick={(e) => handleRunIt(e, text.id)}>run it!</button>
            {renderTest && <>


                <form>

                    <p>{text.typingText}</p>


                    <textarea
                        value={userText}
                        onChange={(e) => userInputChange(e)}
                        className="TP-textarea"
                        autoFocus
                    >
                    </textarea>
                </form>





            </>}
        </>
    );
}

export default PlayerText;
