import React, { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteText } from "../../../store/texts";
import { thunkGetAllTexts } from "../../../store/texts";
import TextFormModal from "../TextFormModal"



function PlayersDeckModal({ setCopyText, setShowTextArea, setMistakes, setMs, setStart, setUserText, startTest, setTextObj2 }) {
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user.id)
  const texts = useSelector(state => Object.values(state.texts).filter((text) => text.userId === user))
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false)
  const [textObj, setTextObj] = useState({})












  const handleDelete = (e, textId) => {

    async function deleteText() {

      await dispatch(thunkDeleteText(textId))

      await dispatch(thunkGetAllTexts())
    }

    deleteText()


  }



  const loadText = (e, textObj) => {
    setTextObj(textObj)
    setEdit(true)

  }

  let noSavedText = texts.length === 0

  if (noSavedText) {
    return (
      <h1>No saved texts :(</h1>
    )
  }


  if (edit) {


    return <TextFormModal from="Edit" textObj={textObj} setEdit={setEdit} setCopyText={setCopyText} setShowTextArea={setShowTextArea} setMistakes={setMistakes} setMs={setMs} setStart={setStart} setUserText={setUserText} startTest={startTest} setTextObj={setTextObj2} />
  }






  return (
    <>



      {/* if user owns no cards return "no cards make cards and save them" */}
      <h1> Saved texts</h1>
      {texts.map((text) => (
        <div>
          <button onClick={(e) => loadText(e, text)}> Name:{text.name},   Experience {text.textExp}</button>
          <i onClick={(e) => handleDelete(e, text.id)} className="fa-solid fas fa-trash"></i>
          {/* if time truncate the first few lines */}
        </div>
      ))}
      {/* can either reopen textFormModal when a card is picked with that info,
                OR
                rerender this modal to use the textFormModal edit version
                Think this way would be easier
                */}
      {/* use selector to grab all cards of current user from all texts state  */}

    </>
  )









}
export default PlayersDeckModal;
