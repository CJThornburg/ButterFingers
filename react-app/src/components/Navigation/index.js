import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch } from "react-redux";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	// const [signedIn, setSignedIn] = useState(false)

	const history = useHistory();
	// if (sessionUser?.username) {
	//  setSignedIn(true)
	// }
	const dispatch = useDispatch();
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		// closeMenu();
		history.push('/')
	};


	return (
		<ul className='noPoint Nav-nav-div'>
			{sessionUser ? (<>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				<li>
					<NavLink exact to="/test">Test</NavLink>
				</li>
				<li>
					<NavLink exact to={`/users/${sessionUser.username}`}>{sessionUser.username}</NavLink>
					{isLoaded && <button onClick={handleLogout}>Log Out</button> }

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
