import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createRootAct, patchRootAct } from '../api';

const AddActivity = ({ setAct, activitiesDupe, id }) => {
	const [form, setForm] = useState({
		count: '',
		duration: '',
	});

	const handleCancel = async (e) => {
		e.preventDefault();
		try {
			setAct('inactive');
		} catch (error) {
			throw error;
		}
	};

	const formReset = () => {
		setForm({ count: '', duration: '' });
	};
	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		
		try {
			await createRootAct(e.target.id, form.count, form.duration);
			
			alert('Activity added successfully');
			formReset();
			window.location.assign('/myroutines');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='addActivity'>
			<h4>Add Activity</h4>

			<form onSubmit={handleSubmit} id={id}>
				<br></br>
					<label style={{ marginTop: '3px', padding: '3px' }}>
						Activities:
					</label>
					<select name="activities" onChange={handleInput}>
						<option value="">No Activity</option>
						{activitiesDupe.map((activity) => {
							return (
								<option key={activity.id} value={activity.id}>
									{activity.name}
								</option>
							);
						})}
					</select>
				<br></br>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Count:
				</label>
				<input
					placeholder='Count'
					style={{ marginTop: '3px', padding: '3px' }}
					required
					name="count"
					value={form.count}
					onInput={handleInput}
				/>
				<br></br>
				<label style={{ marginTop: '3px', padding: '3px' }}>
					Duration:
				</label>
				<input
					placeholder='Duration'
					style={{ marginTop: '3px', padding: '3px' }}
					required
					name="duration"
					value={form.duration}
					onInput={handleInput}
				/>
				<button
					style={{ marginTop: '3px', padding: '3px' }}
					type="submit"
				>
					Add Activity
				</button>
					<button
						style={{ marginTop: '3px', padding: '3px' }}
						onClick= {handleCancel}
						type="button"
						id="cancel"
					>
						Cancel
					</button>
			</form>
		</div>
	);
};

export default AddActivity;
