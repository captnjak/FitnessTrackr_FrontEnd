import React, { useState } from 'react';
import { patchRoutine } from '../api';

const PatchRoutine = ({ setEdit, id, name, goal }) => {
	const [form, setForm] = useState({
		isPublic: 'true',
		name: '',
		goal: '',
	});

	const formReset = () => {
		setForm({ isPublic: 'true', name: '', goal: '' });
	};

	const handleCancel = async (e) => {
		e.preventDefault();
		try {
			setEdit('inactive');
		} catch (error) {
			throw error;
		}
	};

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handlePatch = async (e) => {
		e.preventDefault();

		try {
			await patchRoutine(e.target.id, form.name, form.goal);

			alert('Routine updated successfully');
			formReset();
			window.location.assign('/myroutines');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='editRoutine'>
			<h3>Edit Routine</h3>

			<form onSubmit={handlePatch} id={id}>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Name:
				</label>
				<input
					style={{ marginTop: '3px', padding: '3px' }}
					name="name"
					required
					placeholder={name}
					value={form.name}
					onChange={handleInput}
				/>
				<br></br>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Goal:
				</label>
				<input
					style={{ marginTop: '3px', padding: '3px' }}
					required
					name="goal"
					placeholder={goal}
					value={form.goal}
					onChange={handleInput}
				/>
				<br></br>
				<button
					style={{ marginTop: '3px', padding: '3px' }}
					type="submit"
					id="submit"
				>
					Save Edit
				</button>
				<button
					style={{ marginTop: '3px', padding: '3px' }}
					onClick={handleCancel}
					type="button"
					id="cancel"
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default PatchRoutine;
