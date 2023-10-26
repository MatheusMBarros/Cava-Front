import React, { useEffect, useState } from "react";
import {
	deleteMoldPiece,
	fetchMoldPiece,
} from "../../../../requests/MoldPieceRequest";
import { getPieceName } from "../../../../requests/PieceRequests";
import "./ListDeleteMoldPieceStyle.css";
import { ListMoldPieceType } from "../../../../types/MoldPieceType";
import { findMoldName } from "../../../../requests/MoldRequests";
import { useNavigate } from "react-router-dom";

function ListDeleteMoldPieces() {
	const [moldPieces, setMoldPieces] = useState<{
		[key: number]: ListMoldPieceType[];
	}>({});
	const [moldNames, setMoldNames] = useState<{ [key: number]: string }>({});
	const [pieceNames, setPieceNames] = useState<{ [key: number]: string }>({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, [moldPieces]);

	const fetchData = async () => {
		try {
			const moldPiecesData = await fetchMoldPiece();

			// Group moldPieces by mold_fk
			const moldPiecesByMold: { [key: number]: ListMoldPieceType[] } = {};
			moldPiecesData.forEach((moldPiece) => {
				const moldFk = moldPiece.mold_fk;
				if (!moldPiecesByMold[moldFk]) {
					moldPiecesByMold[moldFk] = [];
				}
				moldPiecesByMold[moldFk].push(moldPiece);
			});

			// Fetch and set mold names
			const uniqueMoldIds = Object.keys(moldPiecesByMold);
			const moldNames = {};
			for (const moldId of uniqueMoldIds) {
				const name = await findMoldName(Number(moldId));
				moldNames[moldId] = name;
			}
			setMoldNames(moldNames);

			// Fetch and set piece names
			const allPieceIds = moldPiecesData.map((moldPiece) => moldPiece.piece_fk);
			const uniquePieceIds = Array.from(new Set(allPieceIds));
			const pieceNames = {};
			for (const pieceId of uniquePieceIds) {
				const name = await getPieceName(pieceId);
				pieceNames[pieceId] = name;
			}
			setPieceNames(pieceNames);

			// Sort moldPieces by cavity
			for (const moldFk in moldPiecesByMold) {
				moldPiecesByMold[moldFk].sort((a, b) => a.cavity - b.cavity);
			}

			// Set the grouped and sorted moldPieces in state
			setMoldPieces(moldPiecesByMold);
		} catch (error) {
			console.error("Erro ao buscar as relações de Moldes e Peças:", error);
		}
	};

	function handleEdit(id: number): void {
		navigate(`/moldPiece/${id}`);
	}

	function handleDelete(id: number): void {
		const confirm = window.confirm(
			"Tem certeza que deseja desvincular esta peça do molde?"
		);
		if (confirm === true) {
			deleteMoldPiece(id);
			fetchData();
			navigate("/moldPiece");
		}
	}

	return (
		<>
			<div className="listar-moldes-pecas-container">
				<table className="mold-piece-table">
					<thead>
						<tr>
							<th>Molde</th>
							<th>Peças</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{Object.keys(moldPieces)
							.sort((a, b) => Number(a) - Number(b)) // Sort moldFk numerically
							.map((moldFk) => (
								<tr key={moldFk}>
									<td>{moldNames[moldFk]}</td>
									<td>
										{moldPieces[moldFk].map((moldPiece) => (
											<p key={moldPiece.id}>
												{pieceNames[moldPiece.piece_fk]} - Cavidade{" "}
												{moldPiece.cavity}
											</p>
										))}
									</td>

									<td className="actionsCell">
										<button
											className="edit-button"
											onClick={() => handleEdit(Number(moldFk))}>
											Editar
										</button>
										{moldPieces[moldFk].map((moldPiece) => (
											<div key={moldPiece.id}>
												<button
													className="delete-button"
													onClick={() => handleDelete(moldPiece.id)}>
													Desvincular {pieceNames[moldPiece.piece_fk]} da
													Cavidade {moldPiece.cavity}
												</button>
											</div>
										))}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default ListDeleteMoldPieces;
