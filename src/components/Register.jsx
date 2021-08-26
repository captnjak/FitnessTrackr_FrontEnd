import React, { useState } from 'react';
import axios from 'axios';
import { storeCurrentUser } from '../auth';
import { BASE_URL } from '../api';

const Register = ({ setUser }) => {
	const [form, setForm] = useState({ username: '', password: '' });

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${BASE_URL}/users/register`,
				{
					username: form.username,
					password: form.password,
				}
			);

			setUser(res.data.user);
            storeCurrentUser(res.data.user, res.data.token)
			alert('Thanks for registering with FitnessTrackr!')
			window.location.assign('/routines')
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Register</h1>

			<form onSubmit={handleSubmit}>
				<label>Username</label>
				<input name="username" value={form.username} onInput={handleInput} />
				<label>Password</label>
				<input
					name="password"
					value={form.password}
					onChange={handleInput}
					type="password"
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
