import React, { useState, useEffect } from "react";
import { fetchPiece } from "../../../../requests/PieceRequests";
import { deletePiece } from "../../../../requests/PieceRequests";
import Menu from "../../../../components/Menu/Menu";
import { useNavigate } from "react-router-dom";

function ListDeletePieces() {
	const [pieces, setPieces] = useState([]);
	const [sortKey, setSortKey] = useState(null);
	const [sortOrder, setSortOrder] = useState("asc");
	const navigate = useNavigate();

	useEffect(() => {
		populatePices().catch((error) => console.log(error));
	}, []);

	const populatePices = async () => {
		const pieces = await fetchPiece();
		setPieces(pieces);
	};

	const handleDeletePiece = async (pieceId) => {
		try {
			if (window.confirm("Deseja mesmo deletar esse molde?"))
				await deletePiece(pieceId);
			populatePices();
		} catch (error) {
			console.log(error);
			alert(
				"Não é possivel deletar esse mold pois possi peças atribuidas a ele!"
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

	const sortedMolds = [...pieces].sort((a, b) => {
		const aValue = a[sortKey];
		const bValue = b[sortKey];

		if (
			sortKey === "id" ||
			sortKey === "name" ||
			sortKey === "size" ||
			sortKey === "handle_type" ||
			sortKey === "gross_weight" ||
			sortKey === "net_weight"
		) {
			return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
		} else {
			return sortOrder === "asc"
				? (aValue || "").localeCompare(bValue || "")
				: (bValue || "").localeCompare(aValue || "");
		}
	});

	function handleEditPiece(id: number): void {
		navigate(`/piece/${id}`);
		;
	}

	return (
		<>
			<Menu />
			<div className="list-pieces-container">
				<h1>Peças</h1>
				<div className="list-pieces-content">
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
								<th>NOME</th>
								<th>TIPO DE ALÇA</th>
								<th>
									<button
										className="sortButton"
										onClick={() => handleSort("size")}>
										TAMANHO{" "}
										{sortKey === "size" && (
											<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
										)}
									</button>
								</th>
								<th>
									<button
										className="sortButton"
										onClick={() => handleSort("gross_weight")}>
										PESO BRUTO{" "}
										{sortKey === "gross_weight" && (
											<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
										)}
									</button>
								</th>
								<th>
									<button
										className="sortButton"
										onClick={() => handleSort("net_weight")}>
										PESO LÍQUIDO{" "}
										{sortKey === "net_weight" && (
											<span>{sortOrder === "asc" ? "▲" : "▼"}</span>
										)}
									</button>
								</th>

								<th>Ações</th>
							</tr>
						</thead>
						<tbody>
							{sortedMolds.map((piece) => (
								<tr key={piece.id}>
									<td>{piece.id}</td>
									<td>{piece.name}</td>
									<td>{piece.handle_type}</td>
									<td>{piece.size}</td>
									<td>{piece.gross_weight} Kg</td>
									<td>{piece.net_weight} Kg</td>
									<td>
										<button
											className="edit-button"
											onClick={() => handleEditPiece(piece.id)}>
											Editar
										</button>
										<button
											className="delete-button"
											onClick={() => handleDeletePiece(piece.id)}>
											Excluir
										</button>
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

export default ListDeletePieces;
