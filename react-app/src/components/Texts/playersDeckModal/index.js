import React, { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteText } from "../../../store/texts";
import { thunkGetAllTexts } from "../../../store/texts";
import TextFormModal from "../TextFormModal"
import './playersDeckModal.css'



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
      <h1 className="wgt HFont">No saved texts :(</h1>
    )
  }


  if (edit) {


    return <TextFormModal from="Edit" textObj={textObj} setEdit={setEdit} setCopyText={setCopyText} setShowTextArea={setShowTextArea} setMistakes={setMistakes} setMs={setMs} setStart={setStart} setUserText={setUserText} startTest={startTest} setTextObj={setTextObj2} />
  }






  return (
    <div className="PDM-div">



      {/* if user owns no cards return "no cards make cards and save them" */}
      <h1 className="wgt HFont"> Saved texts</h1>
      <div className="PDM-div-cards">

      {texts.map((text) => (
        <div className="PDM-card-delete-row">
          <button className="default_button" onClick={(e) => loadText(e, text)}> Name:{text.name},   Experience {text.textExp}</button>
          <button className="default_button" onClick={(e) => handleDelete(e, text.id)}>  <i  className="fa-solid fas fa-trash"></i></button>
          {/* if time truncate the first few lines */}
        </div>
      ))}
      </div>
      {/* can either reopen textFormModal when a card is picked with that info,
                OR
                rerender this modal to use the textFormModal edit version
                Think this way would be easier
                */}
      {/* use selector to grab all cards of current user from all texts state  */}

    </div>
  )









}
export default PlayersDeckModal;
