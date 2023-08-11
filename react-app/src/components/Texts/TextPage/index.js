import React, { useState } from "react";
// import {thunkSaveText} from "../../../store/text"
import { useDispatch } from "react-redux";

import OpenModalButton from "../../OpenModalButton";
import TextFormModal from "../TextFormModal"



function TextPage() {

  const [change, setChange] = useState(false)
  const [showMenu, setShowMenu] = useState(false);

  // will need to have one where if user is using the preset length ones, change will be set back to false, onclick to any of those
  const showChange = (e) => {
    setChange(true)
  }

  const handleLengthChange = (e, num) => {
    console.log(num)
    console.log(e)

    // grab num and grab random public card from that length
    // if num === -1, just grab any random public card
    setChange(false)
    // grab
  }


  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <i className="fa-solid fas fa-trash-can"></i>
      <div className="TP-textType-buttons">
        <p className="TP-A-words"><span className="TP-A">A</span>words </p>
        <button onClick={(e) => { handleLengthChange(e, 20) }}>20</button>
        <button onClick={(e) => { handleLengthChange(e, 50) }}>50</button>
        <button onClick={(e) => { handleLengthChange(e, 100) }}>100</button>
        <button onClick={(e) => { handleLengthChange(e, -1) }}>Random</button>

        {/* if clicked, render change button, and a default text and clicking that one that will open modal. The default is there to prevent errors if its a new user and they have no texts to render without having to give everyone a default card*/}
        <button onClick={showChange}>Custom</button>
        {change && <OpenModalButton
          buttonText="Change"
          onItemClick={closeMenu}
          modalComponent={<TextFormModal from="Post" />}
        />}
      </div>

    </>
  )



}

export default TextPage;
