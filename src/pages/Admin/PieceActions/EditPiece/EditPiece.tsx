import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findPiece, editPiece } from "../../../../requests/PieceRequests";

function EditPiece() {
	const { id } = useParams();
	const [piece, setPiece] = useState(null);
	const [splinter_lost_percentage, setSplinterLostPercentage] = useState<
		number | null
	>(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchMold();
	}, []);

	const fetchMold = async () => {
		const piece = await findPiece(Number(id));
		setPiece(piece);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const updatePiece = {
				id: Number(id),
				name: piece.name,
				handle_type: piece.handle_type,
				size: piece.size,
				gross_weight: Number(piece.gross_weight),
				net_weight: Number(piece.net_weight),
				splinter_lost_percentage: piece.splinter_lost_percentage,
			};
			await editPiece(updatePiece);
			alert("Peça editada com sucesso!");
			navigate("/pieceActions");
		} catch (error) {
			console.log(error);
			alert("Erro ao editar mold!");
		}
	};

	return (
		<>
			<h1>Editar Peça</h1>
			<br />
			<div className="formBox">
				<div>
					<div>
						<label htmlFor="name">Nome:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={piece ? piece.name : ""}
							onChange={(e) => setPiece({ ...piece, name: e.target.value })}
						/>
					</div>

					<div>
						<label htmlFor="handle_type">Tipo de cabo:</label>
						<input
							type="text"
							id="handle_type"
							name="handle_type"
							value={piece ? piece.handle_type : ""}
							onChange={(e) =>
								setPiece({ ...piece, handle_type: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor="size">Tamanho:</label>
						<input
							type="text"
							id="size"
							name="size"
							value={piece ? piece.size : ""}
							onChange={(e) =>
								setPiece({ ...piece, size: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label htmlFor="gross_weight">Peso Bruto:</label>
						<input
							type="text"
							id="gross_weight"
							name="gross_weight"
							value={piece ? piece.gross_weight : ""}
							onChange={(e) =>
								setPiece({ ...piece, gross_weight: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label htmlFor="net_weight">Peso Líquido:</label>
						<input
							type="text"
							id="net_weight"
							name="net_weight"
							value={piece ? piece.net_weight : ""}
							onChange={(e) =>
								setPiece({ ...piece, net_weight: Number(e.target.value) })
							}
						/>
					</div>

					<div className="buttonBox">
						<button onClick={handleSubmit}>Salvar</button>
					</div>

					<button
						className="backButton"
						onClick={() => navigate("/pieceActions")}>
						Voltar
					</button>
				</div>
			</div>
		</>
	);
}

export default EditPiece;
