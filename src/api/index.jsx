import axios from 'axios';
import { getCurrentToken } from '../auth';

export const BASE_URL = 'https://ancient-garden-24060.herokuapp.com/api';
// export const BASE_URL = 'localhost:3001/api'

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
			headers: { Authorization: 'Bearer ' + getCurrentToken() },
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
				name: '',
				goal: '',
			},
			{ headers: { Authorization: 'Bearer ' + getCurrentToken() } }
		);
		return data;
	} catch (error) {
		console.error(error);
	}
}
