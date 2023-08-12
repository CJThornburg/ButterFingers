import React, { useState } from "react";
// import {thunkSaveText} from "../../../store/text"
import { useDispatch } from "react-redux";

import { thunkCreateText, thunkEditText } from "../../../store/texts";
import { useModal } from "../../../context/Modal";
import OpenModalButton from "../../OpenModalButton";
import PlayerDeckModal from "../playersDeckModal"


function TextFormModal({ from, textObj, setCopyText, setTextObj, setShowTextArea, setMistakes, setMs, setStart, setUserText, startTest }) {
  const { closeModal, setModalContent } = useModal();
  const dispatch = useDispatch();

  let initialTextState = ""
  let initialNameState = ""
  const [errors, setErrors] = useState({})

  if (from === "Edit") {
    initialTextState = textObj.typingText
    initialNameState = textObj.name
  }

  // const [text, setText] = useState("")
  // wil be below, so can be used for create and edit
  const [text, setText] = useState(initialTextState || '')
  // TODO if time, make this its own pop up menu and submit, wtf-forms
  // const [name, setName] = useState("")
  const [name, setName] = useState(initialNameState || '')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (from === "Edit") {
      let textId = textObj.id

      const data = await dispatch(thunkEditText(name, text, textId))
      console.log("data from edit", data)
      setTextObj(data)
      setCopyText(text)
      setMistakes(0)
      setShowTextArea(true)
      setMs(0)
      setStart(0)
      setUserText("")
      startTest()
      closeModal()

    }









    // TODO check if user already has a card named this, if so don't submit, add error to error object to display "you must use a unique name  OR have a warning pop up to say "hey you about to save over it, you sure?
    if (from === "Post") {
      const data = await dispatch(thunkCreateText(name, text));
      console.log("hi1")
      if (data?.errors) {
        setErrors(data);

      } else {
        // need to query for the obj or return it from the fetch
        console.log("hi")
        console.log(data)
        setTextObj(data)
        setCopyText(text)
        setMistakes(0)
        setShowTextArea(true)
        setMs(0)
        setStart(0)
        setUserText("")
        startTest()
        closeModal()
      }
    }

  };

  // const closeMenu = () => setShowMenu(false);



  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="TFM-buttons-div">
          <button type="submit">save</button>

          {/* figure out how to allow users to open saved things if in edit form */}



          {from === "Post" && <OpenModalButton
            buttonText="Saved Texts"
            // onItemClick={closeMenu}

            modalComponent={<PlayerDeckModal setCopyText={setCopyText}  setTextObj2={setTextObj} setShowTextArea={setShowTextArea} setMistakes={setMistakes} setMs={setMs} setStart={setStart} setUserText={setUserText} startTest={startTest} />}
          />}

        </div>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>



        <textarea

          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        >
        </textarea>


        {/* close modal and opens test with current text value as the test text */}
        <button type="button">Run it!</button>
      </form>



    </>
  )





}
export default TextFormModal;
