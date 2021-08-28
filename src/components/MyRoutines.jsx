import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { destroyRootAct, destroyRoutine, getRoutines } from '../api';
import AddActivity from './AddActivity';
import PatchRoutine from './PatchRoutine';

const myRoutines = ({ user, routines, setRoutines, activities }) => {
	const [edit, setEdit] = useState('inactive');
	const [act, setAct] = useState('inactive');
	const activitiesDupe = activities;

	const handleDelete = async (e) => {
		try {
			await destroyRoutine(e.target.id);

			const routines = await getRoutines();
			setRoutines(routines);
		} catch (error) {
			console.error(error);
		}
	};

	const handleActDelete = async (e) => {
		try {
			await destroyRootAct(e.target.id);

			const routines = await getRoutines();
			setRoutines(routines);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div>
			<h2>Routines created by:</h2>
			<h3>{user.username}</h3>
			<Link to="/createroutine">
				<button type="button" id="newRoutine">
					Create A New Routine
				</button>
			</Link>
			{routines.map(({ id, name, goal, creatorName, activities }) => (
				<div key={id} className="routineCard">
					{user.username === creatorName && (
						<>
							<button
								key={`keyEdit${id}`}
								type="button"
								id={`idEdit${id}`}
								onClick={() => setEdit('active')}
							>
								Edit Routine
							</button>
							{edit === 'active' && (
								<PatchRoutine
									setRoutines={setRoutines}
									setEdit={setEdit}
									edit={edit}
									id={id}
									name={name}
									goal={goal}
								>
									{' '}
								</PatchRoutine>
							)}
							<button
								onClick={handleDelete}
								type="button"
								id={id}
							>
								Delete Routine
							</button>
							<h4>Routine Name: {name}</h4>
							<h4>Routine Goal: {goal}</h4>
							<button
								key={`keyAct${id}`}
								type="button"
								id={`idAct${id}`}
								onClick={() => setAct('active')}
							>
								Add Activity
							</button>
							{act === 'active' && (
								<AddActivity
									routines={routines}
									activitiesDupe={activitiesDupe}
									setAct={setAct}
									act={act}
									id={id}
								>
									{' '}
								</AddActivity>
							)}
							<h5>Activities:</h5>
							{activities.map(
								({
									id,
									name,
									description,
									count,
									duration,
								}) => (
									<div key={id}>
										<button
											onClick={handleActDelete}
											type="button"
											id={id}
										>
											Delete Activity
										</button>
										<p>Name: {name}</p>
										<p>Description: {description}</p>
										<p>Count: {count}</p>
										<p>Duration: {duration}</p>
									</div>
								)
							)}
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default myRoutines;
