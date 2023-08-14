import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useHistory } from "react-router-dom";

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	// const [signedIn, setSignedIn] = useState(false)


	// if (sessionUser?.username) {
	//  setSignedIn(true)
	// }




		return (
			<ul className='noPoint Nav-nav-div'>
				<li>
					<NavLink exact to="/">Home</NavLink>
				</li>
				{sessionUser?  (<>	<li>
					<NavLink exact to="/test">Test</NavLink>
				</li>
				{/* <li>
					<NavLink exact to={`${}`}>Test</NavLink>
				</li> */}

				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}</>) : (<>	<li>
					<NavLink exact to="/login">Sign UP!</NavLink>
				</li>
				{/* <li>
					<NavLink exact to={`${}`}>Test</NavLink>
				</li> */}

				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}</>) }

			</ul>
		);



	return (
		<ul className='noPoint'>
			<li>
				<NavLink exact to="/">Home</NavLink>
			</li>
			<li>
				<NavLink exact to="/login">Sign up!</NavLink>
			</li>
			{/* <li>
				<NavLink exact to={`${}`}>Test</NavLink>
			</li> */}

			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
