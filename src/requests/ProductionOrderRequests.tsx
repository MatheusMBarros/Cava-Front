import axios from "axios";
import {
	ListProductionOrderType,
	CreateProductionOrderType,
	UpdateProductionOrderType,
	LastProductionOrderType,
} from "../types/ProductionOrderTypes";

const url = "http://192.168.2.103:10000/productionOrder";
const lastOrderUrl = "http://192.168.2.103:10000/lastOrder";

export const createProductionOrder = async ({
	initial_counter,
	final_counter,
	employee_fk,
	mold_fk,
	created_at,
	description,
	finished_at,
}: CreateProductionOrderType) => {
	try {
		const response = await axios.post(url, {
			created_at,
			initial_counter,
			final_counter,
			employee_fk,
			mold_fk,
			description,
			finished_at,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export async function verifyLastCounter(): Promise<number> {
	try {
		const response = await axios.get(lastOrderUrl);
		const lastOrder: LastProductionOrderType = response.data;
		const finalCounter = lastOrder.final_counter;
		return finalCounter;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Erro ao buscar o contador final da última ordem de produção"
		);
	}
}

export const fetchLastOrder = async () => {
	const response = await axios.get(lastOrderUrl);
	return response.data;
};

export const fetchProductionsOrders = async (): Promise<
	ListProductionOrderType[]
> => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const deleteProductionOrder = async (id: number) => {
	try {
		const response = await axios.delete(`${url}/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const updateProductionOrder = async ({
	id,
	initial_counter,
	final_counter,
	employee_fk,
	mold_fk,
	description,
}: UpdateProductionOrderType & { id: number }) => {
	try {
		const response = await axios.put(`${url}/${id}`, {
			initial_counter,
			final_counter,
			employee_fk,
			mold_fk,
			finished_at: new Date(),
			description,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const fetchProductionOrderById = async (id: number) => {
	try {
		const response = await axios.get(`${url}/${id}`);
		const productionOrderData = response.data;

		const { mold_fk, employee_fk } = productionOrderData;

		const moldResponse = await axios.get(
			`http://192.168.2.103:10000/mold/${mold_fk}`
		);
		const employeeResponse = await axios.get(
			`http://192.168.2.103:10000/employee/${employee_fk}`
		);

		const moldData = moldResponse.data;
		const employeeData = employeeResponse.data;

		const finalData: ListProductionOrderType = {
			id: productionOrderData.id,
			initial_counter: productionOrderData.initial_counter,
			final_counter: productionOrderData.final_counter,
			quantity: productionOrderData.quantity,
			created_at: new Date(productionOrderData.created_at),
			finished_at: new Date(productionOrderData.finished_at),
			mold_fk: productionOrderData.mold_fk,
			mold_name: moldData.name,
			employee_fk: productionOrderData.employee_fk,
			employee_name: employeeData.name,
			description: productionOrderData.description,
			date: "",
			total_aluminium_loss:
				productionOrderData.quantity * moldData.mold_aluminium_loss,
		};

		return finalData;
	} catch (error) {
		console.log(error);
		return null;
	}
};
