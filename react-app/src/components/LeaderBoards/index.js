import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './LeaderBoards.css';
import { Link } from "react-router-dom";


function LeaderBoards() {

  const users = useSelector(state => Object.values(state.users))
  const [displayList, setDisplayList] = useState(users)
  const [render, setRender] = useState(false)
  const usersObj = useSelector(state => state.users)

  const [settingKSPM, setSettingKSPM] = useState(true)
  const [settingEXP, setSettingEXP] = useState(true)
  console.log("usrs", users)
  console.log(displayList)
  const acdKSPM = users.toSorted((a, b) => a.averageKSPM - b.averageKSPM)
  const desKSPM = users.toSorted((a, b) => b.averageKSPM - a.averageKSPM)

  useEffect(() => {
  setDisplayList(desKSPM)
}, [render])

if (users.length === 0) {
    return null
  }

  if (!render) {
    setRender(true)
  }


  const acdTotalExp = users.toSorted((a, b) => a.totalExp - b.totalExp)
  const desTotalExp = users.toSorted((a, b) => b.totalExp - a.totalExp)


  const handleKSPM = (e) => {
    if (settingKSPM) {
      setDisplayList(acdKSPM)
      setSettingEXP(true)
      setSettingKSPM(false)
    } else {
      setDisplayList(desKSPM)
      setSettingEXP(true)
      setSettingKSPM(true)
    }

  }
  const handleEXP = (e) => {
    if (settingEXP) {
      setDisplayList(acdTotalExp)
      setSettingEXP(false)
      setSettingKSPM(true)

    } else {
      setDisplayList(desTotalExp)
      setSettingEXP(true)
      setSettingKSPM(true)
    }
  }



  return (
    <>
      <div className="LB-buttonHolder">
        <button className="default_button" onClick={handleKSPM}>KSPM</button>
        <button className="default_button" onClick={handleEXP}>Total Exp</button>
      </div>
      <div className="listHolderHolder">
        <div className="listHolder">
          <div className="yt recordHolderPre">

            <p> Username</p>
            <p> average KSPM</p>
            <p> Total Experience</p>

          </div>
          {/* <div> */}


          {displayList.map((user) => (

            <Link

              className="anti-link recordLink"
              to={`/users/${user.username}`}
            >
              <div className="wgt recordHolder">

                <p className="recordText">{user.username}</p>
                <p className="recordText">{user.averageKSPM}</p>
                <p className="recordText">{user.totalExp}</p>

              </div>
            </Link>
          ))}
          {/* </div> */}

        </div>
      </div>

    </>
  );
}

export default LeaderBoards;
