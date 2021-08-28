import axios from 'axios';
import { getCurrentToken } from '../auth';

export const BASE_URL = 'https://ancient-garden-24060.herokuapp.com/api';
// export const BASE_URL = 'http://localhost:3001/api';

export async function getRoutines() {
	try {
		const { data } = await axios.get(`${BASE_URL}/routines`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function getRoutiensByUser() {
	try {
		const { data } = await axios.get(`${BASE_URL}/routines`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function destroyRoutine(id) {
	try {
		const { data } = await axios.delete(`${BASE_URL}/routines/${id}`, {
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + getCurrentToken(),
			},
		});
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getActivities() {
	try {
		const { data } = await axios.get(`${BASE_URL}/activities`);
		return data;
	} catch (error) {
		throw error;
	}
}

export async function patchRoutine(id, name, goal) {
	try {
		const { data } = await axios.patch(
			`${BASE_URL}/routines/${id}`,
			{
				isPublic: true,
				name: name,
				goal: goal,
			},
			{
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + getCurrentToken(),
				},
			}
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function createRootAct(id, count, duration) {
	try {
		const { data } = await axios.post(
			`${BASE_URL}/routines/${id}/activities`,
			{
				count: count,
				duration: duration,
			},
			{
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + getCurrentToken(),
				},
			}
		);
		console.log(data);
		return data;
	} catch (error) {}
}

export async function patchRootAct(id, count, duration) {
	try {
		const { data } = await axios.patch(
			`${BASE_URL}/routine_activities/${id}`,
			{
				count: count,
				duration: duration,
			},
			{
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + getCurrentToken(),
				},
			}
		);
		console.log(data);
		return data;
	} catch (error) {}
}

export async function destroyRootAct(id) {
	try {
		const { data } = await axios.delete(
			`${BASE_URL}/routine_activities/${id}`,
			{
				count: count,
				duration: duration,
			},
			{
				headers: {
					'Content-type': 'application/json',
					Authorization: 'Bearer ' + getCurrentToken(),
				},
			}
		);
		console.log(data);
		return data;
	} catch (error) {}
}
