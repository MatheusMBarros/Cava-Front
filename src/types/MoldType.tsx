export type CreateMoldType = {
	name: string;
	channel_return_weight: number;
	total_weight: number;
	channel_lost_percentage: number;
};

export type MoldType = {
	id: number;
	name: string;
	channel_return_weight: number;
	total_weight: number;
	channel_lost_percentage: number;
};

export type UpdatedMoldType = {
	id: number;
	name: string;
	channel_return_weight: number;
	total_weight: number;
	channel_lost_percentage: number;
};

export type ListMoldType = {
	id: number;
	name: string;
	channel_return_weight: number;
	total_weight: number;
	channel_lost_percentage: number;
};
