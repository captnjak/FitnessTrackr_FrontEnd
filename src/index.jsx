import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getActivities, getRoutines } from './api';
import { Header, Routines, Activities, MyRoutines, CreateRoutine, PatchRoutine } from './components';
import { getCurrentUser } from './auth';

const App = () => {
	const [user, setUser] = useState(getCurrentUser);
	const [routines, setRoutines] = useState([]);
	const [activities, setActivities] = useState([]);


	useEffect(() => {
		getRoutines()
			.then((routines) => {
				setRoutines(routines);
			})
			.catch((error) => {
				throw error;
			});
		getActivities()
			.then((activities) => {
				setActivities(activities);
			})
			.catch((error) => {
				throw error;
			});
	}, []);

	return (
		<BrowserRouter>
			<div>
				<Header setUser={setUser} user={user} />

				<Switch>
					<Route exact path="/"> Please select a link above to navigate!</Route>
					<Route path="/routines">
						<Routines routines={routines} />
					</Route>
					<Route path="/myroutines">
						<MyRoutines routines={routines} user={user} setRoutines={setRoutines} activities={activities}/>
					</Route>
					<Route path="/activities">
						<Activities activities={activities} user={user} setActivities={setActivities} />
					</Route>
                    <Route path="/createroutine">
						<CreateRoutine user={user} setRoutines={setRoutines} />
					</Route>
					{/* <Route path="/patchroutine">
						<PatchRoutine routines={routines} setRoutines={setRoutines}/>
					</Route> */}
				</Switch>
			</div>
		</BrowserRouter>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
