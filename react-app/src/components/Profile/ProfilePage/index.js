
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";



function ProfilePage() {


// need query by all but just username and id, so can filter texts and scores by user id
// const texts = useSelector(state => Object.values(state.texts))

// const texts = useSelector(state => Object.values(state.texts))
const texts = useSelector(state => Object.values(state.texts))















  return (
    <>
    <h1>
      rendering:
      profilePage
    </h1>
    </>
  );
}

export default ProfilePage;
