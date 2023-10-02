import axios from "axios";
import { CreateEmployeeType, UpdateEmployeeType } from "../types/EmployeeType";

const url = "http://localhost:10000/employee";

export const createEmployee = async ({
	name,
	password,
	sector,
}: CreateEmployeeType) => {
	try {
		const response = await axios.post(url, {
			name: name,
			password: password,
			sector: sector,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchEmployee = async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findEmployee = async (id: number) => {
	try {
		const response = await axios.get(`${url + "/" + id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const deleteEmployee = async (id: number) => {
	try {
		const response = await axios.delete(`${url + "/" + id}`);
		return response.data;
	} catch (error) {
		return new Error(
			"Não foi possivel deletar o funcionario pois ele está associado a ordens de produção"
		);
	}
};

export const updateEmployee = async ({
	id,
	name,
	password,
	sector,
}: UpdateEmployeeType & { id: number }) => {
	try {
		const response = await axios.put(`${url + "/" + id}`, {
			name: name,
			password: password,
			sector: sector,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const findEmployeeName = async (id: number) => {
	try {
		const response = await axios.get(`${url + "/" + id}`);
		return response.data.name;
	} catch (error) {
		console.log(error);
		return null;
	}
};
