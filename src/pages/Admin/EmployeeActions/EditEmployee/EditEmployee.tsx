import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	findEmployee,
	updateEmployee,
} from "../../../../requests/EmployeeRequests";
import { UpdateEmployeeType } from "../../../../types/EmployeeType";

function EditEmployee() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [employee, setEmployee] = useState(null);

	useEffect(() => {
		fetchEmployee();
	}, []);

	const fetchEmployee = async () => {
		const employee = await findEmployee(Number(id));
		setEmployee(employee);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const updatedEmployee: UpdateEmployeeType = {
				id: Number(id),
				name: employee.name,
				password: employee.password,
				sector: employee.sector,
			};
			await updateEmployee(updatedEmployee);
			alert("Funcionario editado com sucesso!");
			navigate("/employeesActions");
		} catch (error) {
			console.log(error);
			alert("Erro ao editar funcionário!");
		}
	};

	return (
		<>
			<h1>Editar funcionário</h1>
			<br />
			<div className="formBox">
				<div>
					<div>
						<label htmlFor="name">Nome:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={employee ? employee.name : ""}
							onChange={(e) =>
								setEmployee({ ...employee, name: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor="password">Senha:</label>
						<input
							type="text"
							id="password"
							name="password"
							value={employee ? employee.password : ""}
							onChange={(e) =>
								setEmployee({ ...employee, password: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor="sector">Setor:</label>
						<input
							type="text"
							id="sector"
							name="sector"
							value={employee ? employee.sector : ""}
							onChange={(e) =>
								setEmployee({ ...employee, sector: e.target.value })
							}
						/>
					</div>

					<div className="buttonBox">
						<button onClick={handleSubmit}>Salvar</button>
					</div>

					<button
						className="backButton"
						onClick={() => navigate("/employeesActions")}>
						Voltar
					</button>
				</div>
			</div>
		</>
	);
}

export default EditEmployee;
