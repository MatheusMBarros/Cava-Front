import React, { useState, useEffect } from "react";
import { fetchMold, deleteMold } from "../../../../requests/MoldRequests";
import "./ListDeleteMoldsStyle.css";
import Menu from "../../../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";

function ListDeleteMolds() {
	const [molds, setMolds] = useState([]);
	const [sortKey, setSortKey] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");
	const navigate = useNavigate();

	useEffect(() => {
		populateMolds().catch((error) => console.log(error));
	}, []);

	const populateMolds = async () => {
		const molds = await fetchMold();
		setMolds(molds);
	};

	const handleDeleteMold = async (moldId) => {
		try {
			if (window.confirm("Deseja mesmo deletar esse molde?"))
				await deleteMold(moldId);
			populateMolds();
		} catch (error) {
			console.log(error);
			alert(
				"Não é possivel deletar esse mold pois possi peças atribuidas a ele!"
			);
		}
	};

	const handleEditMold = async (moldId) => {
		try {
			navigate(`/mold/${moldId}`);
		} catch (error) {
			console.log(error);
			alert(
				"Não é possivel editar esse mold pois possi peças atribuidas a ele!"
			);
		}
	};

	const handleSort = (key) => {
		if (key === sortKey) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortOrder("asc");
		}
	};

	const sortedMolds = [...molds].sort((a, b) => {
		const aValue = a[sortKey];
		const bValue = b[sortKey];

		if (
			sortKey === "id" ||
			sortKey === "total_weight" ||
			sortKey === "channel_return_weight"
		) {
			return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
		} else {
			return sortOrder === "asc"
				? (aValue || "").localeCompare(bValue || "")
				: (bValue || "").localeCompare(aValue || "");
		}
	});

	return (
		<>
			<Menu />

			<div className="list-molds-container">
				<h1>Moldes</h1>
				<div className="list-molds-content">
					<table>
						<thead>
							<tr>
								<th>
									<button
										className="sortButton"
										onClick={() => handleSort("id")}>
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
										NOME{" "}
										{sortKey === "name" && (
											<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
										)}
									</button>
								</th>
								<th>
									<button
										className="sortButton"
										onClick={() => handleSort("total_weight")}>
										PESO TOTAL{" "}
										{sortKey === "total_weight" && (
											<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
										)}
									</button>
								</th>
								<th>
									<button
										className="sortButton"
										onClick={() => handleSort("channel_return_weight")}>
										RETORNO DE CANAL{" "}
										{sortKey === "channel_return_weight" && (
											<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
										)}
									</button>
								</th>
								<th>Perda de alumíno</th>
								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{sortedMolds.map((mold) => (
								<tr key={mold.id}>
									<td>{mold.id}</td>
									<td>{mold.name}</td>
									<td>{mold.total_weight} Kg</td>
									<td>{mold.channel_return_weight} Kg</td>
									<td>{mold.mold_aluminium_loss.toFixed(3)}</td>

									<td>
										<div className="listDeleteMoldActionsCell">
											<button
												className="edit-button"
												onClick={() => handleEditMold(mold.id)}>
												Editar
											</button>
											<button
												className="delete-button"
												onClick={() => handleDeleteMold(mold.id)}>
												Excluir
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default ListDeleteMolds;
