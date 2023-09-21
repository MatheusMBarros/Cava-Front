export type CreateEmployeeType = {
	name: string;
	password: string;
	sector: string;
};

export type UpdateEmployeeType = {
	id: number;
	name: string;
	password: string;
	sector: string;
};

export type ListEmployeeType = {
	id: number;
	name: string;
	password: string;
	sector: string;
};
