import axios from "axios";
import { CreateMoldPieceType, ListMoldPieceType } from "../types/MoldPieceType";

const url = "https://cavawebservicetest.onrender.com/moldPiece";

export async function createMoldPiece({
	mold_fk,
	piece_fk,
	cavity,
}: CreateMoldPieceType): Promise<void> {
	try {
		await axios.post(url, {
			mold_fk,
			piece_fk,
			cavity,
		});
	} catch (error) {
		console.log(error);
		throw new Error();
	}
}

export async function fetchMoldPiece(): Promise<ListMoldPieceType[]> {
	try {
		const response = await axios.get(url);
		return response.data as ListMoldPieceType[];
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to fetch moldPiece.");
	}
}

export const deleteMoldPiece = async (id: number) => {
	try {
		await axios.delete(`${url}/${id}`);
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const updateMoldPieces = async (updatedMoldPieces) => {
	try {
		const cavityValues = updatedMoldPieces.map(({ cavity }) => cavity);

		if (new Set(cavityValues).size !== cavityValues.length) {
			throw new Error("Duplicate cavity values.");
		}

		const updateRequests = updatedMoldPieces.map(
			({ id, mold_fk, piece_fk, cavity }) => {
				return axios.put(`${url}/${id}`, {
					cavity,
					mold_fk,
					piece_fk,
				});
			}
		);
		// Use Promise.all to send all update requests concurrently
		await Promise.all(updateRequests);
	} catch (error) {
		console.log(error);
		throw new Error();
	}
};

export const findMoldPiece = async (id: number): Promise<ListMoldPieceType> => {
	try {
		const response = await axios.get(`${url}/${id}`);
		return response.data as ListMoldPieceType;
	} catch (error: any) {
		console.log(error);
		throw new Error();
	}
};

export const fetchMoldPieceByMoldId = async (
	mold_fk: number
): Promise<ListMoldPieceType[]> => {
	try {
		const response = await axios.get(
			`https://cavawebservicetest.onrender.com/moldParts/${mold_fk}`
		);
		return response.data as ListMoldPieceType[];
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to fetch mold pieces by mold id.");
	}
};

export const totalAluminiumLossPerMold = async (
	mold_fk: number
): Promise<number> => {
	try {
		const response = await axios.get(
			`https://cavawebservicetest.onrender.com/aluminiumLoss/${mold_fk}`
		);
		console.log(response.data);

		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error("Failed to fetch mold pieces by mold id.");
	}
};
