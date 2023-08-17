import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import userStats from '../Profile/userStats';


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	// const [signedIn, setSignedIn] = useState(false)
	let users = useSelector(state => state.users)

	console.log(users)
	const [userNameSearch, setUserNameSearch] = useState("")


	const history = useHistory();
	// if (sessionUser?.username) {
	//  setSignedIn(true)
	// }
	const dispatch = useDispatch();
	if (Object.values(users).length === 0) return null
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		// closeMenu();
		history.push('/')
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (users[userNameSearch]) {
			history.push(`/users/${userNameSearch}`)
		} else {
			alert(`User with that username does not exist.
Please check spelling and try again`)
		}
	}




	return (
		<ul className='noPoint Nav-nav-div'>
			{sessionUser ? (<>
				{/* <li>
					<NavLink exact to="/">Home</NavLink>
				</li> */}
				<li><NavLink className="anti-link yt HFont" exact to="/test"><h1 className='BF'>ButterFingers</h1></NavLink></li>
				<li className='Nav-test'>
					<NavLink className="anti-link N-navLink wgt HFont" exact to="/test">Test</NavLink>
				</li>

				<li className='Nav-test'>
				<form className='form-div'>


					<label className='wgt HFont'>

						<input
							type="text"
							value={userNameSearch.toLocaleLowerCase()}
							onChange={(e) => setUserNameSearch(e.target.value.toLocaleLowerCase())}
							placeholder=" Username search"
							className='placeholder-Text'
						/>
					</label>
					<button className='default_button' onClick={handleSearch}>Search</button>

				</form>


				</li>
				<li className='Nav-test'>
					<div className='Nav-profile-logout-div'>
						<NavLink className="anti-link N-navLink wgt HFont" exact to={`/users/${sessionUser.username}`}>{sessionUser.username}</NavLink>
						{isLoaded && <button className="default_button" onClick={handleLogout}><i class="fa-solid fas fa-door-open"></i></button>}
					</div>

				</li>


				{/* {isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)} */}

			</>) : (<>	</>)}

		</ul>
	);




}

export default Navigation;
