export type UpdateMoldPiece = {
	pieces: [];
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
	pieces: [];
	id: number;
	mold_fk: number;
	piece_fk: number;
	cavity: number;
};
