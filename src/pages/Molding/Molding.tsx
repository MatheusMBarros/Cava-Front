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
	const [finished_at, setFinishedAt] = useState<Date | null>(null);

	useEffect(() => {
		const savedOrderData = localStorage.getItem("productionOrderData");
		if (savedOrderData) {
			const parsedData = JSON.parse(savedOrderData);
			setMoldId(parsedData.mold_fk);
			setEmployeeFk(parsedData.employee_fk);
			setInitialCounter(parsedData.initial_counter);
			setOpenOrder(true);
			setCreatedAt(parsedData.created_at);
		}
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

	const openOrderValidation = () => {
		const currentDateTime = new Date();
		const currentDateTimeWithTimezone = new Date(
			currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000
		);

		setCreatedAt(currentDateTimeWithTimezone);
		setMoldId(mold_fk);
		setEmployeeFk(employee_fk);
		setInitialCounter(initial_counter);
		setDescription(description);

		if (initial_counter !== lastOrderFinalCounter) {
			return alert(
				"O contador inicial deve ser igual ao contador final da última ordem de produção!"
			);
		} else {
			setOpenOrder(true);

			// Save order data to localStorage
			localStorage.setItem(
				"productionOrderData",
				JSON.stringify({
					mold_fk,
					employee_fk,
					initial_counter,
					created_at: currentDateTimeWithTimezone,
				})
			);
		}
	};

	const closeOrderValidation = () => {
		const currentDateTime = new Date();
		const currentDateTimeWithTimezone = new Date(
			currentDateTime.getTime() - currentDateTime.getTimezoneOffset() * 60000
		);
		setFinishedAt(currentDateTimeWithTimezone);
		if (!final_counter) {
			alert("Preencha todos os campos!");
			return;
		}
		if (final_counter <= initial_counter) {
			alert("O contador final deve ser maior que o contador inicial!");
			return;
		}

		const productionOrder = {
			initial_counter,
			final_counter,
			employee_fk,
			mold_fk,
			created_at,
			description,
			finished_at: currentDateTimeWithTimezone,
		};

		createProductionOrder(productionOrder)
			.then(() => {
				alert("Ordem de produção criada com sucesso!");
				setOpenOrder(false);
			})
			.catch((error) =>
				console.error("Erro ao criar a ordem de produção:", error)
			);

		// Clear the saved order data in localStorage upon order completion
		localStorage.removeItem("productionOrderData");
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
									onChange={(event) => setMoldId(Number(event.target.value))}
									value={mold_fk} // Define o valor selecionado
								>
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
									}
									value={employee_fk} // Define o valor selecionado
								>
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
									value={initial_counter} // Define o valor do contador inicial
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
									value={final_counter} // Define o valor do contador final
								/>
								<label htmlFor="description">Descrição</label>
								<textarea
									name="description"
									id="description"
									onChange={(event) => {
										setDescription(event.target.value);
									}}
									value={description} // Define o valor da descrição
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
