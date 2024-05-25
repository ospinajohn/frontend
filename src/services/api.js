import axios from 'axios';

const API_URL = 'http://localhost:8000/api/employees';

const getEmployees = () => {
	return axios.get(API_URL);
};

const createEmployee = employee => {
	return axios.post(API_URL, employee);
};

const getEmployeeById = id => {
	return axios.get(`${API_URL}/${id}`);
};

const updateEmployee = (id, employee) => {
	return axios.put(`${API_URL}/${id}`, employee);
};

const deleteEmployee = id => {
	return axios.delete(`${API_URL}/${id}`);
};

export {
	getEmployees,
	createEmployee,
	getEmployeeById,
	updateEmployee,
	deleteEmployee,
};
