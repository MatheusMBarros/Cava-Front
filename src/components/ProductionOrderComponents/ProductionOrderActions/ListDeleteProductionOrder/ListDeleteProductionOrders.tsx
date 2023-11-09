import React, { useEffect, useState } from "react";
import "./ListDeleteProductionOrderStyle.css";
import { fetchProductionsOrders } from "../../../../requests/ProductionOrderRequests";
import { ListProductionOrderType } from "../../../../types/ProductionOrderTypes";
import { findMoldName } from "../../../../requests/MoldRequests";
import { findEmployeeName } from "../../../../requests/EmployeeRequests";
import { deleteProductionOrder } from "../../../../requests/ProductionOrderRequests";
import Menu from "../../../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";

function ListDeleteProductionOrders() {
	const [productionOrders, setProductionOrders] = useState<
		ListProductionOrderType[]
	>([]);
	const [moldNames, setMoldNames] = useState<Record<number, string>>({});
	const [employeeNames, setEmployeeNames] = useState<Record<number, string>>(
		{}
	);
	const navigate = useNavigate();

	useEffect(() => {
		populateProductionOrders().catch((error) => console.log(error));
	}, []);

	const populateProductionOrders = async () => {
		const productionOrders = await fetchProductionsOrders();
		setProductionOrders(productionOrders);

		const fetchDataPromises = productionOrders.map(async (order) => {
			const moldName = await findMoldName(order.mold_fk);
			const employeeName = await findEmployeeName(order.employee_fk);
			return {
				mold_fk: order.mold_fk,
				employee_fk: order.employee_fk,
				moldName,
				employeeName,
			};
		});

		const fetchedData = await Promise.all(fetchDataPromises);

		const moldNameMap = fetchedData.reduce(
			(acc, curr) => ({ ...acc, [curr.mold_fk]: curr.moldName }),
			{}
		);
		setMoldNames(moldNameMap);

		const employeeNameMap = fetchedData.reduce(
			(acc, curr) => ({ ...acc, [curr.employee_fk]: curr.employeeName }),
			{}
		);
		setEmployeeNames(employeeNameMap);
	};

	const handleDelete = async (id: number) => {
		if (
			!window.confirm("Tem certeza que deseja excluir esta ordem de produção?")
		)
			return;
		try {
			await deleteProductionOrder(id);
			populateProductionOrders();
		} catch (error) {
			console.log(error);
		}
	};

	function handleEdit(id: number): void {
		navigate(`/productionOrder/${id}`);
	}

	const formatDateTime = (date) => {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${day}/${month}/${year} - ${hours}:${minutes}`;
	};

	// Sort productionOrders by ID
	const sortedProductionOrders = [...productionOrders].sort(
		(a, b) => a.id - b.id
	);

	return (
		<>
			<h3>Lista de Ordens de Produção</h3>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Contador Inicial</th>
						<th>Contador Final</th>
						<th>Data de Criação</th>
						<th>Data de Atualização</th>
						<th>Quantidade de Moldes</th>
						<th>Molde</th>
						<th>Funcionário</th>
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{sortedProductionOrders.map(
						(productionOrder: ListProductionOrderType) => {
							return (
								<tr key={productionOrder.id}>
									<td>{productionOrder.id}</td>
									<td>{productionOrder.initial_counter}</td>
									<td>{productionOrder.final_counter}</td>
									<td>
										{formatDateTime(new Date(productionOrder.created_at))}
									</td>
									<td>
										{formatDateTime(new Date(productionOrder.finished_at))}
									</td>
									<td>{productionOrder.quantity}</td>
									<td>{moldNames[productionOrder.mold_fk]}</td>
									<td>{employeeNames[productionOrder.employee_fk]}</td>
									<td>
										<button
											className="delete-button"
											onClick={() => handleDelete(productionOrder.id)}>
											excluir
										</button>
										<button onClick={() => handleEdit(productionOrder.id)}>
											editar
										</button>
									</td>
								</tr>
							);
						}
					)}
				</tbody>
			</table>
		</>
	);
}

export default ListDeleteProductionOrders;
