import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { fetchEmployee } from "../../../../requests/EmployeeRequests";
import { fetchMold } from "../../../../requests/MoldRequests";
import {
	fetchProductionOrderById,
	updateProductionOrder,
} from "../../../../requests/ProductionOrderRequests";
import { UpdateProductionOrderType } from "../../../../types/ProductionOrderTypes";

function EditProductionOrder() {
	const { id } = useParams();
	const [productionOrder, setProductionOrder] =
		useState<UpdateProductionOrderType | null>(null);
	const [employees, setEmployees] = useState([]);
	const [molds, setMolds] = useState([]);
	const [selectedEmployeeId, setSelectedEmployeeId] = useState(0);
	const [selectedMoldId, setSelectedMoldId] = useState(0);
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				const fetchedOrder = await fetchProductionOrderById(Number(id));
				setProductionOrder(fetchedOrder);
				setSelectedEmployeeId(fetchedOrder.employee_fk);
				setSelectedMoldId(fetchedOrder.mold_fk);

				const fetchedEmployees = await fetchEmployee();
				setEmployees(fetchedEmployees);

				const fetchedMolds = await fetchMold();
				setMolds(fetchedMolds);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [id]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const updatedProductionOrder: UpdateProductionOrderType = {
				id: Number(id),
				initial_counter: Number(event.target[0].value),
				final_counter: Number(event.target[1].value),
				employee_fk: selectedEmployeeId,
				mold_fk: selectedMoldId,
				updated_at: new Date(),
				quantity: Number(event.target[1].value) - Number(event.target[0].value),
				description: description,
			};

			await updateProductionOrder(updatedProductionOrder);
			alert("Ordem de produção atualizada com sucesso!");
			navigate("/productionOrdersActions");
		} catch (error) {
			console.log(error);
		}
	};

	if (!productionOrder) {
		return <div>Loading...</div>;
	}

	return (
		<div className="formBox">
			<h3>Editar ordem de produção</h3>
			<br />
			<div className="form">
				<form onSubmit={handleSubmit}>
					<label htmlFor="initialCounter">Contador Inicial</label>
					<input
						type="number"
						name="initialCounter"
						id="initialCounter"
						defaultValue={productionOrder.initial_counter}
						required
						disabled
					/>
					<br />
					<label htmlFor="finalCounter">Contador Final</label>
					<input
						type="number"
						name="finalCounter"
						id="finalCounter"
						defaultValue={productionOrder.final_counter}
						required
					/>
					<br />

					<label htmlFor="employeeFk">Funcionário</label>
					<select
						name="employeeFk"
						id="employeeFk"
						value={selectedEmployeeId}
						onChange={(event) =>
							setSelectedEmployeeId(Number(event.target.value))
						}
						required>
						<option value="" disabled>
							Selecione um funcionário
						</option>
						{employees.map((employee) => (
							<option key={employee.id} value={employee.id}>
								{employee.name}
							</option>
						))}
					</select>
					<br />

					<label htmlFor="moldFk">Molde</label>
					<select
						name="moldFk"
						id="moldFk"
						value={selectedMoldId}
						onChange={(event) => setSelectedMoldId(Number(event.target.value))}
						required>
						<option value="" disabled>
							Selecione um molde
						</option>
						{molds.map((mold) => (
							<option key={mold.id} value={mold.id}>
								{mold.name}
							</option>
						))}
					</select>

					<br />

					<label htmlFor="description">Descrição</label>
					<input
						type="text"
						name="description"
						id="description"
						defaultValue={productionOrder.description}
						onChange={(event) => setDescription(event.target.value)}
						required
					/>
					<br />

					<button type="submit">Salvar</button>
					<button
						className="backButton"
						onClick={() => navigate("/productionOrdersActions")}>
						Voltar
					</button>
				</form>
			</div>
		</div>
	);
}

export default EditProductionOrder;
