import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalButton.css'

function OpenModalButton({
  margin,
  customYellow,
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
    {margin?(<button id="Save-margin"  className="default_button left-text"  onClick={onClick}>{buttonText}</button>
    ) : (
<button   className={customYellow ? "default_button_yellow" : "default_button_noBorder"}  onClick={onClick}>{buttonText}</button>
    )}




    {/* // {margin ?  (<button   className={customYellow ? "default_button_yellow" : "default_button"}  onClick={onClick}>{buttonText}</button>):(<button   className={customYellow ? "default_button_yellow" : "default_button"}  onClick={onClick}>{buttonText}</button>)}
 */}

    </>
  );
}

export default OpenModalButton;
