import React, { useEffect, useState } from "react";

import { FaFilter, FaFileCsv, FaFilePdf } from "react-icons/fa";
import "./ProductionByOperatorStyle.css"; // Certifique-se de ter um arquivo CSS apropriado
import Papa from "papaparse";
import { ListProductionOrderType } from "../../../types/ProductionOrderTypes";
import { fetchProductionsOrders, fetchProductionOrderById } from "../../../requests/ProductionOrderRequests";

// Função para formatar a data no formato "dd/mm/aaaa"
function formatDate(date) {
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
}

function ProductionByOperator() {
	const [productionOrders, setProductionOrders] = useState<
		ListProductionOrderType[] | null
	>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
	const [availableOperators, setAvailableOperators] = useState<string[]>([]);
	const [filtersVisible, setFiltersVisible] = useState(false);

	useEffect(() => {
		populateProductionOrders().catch((error) => console.log(error));
	}, []);

	const populateProductionOrders = async () => {
		const productionOrdersIds = await fetchProductionsOrders();
		const productionOrdersDetails = await Promise.all(
			productionOrdersIds.map(async (productionOrderId) => {
				const productionOrderDetail = await fetchProductionOrderById(
					productionOrderId.id
				);
				return productionOrderDetail;
			})
		);
		setProductionOrders(productionOrdersDetails);

		const operators = productionOrdersDetails.map(
			(productionOrder) => productionOrder.employee_name
		);
		const uniqueOperators = [...new Set(operators)];
		setAvailableOperators(uniqueOperators);
	};

	const handleStartDateChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const date = event.target.value;
		setStartDate(date ? new Date(date) : null);
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const date = event.target.value;
		setEndDate(date ? new Date(date) : null);
	};

	const handleOperatorChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedOperator(event.target.value);
	};

	const handleFilterButtonClick = () => {
		setFiltersVisible(!filtersVisible);
	};

	const handleExportCsvClick = () => {
		if (filteredProductionOrders && filteredProductionOrders.length > 0) {
			console.log(filteredProductionOrders);

			const formattedDate = formatDate(new Date()); // Obtenha a data formatada

			const csvData = Papa.unparse({
				fields: ["created_at", "operator", "quantity"], // Cabeçalhos das colunas
				data: filteredProductionOrders.map((order) => ({
					created_at: formatDate(order.created_at),
					operator: order.employee_name,
					quantity: order.quantity,
				})),
			});

			const csvBlob = new Blob([csvData], { type: "text/csv" });
			const csvUrl = URL.createObjectURL(csvBlob);

			const downloadLink = document.createElement("a");
			downloadLink.href = csvUrl;

			// Use o formato de nome com a data no final
			downloadLink.download = `production_by_operator_${formattedDate}.csv`;

			downloadLink.click();

			// Lembre-se de revogar a URL quando não for mais necessária
			URL.revokeObjectURL(csvUrl);
		} else {
			console.error("filteredProductionOrders está indefinido ou vazio.");
		}
	};

	const filteredProductionOrders = productionOrders?.filter(
		(productionOrder) => {
			if (
				(startDate && productionOrder.created_at < startDate) ||
				(endDate && productionOrder.created_at > endDate)
			) {
				return false;
			}
			if (
				selectedOperator &&
				productionOrder.employee_name !== selectedOperator
			) {
				return false;
			}
			return true;
		}
	);

	return (
		<div className="production-by-operator-container">
			<h2 className="production-by-operator-title">Produção por Operador</h2>

			<div className="buttonsClass">
				<button className="filter" onClick={handleFilterButtonClick}>
					<FaFilter />
				</button>

				<button className="export-csv" onClick={handleExportCsvClick}>
					<FaFileCsv /> Exportar para CSV
				</button>
				{/* 
				<button className="export-pdf" onClick={handleExportPdfClick}>
					<FaFilePdf /> Exportar para PDF
				</button> */}
			</div>

			{filtersVisible && (
				<div>
					<div className="date-filter">
						<label htmlFor="startDate">Data Inicial: </label>
						<input
							type="date"
							id="startDate"
							value={startDate ? startDate.toISOString().split("T")[0] : ""}
							onChange={handleStartDateChange}
						/>
					</div>

					<div className="date-filter">
						<label htmlFor="endDate">Data Final: </label>
						<input
							type="date"
							id="endDate"
							value={endDate ? endDate.toISOString().split("T")[0] : ""}
							onChange={handleEndDateChange}
						/>
					</div>

					<div className="operator-filter">
						<label htmlFor="operatorFilter">Filtrar por Operador: </label>
						<select
							id="operatorFilter"
							value={selectedOperator || ""}
							onChange={handleOperatorChange}>
							<option value="">Todos</option>
							{availableOperators.map((operator, index) => (
								<option key={index} value={operator}>
									{operator}
								</option>
							))}
						</select>
					</div>
				</div>
			)}

			<table className="production-by-operator-table">
				<thead>
					<tr>
						<th className="production-by-operator-header">Data</th>
						<th className="production-by-operator-header">Operador</th>
						<th className="production-by-operator-header">Quantidade</th>
					</tr>
				</thead>
				<tbody>
					{filteredProductionOrders?.map((productionOrder, index) => (
						<tr key={index}>
							<td className="production-by-operator-date">
								{formatDate(productionOrder.created_at)}
							</td>
							<td className="production-by-operator-operator">
								{productionOrder.employee_name}
							</td>
							<td className="production-by-operator-quantity">
								{productionOrder.quantity}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default ProductionByOperator;
