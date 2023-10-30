import React from "react";
import { FormEvent, useEffect, useState } from "react";
import "./EmployeeEnrollmentStyle.css";
import { createEmployee } from "../../../requests/EmployeeRequests";
import { CreateEmployeeType } from "../../../types/EmployeeType";
import Menu from "../../../components/Menu/Menu";

function EmployeeEnrollment() {
	const [name, setName] = useState<string>("");
	const [password, setPassord] = useState<string>("");
	const [sector, setSector] = useState<string>("");

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			if (
				name.trim() === "" ||
				password.trim() === "" ||
				sector.trim() === ""
			) {
				alert("Preencha todos os campos!");
				return;
			} else {
				const employee: CreateEmployeeType = {
					name,
					password,
					sector,
				};
				await createEmployee(employee);
				alert("Funcionário cadastrado com sucesso!");
				setName("");
				setPassord("");
				setSector("");
			}
		} catch (error: any) {
			console.log(error);
			alert("Erro ao cadastrar funcionário!");
		}
	}

	return (
		<>
			<div className="employeeForm">
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Nome:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Senha:</label>
						<input
							type="text"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassord(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="sector">Setor:</label>
						<select
							id="sector"
							name="sector"
							value={sector}
							onChange={(e) => setSector(e.target.value)}>
							<option value="">Selecione um setor</option>
							<option value="Administrativo">Administrativo</option>
							<option value="Moldagem">Moldagem</option>
							<option value="Fusão">Fusão</option>
							<option value="Vazamento">Vazamento</option>
							<option value="Jateamento">Jateamento</option>
							<option value="Corte de canal">Corte de canal</option>
							<option value="Usinagem">Usinagem</option>
							<option value="Rebarbação">Rebarbação</option>
							<option value="Pintura">Pintura</option>
							<option value="Embalagem">Embalagem</option>
							<option value="Almoxarifado">Almoxarifado</option>
						</select>
					</div>
					<button type="submit" className="submitButton">
						Cadastrar
					</button>
				</form>
			</div>
		</>
	);
}

export default EmployeeEnrollment;
