export type CreateProductionOrderType = {
	initial_counter: number;
	final_counter: number;
	employee_fk: number;
	mold_fk: number;
	created_at: Date;
	finished_at: Date;
	description: string;
};

export type UpdateProductionOrderType = {
	id: number;
	initial_counter: number;
	final_counter: number;
	employee_fk: number;
	mold_fk: number;
	finished_at: Date;
	quantity: number;
	description: string;
};
export type ListProductionOrderType = {
	date: string;
	id: number;
	initial_counter: number;
	final_counter: number;
	created_at: Date;
	finished_at: Date;
	quantity: number;
	employee_fk: number;
	mold_fk: number;
	employee_name: string;
	mold_name: string;
	description: string;
	total_aluminium_loss: number;
};

export type LastProductionOrderType = {
	id: number;
	initial_counter: number;
	final_counter: number;
	quantity: number;
	created_at: Date;
	finished_at: Date;
	mold_fk: number;
	mold_name: string;
	employee_fk: number;
	employee_name: string;
	description: string;
};
