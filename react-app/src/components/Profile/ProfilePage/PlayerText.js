import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateScore } from "../../../store/scores"
import { thunkDeleteText } from "../../../store/texts";
import { thunkGetAllTexts } from "../../../store/texts";
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
            {owner && <i onClick={(e) => handleDelete(e, text.id)} className="fa-solid fas fa-trash"></i>}
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
