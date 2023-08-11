import React, { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { thunkDeleteText } from "../../../store/texts";
import { thunkGetAllTexts } from "../../../store/texts";



function PlayersDeckModal() {
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user.id)
  const texts = useSelector(state => Object.values(state.texts).filter((text) => text.userId === user))
  const dispatch = useDispatch();








  // if ()
  // use selector, grab all text made by current user
  // use that to make text "buttons"
  // when the button is clicked, opens up edit form
  // think I will need ot pass do

  // when text is clicked, want to open that text into a editTextForm
  const handleDelete = (e, textId) => {

    async function deleteText() {
      //     await dispatch(authenticate())
      //     await dispatch(thunk())
      //   }

      await dispatch(thunkDeleteText(textId))

      await dispatch(thunkGetAllTexts())
    }

    deleteText()


  }





  return (
    <>
      {/* if user owns no cards return "no cards make cards and save them" */}
      <h1> hi :)</h1>
      {texts.map((text) => (
        <div>
          <button> Name:{text.name},   Experience {text.textExp}</button>
          <i onClick={(e) => handleDelete(e, text.id)} class="fa-solid fas fa-trash"></i>
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
