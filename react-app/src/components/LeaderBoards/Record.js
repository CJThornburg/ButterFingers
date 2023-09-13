import { Link } from "react-router-dom";
import { useState} from "react";

function Record({user, i, curUser }) {
    const [userMatch, setUserMatch] = useState(false)

    console.log(curUser)
    if (curUser=== user.username) {
        setUserMatch(true)
    }


    return (
    <Link
    target="_blank"
    className="anti-link recordLink"
    to={`/users/${user.username}`}
  >
    <div className="wgt recordHolder">
      <p className="recordText">{i+1}</p>
        {userMatch ? <p className="recordText yt">{user.username}</p> : <p className="recordText">{user.username}</p> }

      <p className="recordText">{user.averageKSPM}</p>
      <p className="recordText">{user.totalExp}</p>

    </div>
  </Link>
    )
}


export default Record
