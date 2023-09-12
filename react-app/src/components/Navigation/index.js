import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import userStats from '../Profile/userStats';
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SearchResultsModal from './SearchResultsModal'


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	let users = useSelector(state => state.users)
	const { setModalContent, setOnModalClose } = useModal();
	const [userNameSearch, setUserNameSearch] = useState("")

	const history = useHistory();
	const dispatch = useDispatch();
	if (Object.values(users).length === 0) return null
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		history.push('/')
	};

	const handleSearch = (e) => {
		e.preventDefault();
		let exactMatch = false
		if (users[userNameSearch]) {
			exactMatch = true
			setUserNameSearch("")
		}

		const similarUsers1 = Object.values(users).filter(user => user.username.includes(userNameSearch))

		setModalContent(<SearchResultsModal exactMatch={exactMatch} exactUserName={userNameSearch} results={similarUsers1} />);
	}




	return (
		<ul className='noPoint Nav-nav-div'>
			{sessionUser ? (
				<>

					<li><NavLink className="anti-link yt HFont" exact to="/test"><h1 className='BF'>ButterFingers</h1></NavLink></li>

					<li className='Nav-test'>
						<NavLink className="anti-link N-navLink wgt HFont" exact to="/test">Test</NavLink>
					</li>
					<li className='Nav-test'>
						<NavLink className="anti-link N-navLink wgt HFont" exact to="/leaderboards">Leader Boards</NavLink>
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
				</>
			)
				:
				(<>	</>)}
		</ul>
	);
}

export default Navigation;
