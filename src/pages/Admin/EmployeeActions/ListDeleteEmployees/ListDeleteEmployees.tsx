import React, { useEffect, useState } from "react";
import {
	fetchEmployee,
	deleteEmployee,
} from "../../../../requests/EmployeeRequests";
import "./ListDeleteEmployeesStyle.css";
import Menu from "../../../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";
function ListDeleteEmployees() {
	const [employees, setEmployees] = useState([]);
	const [sortKey, setSortKey] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");
	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const data = await fetchEmployee();
			setEmployees(data);
		} catch (error) {
			console.error("Erro ao buscar os operadores:", error);
		}
	};

	const deleteEmployeeFunciton = (funcionarioId) => {
		try {
			const confirm = window.confirm(
				"Tem certeza que deseja excluir este funcionário?"
			);
			if (confirm === true) {
				try {
					deleteEmployee(funcionarioId);
					fetchData();
				} catch (error: any) {
					alert(error);
				}
			}
		} catch (error: any) {
			alert("Erro ao deletar o funcionário:");
		}
	};

	const handleEdit = (employee) => {
		navigate(`/employee/${employee}`);
	};

	const handleSort = (key) => {
		if (key === sortKey) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};

	const sortedEmployees = [...employees].sort((a, b) => {
		const aValue = a[sortKey];
		const bValue = b[sortKey];
		if (sortKey === "name" || sortKey === "position" || sortKey === "sector") {
			return sortOrder === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}
		return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
	});

	return (
		<>
			<Menu />
			<div className="listar-funcionarios-container">
				<h1>Funcionarios</h1>
				<table className="funcionarios-table">
					<thead>
						<tr>
							<th>
								<button className="sortButton" onClick={() => handleSort("id")}>
									ID{" "}
									{sortKey === "id" && (
										<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
									)}
								</button>
							</th>
							<th>
								<button
									className="sortButton"
									onClick={() => handleSort("name")}>
									Nome{" "}
									{sortKey === "name" && (
										<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
									)}
								</button>
							</th>

							<th>
								<button
									className="sortButton"
									onClick={() => handleSort("sector")}>
									Setor{" "}
									{sortKey === "sector" && (
										<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
									)}
								</button>
							</th>
							<th>
								<button className="sortButton">Ações</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedEmployees.map((employee) => (
							<tr key={employee.id}>
								<td>{employee.id}</td>
								<td>{employee.name}</td>
								<td>{employee.sector}</td>
								<td>
									{
										<button
											className="edit-button"
											onClick={() => handleEdit(employee.id)}>
											Editar
										</button>
									}
									<button
										className="delete-button"
										onClick={() => deleteEmployeeFunciton(employee.id)}>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default ListDeleteEmployees;
