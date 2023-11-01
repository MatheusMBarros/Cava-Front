import axios from "axios";
import {
	CreateMoldType,
	ListMoldType,
	MoldType,
	UpdatedMoldType,
} from "../types/MoldType";

const url = "http://192.168.2.103:10000/mold";

export const createMold = async ({
	name,
	total_weight,
	channel_return_weight,
	channel_lost_percentage,
}: CreateMoldType) => {
	try {
		return await axios.post(url, {
			name: name,
			total_weight: total_weight,
			channel_return_weight: channel_return_weight,
			channel_lost_percentage: channel_lost_percentage,
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

export async function fetchMold(): Promise<ListMoldType[]> {
	try {
		const response = await axios.get(url);
		console.log(response.data);
		return response.data as ListMoldType[];
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to fetch molds.");
	}
}
export async function findMold(id: number): Promise<MoldType> {
	try {
		const response = await axios.get(`${url}/${id}`);
		return response.data as MoldType;
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to fetch mold.");
	}
}

export async function deleteMold(id: number) {
	try {
		await axios.delete(`${url}/${id}`);
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to delete mold.");
	}
}

export const updateMold = async ({
	id,
	name,
	total_weight,
	channel_return_weight,
	channel_lost_percentage,
}: UpdatedMoldType) => {
	try {
		return await axios.put(`${url}/${id}`, {
			name: name,
			total_weight: total_weight,
			channel_return_weight: channel_return_weight,
			channel_lost_percentage: channel_lost_percentage,
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

export async function findMoldName(id: number): Promise<string> {
	try {
		const response = await axios.get(`${url}/${id}`);
		return response.data.name;
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to fetch mold.");
	}
}
