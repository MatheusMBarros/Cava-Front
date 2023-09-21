export type CreatePieceType = {
	name: string;
	handle_type: string;
	size: number;
	gross_weight: number;
	net_weight: number;
	splinter_lost_percentage: number;
};

export type UpdatePieceType = {
	id: number;
	name: string;
	handle_type: string;
	size: number;
	gross_weight: number;
	net_weight: number;
	splinter_lost_percentage: number;
};

export type ListPieceType = {
	id: number;
	name: string;
	handle_type: string;
	size: number;
	gross_weight: number;
	net_weight: number;
	splinter_lost_percentage: number;
};
