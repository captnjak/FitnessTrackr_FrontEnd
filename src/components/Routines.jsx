import React from 'react';

const Routines = ({ routines }) => {
	return (
		<div>
			<h2>Routines:</h2>
			{routines.map(({ id, name, goal, creatorName, activities }) => (
				<div key={id} className='routineCard'>
					<h3>Name: {name}</h3>
					<h3>Goal: {goal}</h3>
                    <br></br>
					<h4>Activities:</h4>
					{activities.map(({ id, name, description, count, duration }) => (
						<div key={id}>
							<p><b>Name:</b> {name}</p>
							<p><b>Description:</b> {description}</p>
							<p><b>Count:</b> {count}</p>
							<p><b>Duration:</b> {duration}</p>
						</div>
					))}
					<p><b>Routine Creator:</b> {creatorName}</p>
				</div>
			))}
		</div>
	);
};

export default Routines;
