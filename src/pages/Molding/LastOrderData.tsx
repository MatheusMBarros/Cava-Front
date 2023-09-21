import React, { useEffect, useState } from "react";
import "./MoldingStyle.css";
import { LastProductionOrderType } from "../../types/ProductionOrderTypes";
import { fetchLastOrder } from "../../requests/ProductionOrderRequests";

const LastOrderData: React.FC = () => {
	const [lastOrderData, setLastOrderData] =
		useState<LastProductionOrderType | null>(null);
	useEffect(() => {
		fetchLastOrderData().catch((error) => console.log(error));
	}, [lastOrderData]);

	const fetchLastOrderData = async () => {
		const lastOrderData = await fetchLastOrder();
		setLastOrderData(lastOrderData);
	};
	const formatDateTime = (date) => {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hours = (date.getHours() + 3).toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${day}/${month}/${year} - ${hours}:${minutes}`;
	};

	return (
		<>
			<h3>Dados da última ordem de produção</h3>
			<div className="lastOrderBox">
				<div>
					<br />
					<label htmlFor="initialCounter">Contador Inicial</label>
					<input
						type="number"
						name="initialCounter"
						id="initialCounter"
						value={lastOrderData?.initial_counter || "0"}
						disabled
					/>
					<br />
					<label htmlFor="finalCounter">Contador Final</label>
					<input
						type="number"
						name="finalCounter"
						id="finalCounter"
						value={lastOrderData?.final_counter || ""}
						disabled
					/>
					<br />
					<label htmlFor="employeeFk">Funcionário</label>
					<input
						type="text"
						name="employeeFk"
						id="employeeFk"
						value={lastOrderData?.employee_name || ""}
						disabled
					/>
					<br />
					<label htmlFor="moldFk">Molde</label>
					<input
						type="text"
						name="moldFk"
						id="moldFk"
						value={lastOrderData?.mold_name || ""}
						disabled
					/>
					<label htmlFor="createdAt">Data de Criação</label>
					<input
						type="text"
						name="createdAt"
						id="createdAt"
						value={
							lastOrderData?.created_at
								? formatDateTime(new Date(lastOrderData?.created_at))
								: ""
						}
						disabled
						readOnly
					/>
					<br />
					<label htmlFor="quantity">Quantidade de moldes</label>
					<input
						type="text"
						name="quantity"
						id="quantity"
						value={
							lastOrderData?.final_counter - lastOrderData?.initial_counter ||
							""
						}
						disabled
					/>

					<br />
					<label htmlFor="description">Descrição</label>
					<textarea
						name="description"
						id="description"
						value={lastOrderData?.description || ""}
						disabled
					/>
				</div>
			</div>
		</>
	);
};

export default LastOrderData;
