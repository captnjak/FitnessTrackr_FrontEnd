import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getCurrentToken } from '../auth';
import { BASE_URL, getRoutines } from '../api';

const CreateRoutine = ({ setRoutines }) => {
	const [form, setForm] = useState({
		isPublic: 'true',
		name: '',
		goal: '',
	});

	const formReset = () => {
		setForm({ isPublic: 'true', name: '', goal: '' });
	};

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleCreate = async (e) => {
		e.preventDefault();

		try {
			const res = await axios.post(
				`${BASE_URL}/routines`,
				{
					isPublic: true,
					name: form.name,
					goal: form.goal,
				},
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: 'Bearer ' + getCurrentToken(),
					},
				}
			);

			const routines = await getRoutines();
			setRoutines(routines);
			alert('Routine created successfully!');
			formReset();
			window.location.assign('/myroutines');
		} catch (error) {
			alert('Error Creating Routine', error);
		}
	};

	return (
		<div>
			<h1>Create New Routine</h1>

			<form onSubmit={handleCreate}>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Name:
				</label>
				<input
					style={{ marginTop: '3px', padding: '3px' }}
					required
					name="name"
					value={form.name}
					onInput={handleInput}
				/>{' '}
				<br></br>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Goal:
				</label>
				<input
					style={{ marginTop: '3px', padding: '3px' }}
					required
					name="goal"
					value={form.goal}
					onInput={handleInput}
				/>{' '}
				<br></br>
				<button
					style={{ marginTop: '3px', padding: '3px' }}
					type="submit"
				>
					Create Routine
				</button>
				<Link to="/myroutines">
					<button
						style={{ marginTop: '3px', padding: '3px' }}
						type="button"
						id="myroutines"
					>
						Cancel
					</button>
				</Link>
			</form>
		</div>
	);
};

export default CreateRoutine;
