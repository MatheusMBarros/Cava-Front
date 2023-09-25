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
						<select
							id="handle_type"
							name="handle_type"
							value={piece ? piece.handle_type : ""}
							onChange={(e) =>
								setPiece({ ...piece, handle_type: e.target.value })
							}>
							<option value=" " disabled>
								Selecione...
							</option>
							<option value="SA">Sem Alça</option>
							<option value="AM">Alça de Madeira</option>
							<option value="FF">Alça Ferro Fundido</option>
						</select>
					</div>

					<div>
						<label htmlFor="size">Tamanho:</label>
						<input
							type="number"
							id="size"
							name="size"
							value={piece ? piece.size : ""}
							onChange={(e) =>
								setPiece({ ...piece, size: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label htmlFor="gross_weight">Peso Bruto (Kg):</label>
						<input
							type="number"
							id="gross_weight"
							name="gross_weight"
							value={piece ? piece.gross_weight : ""}
							onChange={(e) =>
								setPiece({ ...piece, gross_weight: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label htmlFor="net_weight">Peso Líquido(Kg):</label>
						<input
							type="number"
							id="net_weight"
							name="net_weight"
							value={piece ? piece.net_weight : ""}
							onChange={(e) =>
								setPiece({ ...piece, net_weight: Number(e.target.value) })
							}
						/>
					</div>

					<div>
						<label htmlFor="splinter_lost_percentage">Perda de Cavaco:</label>
						<input
							type="number"
							id="splinter_lost_percentage"
							name="splinter_lost_percentage"
							value={piece ? piece.splinter_lost_percentage : ""}
							onChange={(e) =>
								setPiece({
									...piece,
									splinter_lost_percentage: Number(e.target.value),
								})
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
