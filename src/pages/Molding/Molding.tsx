import React, { useEffect, useState } from "react";
import "./MoldingStyle.css";
import { fetchMold } from "../../requests/MoldRequests";
import { fetchEmployee } from "../../requests/EmployeeRequests";
import {
	createProductionOrder,
	fetchLastOrder,
	verifyLastCounter,
} from "../../requests/ProductionOrderRequests";
import LastOrderData from "./LastOrderData";
import LogoutButton from "../../components/LoggoutButton/LogoutButton";

const ProductionOrder: React.FC = () => {
	const [initial_counter, setInitialCounter] = useState<number | null>(null);
	const [final_counter, setFinalCounter] = useState<number | null>(null);
	const [employee_fk, setEmployeeFk] = useState<number | null>(null);
	const [mold_fk, setMoldId] = useState<number | null>(null);
	const [openOrder, setOpenOrder] = useState<boolean>(false);
	const [created_at, setCreatedAt] = useState<Date | null>(null);
	const [molds, setMolds] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [lastOrderFinalCounter, setLastOrderFinalCounter] = useState<
		number | null
	>();
	const [description, setDescription] = useState<string>("");
	const [lastOrderData, setLastOrderData] = useState<any>(null);

	useEffect(() => {
		populateSelectors();
		lastCounter();
	}, []);

	const populateSelectors = async () => {
		const molds = await fetchMold();
		setMolds(molds);
		const allEmployees = await fetchEmployee();
		const moldingEmployees = allEmployees.filter(
			(employee) => employee.sector === "Moldagem"
		);
		setEmployees(moldingEmployees);
	};

	const lastCounter = async () => {
		const lastCounter = await verifyLastCounter();
		setLastOrderFinalCounter(lastCounter);
	};

	const fetchLastOrderData = async () => {
		try {
			const lastOrderData = await fetchLastOrder();
			setLastOrderData(lastOrderData);
		} catch (error) {
			console.error("Erro ao buscar os dados da última ordem:", error);
		}
	};

	const openOrderValidation = () => {
		setCreatedAt(new Date(-3));
		setMoldId(mold_fk);
		setEmployeeFk(employee_fk);
		setInitialCounter(initial_counter);
		setDescription(description);
		if (initial_counter != lastOrderFinalCounter) {
			return alert(
				"O contador inicial deve ser igual ao contador final da última ordem de produção!"
			);
		} else {
			setOpenOrder(true);
		}
	};

	const closeOrderValidation = () => {
		if (!final_counter) {
			alert("Preencha todos os campos!");
		}
		if (final_counter <= initial_counter!) {
			alert("O contador final deve ser maior que o contador inicial!");
		} else {
			const productionOrder = {
				initial_counter,
				final_counter,
				employee_fk,
				mold_fk,
				created_at,
				description,
			};

			createProductionOrder(productionOrder)
				.then(() => {
					// Após a criação da ordem de produção, atualize os dados da última ordem
					fetchLastOrderData();
					alert("Ordem de produção criada com sucesso!");
					setOpenOrder(false);
				})
				.catch((error) =>
					console.error("Erro ao criar a ordem de produção:", error)
				);
		}
	};

	const formatDateTime = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth().toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	};

	return (
		<>
			<div className="moldingContainer">
				<div className="lastOrderDataBox">
					<LastOrderData />
				</div>
				<div className="moldingBox">
					<h1>Nova Ordem de Produção</h1>
					<div>
						{!openOrder ? (
							<>
								<label htmlFor="moldFk">Molde</label>
								<select
									name="moldFk"
									id="moldFk"
									onChange={(event) => setMoldId(Number(event.target.value))}>
									<option>Selecione um molde</option>
									{molds.map((mold) => (
										<option key={mold.id} value={mold.id}>
											{mold.name}
										</option>
									))}
								</select>
								<label htmlFor="employeeFk">Funcionário</label>
								<select
									name="employeeFk"
									id="employeeFk"
									onChange={(event) =>
										setEmployeeFk(Number(event.target.value))
									}>
									<option>Selecione um funcionário</option>
									{employees.map((employee) => (
										<option key={employee.id} value={employee.id}>
											{employee.name}
										</option>
									))}
								</select>
								<label htmlFor="initialCounter">Contador Inicial</label>
								<input
									type="number"
									name="initialCounter"
									id="initialCounter"
									onChange={(event) =>
										setInitialCounter(Number(event.target.value))
									}
								/>
								<label htmlFor="createdAt">Data de Início</label>
								<input
									type="datetime-local"
									name="createdAt"
									id="createdAt"
									value={formatDateTime(new Date())}
								/>
								<button onClick={openOrderValidation}>Abrir Ordem</button>
							</>
						) : (
							<>
								<label htmlFor="finalCounter">Contador Final</label>
								<input
									type="number"
									name="finalCounter"
									id="finalCounter"
									onChange={(event) =>
										setFinalCounter(Number(event.target.value))
									}
								/>
								<label htmlFor="description">Descrição</label>
								<textarea
									name="description"
									id="description"
									onChange={(event) => {
										setDescription(event.target.value);
									}}
								/>
								<button onClick={closeOrderValidation}>Finalizar Ordem</button>
							</>
						)}
					</div>
					<LogoutButton />
				</div>
			</div>
		</>
	);
};

export default ProductionOrder;
