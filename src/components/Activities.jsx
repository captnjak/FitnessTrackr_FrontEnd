import React, { useState } from 'react';
import axios from 'axios';
import { getCurrentToken } from '../auth';
import { BASE_URL, getActivities } from '../api';

const Activities = ({ activities, setActivities, user }) => {
	const [form, setForm] = useState({ name: '', description: '' });

	const handleInput = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const formReset = () => {
		setForm({ name: '', description: '' });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				`${BASE_URL}/activities`,
				{
					name: form.name,
					description: form.description,
				},
				{ headers: { Authorization: 'Bearer ' + getCurrentToken() } }
			);
			const allActivities = await getActivities();
			setActivities(allActivities);

			formReset();
		} catch (error) {
			throw (error, 'Error creating activity');
		}
	};

	return (
		<div>
			<h2>Activities:</h2>
			{user ? (
				<>
					<form onSubmit={handleSubmit}>
						<label>Name</label>
						<input
							required
							name="name"
							value={form.name}
							onInput={handleInput}
						/>
						<label>Description</label>
						<input
							required
							name="description"
							value={form.description}
							onChange={handleInput}
						/>
						<button type="submit">Create</button>
					</form>
					{activities.map(({ id, name, description }) => (
						<div key={id} className="activityCard">
							<p>
								<b>Name:</b> {name}
							</p>
							<p>
								<b>Description:</b> {description}
							</p>
						</div>
					))}
				</>
			) : (
				<>
					{activities.map(({ id, name, description }) => (
						<div key={id} className="activityCard">
							<p>
								<b>Name:</b> {name}
							</p>
							<p>
								<b>Description:</b> {description}
							</p>
						</div>
					))}
				</>
			)}
		</div>
	);
};

export default Activities;
