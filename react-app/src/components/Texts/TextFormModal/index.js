import React, { useState, useEffect } from "react";
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
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({})
  const [vaErrors, setVaErrors] = useState({});


  if (from === "Edit") {
    initialTextState = textObj.typingText
    initialNameState = textObj.name
  }



  const [text, setText] = useState(initialTextState || '')
  const [name, setName] = useState(initialNameState || '')



  useEffect(() => {
    const err = {};

    let spaceCheck = text.split(" ").length
    console.log(spaceCheck)

    console.log(name.trim(), "trim result")

    if (!name.replace(/\s/g, '').length) {
      err["Name"] = 'Name can not contain only whitespace (ie. spaces, tabs or line breaks)'
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
    }
    if (!text.replace(/\s/g, '').length) {
      err["Text"] = 'Name can not contain only whitespace (ie. spaces, tabs or line breaks)'
      console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
    }

    // if (name.trim().length > 0) {
    //   console.log("in trim error")
    //   err["Name"] = "Name can not just be a bunch of spaces"
    // }

    if (text.length < 10)
      err["Text"] = "text needs 10 or more characters";
    if (text.length > 1000)
      err["Text"] = " Text needs to be less than 225 or more characters";

    if (name.length < 4) {
      err["Name"] = "Name  needs 4 or more characters";
    }
    if (name.length > 25) {
      err["Name"] = "Name needs to be less than 25 or more characters";
    }


    // console.log(err)
    setVaErrors(err);
  }, [name, text]);


  const handleSubmit = async (e) => {


    e.preventDefault();

    setSubmitted(true);

    if (Object.keys(vaErrors).length) {
      return;
    }



    if (from === "Edit") {
      let textId = textObj.id

      const data = await dispatch(thunkEditText(name, text, textId))

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

      if (data?.errors) {
        setErrors(data);

      } else {
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

  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="TFM-buttons-div">
          <button type="submit">save</button>

          {/* figure out how to allow users to open saved things if in edit form */}



          {from === "Post" && <OpenModalButton
            buttonText="Saved Texts"
            modalComponent={<PlayerDeckModal setCopyText={setCopyText} setTextObj2={setTextObj} setShowTextArea={setShowTextArea} setMistakes={setMistakes} setMs={setMs} setStart={setStart} setUserText={setUserText} startTest={startTest} />}
          />}

        </div>

        {vaErrors.Name && submitted && (
          <p className="error-text">*{vaErrors.Name}</p>
        )}
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>


        {vaErrors.Text && submitted && (
          <p className="error-text">*{vaErrors.Text}</p>
        )}
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
