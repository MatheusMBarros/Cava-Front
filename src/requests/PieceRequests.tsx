import axios from "axios";
import { Piece } from "../../../backend/src/Entities/Piece";
import { CreatePieceType, UpdatePieceType } from "../types/PieceType";

const url = "https://cavawebservicetest.onrender.com//piece";
export const createPiece = async ({
	name,
	handle_type,
	size,
	gross_weight,
	net_weight,
	splinter_lost_percentage,
}: CreatePieceType) => {
	try {
		await axios.post(url, {
			name,
			handle_type,
			size,
			gross_weight,
			net_weight,
			splinter_lost_percentage,
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

export async function fetchPiece(): Promise<Piece[]> {
	try {
		const response = await axios.get(url);
		return response.data as Piece[];
	} catch (error: any) {
		console.log(error);
		throw new Error();
	}
}

export const editPiece = async ({
	id,
	name,
	handle_type,
	size,
	gross_weight,
	net_weight,
	splinter_lost_percentage,
}: UpdatePieceType) => {
	try {
		await axios.put(`${url}/${id}`, {
			name,
			handle_type,
			size,
			gross_weight,
			net_weight,
			splinter_lost_percentage,
		});
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const findPiece = async (id: number): Promise<Piece> => {
	try {
		const response = await axios.get(`${url}/${id}`);
		return response.data as Piece;
	} catch (error: any) {
		console.log(error);
		throw new Error();
	}
};

export const deletePiece = async (id: number) => {
	try {
		await axios.delete(`${url}/${id}`);
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const getPieceName = async (id: number) => {
	try {
		const response = await axios.get(`${url}/${id}`);
		return response.data.name;
	} catch (error: any) {
		console.log(error);
		throw new Error();
	}
};
