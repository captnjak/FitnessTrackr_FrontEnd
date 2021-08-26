import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Register, Login } from '../components';

import { clearCurrentUser } from '../auth';

const Header = ({ setUser, user }) => {
	const logout = () => {
		setUser();
		clearCurrentUser();
		localStorage.clear();
	};

	return (
		<header>
			<h1>Fitness Tracker!</h1>
			<nav>
				{user ? (
					<li>
						<Link to='/'>Home</Link>
						<Link to="/routines">Routines</Link>
						<Link to="/myroutines" >My Routines</Link>
						<Link to="/activities">Activities</Link>
						<Link to="/">
							<button onClick={logout}>LOG OUT user: <b>{user.username}</b></button>
						</Link>
					</li>
				) : (
					<>
						<Link to="/">Home</Link>
						<Link to="/register">Register</Link>
						<Link to="/Login">Login</Link>
						<Link to="/routines">Routines</Link>
						<Link to="/activities">Activities</Link>

						<Switch>
							<Route path="/Register">
								<Register setUser={setUser} />
							</Route>

							<Route path="/Login">
								<Login setUser={setUser} />
							</Route>
						</Switch>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
