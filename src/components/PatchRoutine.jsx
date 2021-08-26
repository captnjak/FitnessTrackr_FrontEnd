import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivities, patchRoutine } from '../api';

const PatchRoutine = ({ routines, activities }) => {
	const [form, setForm] = useState({
		isPublic: '',
		name: '',
		goal: '',
	});

	const {rootName, rootGoal } = routines;

	console.log('patch routines', routines);
	console.log('patch activities', activities);

	const formReset = () => {
		setForm({ isPublic: '', name: '', goal: '' });
	};

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handlePatch = async (e) => {
		try {
			await patchRoutine(e.target.id);
			alert('Routine updated successfully');
			setRoutines(routines);

			formReset();
			window.location.assign('/myroutines');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1>Edit Routine</h1>

			<form onSubmit={handlePatch}>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Name:
				</label>
				<input
					style={{ marginTop: '3px', padding: '3px' }}
					name='name'
					required
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
					value={form.goal}
					onChange={handleInput}
				/>
				<br></br>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Activities:
				</label>
				<select name="activities" onChange={handleInput}>
					<option>{getActivities}</option>
				</select>
				<br></br>
				<button
					style={{ marginTop: '3px', padding: '3px' }}
					type="submit"
				>
					Save Edit
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

export default PatchRoutine;
