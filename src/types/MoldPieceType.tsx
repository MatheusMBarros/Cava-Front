import { Piece } from "../../../backend/src/Entities/Piece";

export type UpdateMoldPiece = {
	pieces: Piece[];
	id: number;
	mold_fk: number;
	piece_fk: number;
	cavity: number;
};

export type CreateMoldPieceType = {
	mold_fk: number;
	piece_fk: number;
	cavity: number;
};

export type ListMoldPieceType = {
	pieces: Piece[];
	id: number;
	mold_fk: number;
	piece_fk: number;
	cavity: number;
};
