import React, { useEffect, useState } from "react";
import { totalAluminiumLossPerMold } from "../../requests/MoldPieceRequest";
import { fetchMold } from "../../requests/MoldRequests";
import { ListMoldType } from "../../types/MoldType";
import "./AluminiumLossStyle.css";

function AluminiumLoss() {
	const [molds, setMolds] = useState<ListMoldType[] | null>(null);
	const [aluminiumLosses, setAluminiumLosses] = useState({});

	useEffect(() => {
		populateMolds().catch((error) => console.log(error));
	}, []);

	const populateMolds = async () => {
		const moldsData: ListMoldType[] = await fetchMold();
		setMolds(moldsData);
		const aluminumLossData = {};

		for (const mold of moldsData) {
			const response = await totalAluminiumLossPerMold(mold.id);
			aluminumLossData[mold.id] = response;
		}

		setAluminiumLosses(aluminumLossData);
	};

	return (
		<>
			<h2 className="aluminium-loss-subtitle">Aluminio Perdido por Molde</h2>
			<table className="aluminium-loss-table">
				<thead>
					<tr>
						<th className="aluminium-loss-header">Mold</th>
						<th className="aluminium-loss-header">Aluminium Loss</th>
					</tr>
				</thead>
				<tbody>
					{molds?.map((mold) => (
						<tr key={mold.id}>
							<td className="aluminium-loss-cell">{mold.name}</td>
							<td className="aluminium-loss-cell">
								{aluminiumLosses[mold.id]}Kg
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<br />
			<br />

			<br />
		</>
	);
}

export default AluminiumLoss;
