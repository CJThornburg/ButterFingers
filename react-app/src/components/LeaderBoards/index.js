import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './LeaderBoards.css';


function LeaderBoards() {

  const users = useSelector(state => Object.values(state.users))
  const [displayList, setDisplayList] = useState(users)
  const [render, setRender] = useState(false)
  const usersObj = useSelector(state => state.users)


  console.log("usrs", users)
  console.log(displayList)

  useEffect(() => {
    setDisplayList(users)
  }, [render])

  if (users.length === 0) {
    return null
  }

  if (!render) {
    setRender(true)
  }
  
  const acdKSPM = users.toSorted((a, b) => a.averageKSPM - b.averageKSPM)
  const desKSPM = users.toSorted((a, b) => b.averageKSPM - a.averageKSPM)

  const acdTotalExp = users.toSorted((a, b) => a.totalExp - b.totalExp)
  const desTotalExp = users.toSorted((a, b) => b.totalExp - a.totalExp)







  return (
    <>
      <div className="listHolder">

        {displayList.map((user) => (
          <div>

            <p>{user.username}</p>
          </div>
        ))}

      </div>

    </>
  );
}

export default LeaderBoards;
