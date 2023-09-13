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
      setSettingEXP(false)
      setSettingKSPM(false)
    } else {
      setDisplayList(desKSPM)
      setSettingEXP(false)
      setSettingKSPM(true)
    }

  }
  const handleEXP = (e) => {
    if (settingEXP) {
      setDisplayList(acdTotalExp)
      setSettingEXP(false)
      setSettingKSPM(false)

    } else {
      setDisplayList(desTotalExp)
      setSettingEXP(true)
      setSettingKSPM(false)
    }
  }



  return (
    <>
      <div className="LB-buttonHolder">
        <button className="default_button" onClick={handleKSPM}>KSPM {!settingKSPM ? <i class="fa-solid fa fa-angle-up"></i> : <i class="fa-solid fa fa-angle-down"></i>}</button>
        <button className="default_button" onClick={handleEXP}>Total Exp {!settingEXP ? <i class="fa-solid fa fa-angle-up"></i> : <i class="fa-solid fa fa-angle-down"></i>}</button>
      </div>
      <div className="listHolderHolder">
        <div className="listHolder">
          <div className="yt recordHolderPre">
            <p> Placement</p>
            <p> Username</p>
            <p> Average KSPM</p>
            <p> Total Experience</p>

          </div>
          {/* <div> */}


          {displayList.map((user, i) => (

            <Link
              target="_blank"
              className="anti-link recordLink"
              to={`/users/${user.username}`}
            >
              <div className="wgt recordHolder">
                <p>{i+1}</p>
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
