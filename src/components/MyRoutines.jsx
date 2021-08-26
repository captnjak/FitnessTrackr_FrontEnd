import React from 'react';
import { Link } from 'react-router-dom';
import { destroyRoutine, getRoutines } from '../api';

const myRoutines = ({ user, routines, setRoutines }) => {


	const handleDelete = async (e) => {
		try {
			await destroyRoutine(e.target.id);
			
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
							<Link to={`/patchroutine/${id}`}>
								<button type="button" id={id}>
									Edit Routine
								</button>
							</Link>
							<button onClick={handleDelete} type="button" id={id}>
								Delete Routine
							</button>
							<h4>Routine Name: {name}</h4>
							<h4>Routine Goal: {goal}</h4>
							<h5>Activities:</h5>
							{activities.map(({ id, name, description, count, duration }) => (
								<div key={id}>
									<p>Name: {name}</p>
									<p>Description: {description}</p>
									<p>Count: {count}</p>
									<p>Duration: {duration}</p>
								</div>
							))}
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default myRoutines;
