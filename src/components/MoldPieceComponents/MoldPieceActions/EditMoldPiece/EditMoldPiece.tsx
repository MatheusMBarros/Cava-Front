import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	fetchMoldPieceByMoldId,
	updateMoldPieces,
} from "../../../../requests/MoldPieceRequest";
import { ListMoldPieceType } from "../../../../types/MoldPieceType";
import { findMoldName } from "../../../../requests/MoldRequests";
import { fetchPiece } from "../../../../requests/PieceRequests";

function EditMoldPiece() {
	const { id } = useParams();
	const [moldName, setMoldName] = useState<string>("");
	const [moldPieces, setMoldPieces] = useState<ListMoldPieceType[] | null>(
		null
	);
	const [selectedPieces, setSelectedPieces] = useState<number[]>([]); // State to store selected pieces
	const [newPiece, setNewPiece] = useState<any[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		populateMoldPiece().catch((error) => console.log(error));
	}, []);

	const populateMoldPiece = async () => {
		try {
			const moldPieces = await fetchMoldPieceByMoldId(Number(id));
			setMoldPieces(moldPieces);
			const moldName = await findMoldName(Number(id));
			setMoldName(moldName);
			const newPiece = await fetchPiece();
			setNewPiece(newPiece);

			// Initialize selected pieces with the current selections from moldPieces
			const selectedPieces = moldPieces.map((piece) => piece.piece_fk);
			setSelectedPieces(selectedPieces);
		} catch (error) {
			console.log(error);
		}
	};

	function handlePieceChange(index: number, selectedPieceId: number): void {
		// Update the selected piece for the specific mold piece
		const updatedSelectedPieces = [...selectedPieces];
		updatedSelectedPieces[index] = selectedPieceId;
		setSelectedPieces(updatedSelectedPieces);
	}

	function handleCavityChange(index: number, newCavityValue: number): void {
		// Update the cavity value for the specific mold piece
		const updatedMoldPieces = [...moldPieces];
		updatedMoldPieces[index].cavity = newCavityValue;
		setMoldPieces(updatedMoldPieces);
	}

	async function handleSubmit(): Promise<void> {
		try {
			// Prepare the data to update mold pieces
			const updatedMoldPieces = moldPieces.map((piece, index) => ({
				id: piece.id,
				piece_fk: selectedPieces[index],
				cavity: piece.cavity,
			}));

			// Call the updateMoldPiece function to update mold pieces
			await updateMoldPieces(updatedMoldPieces);

			// Redirect back to the mold piece actions page or any other desired route
			navigate("/moldPiece");
		} catch (error) {
			alert("Nao é possivel atribuir suas peças na mesma cavidade!");
		}
	}

	return (
		<div className="formBox">
			{moldPieces && (
				<>
					<label htmlFor="moldName">Molde</label>
					<input
						type="text"
						name="moldName"
						id="moldName"
						value={moldName}
						disabled
					/>
					<br />
					{moldPieces.map((piece, index) => (
						<div key={index}>
							<label htmlFor={`pieceFk${index}`}>Peça {index + 1}</label>
							<select
								name={`pieceFk${index}`}
								id={`pieceFk${index}`}
								value={selectedPieces[index]} // Use selectedPieces state to display the selected piece
								onChange={(event) =>
									handlePieceChange(index, Number(event.target.value))
								}>
								<option>Selecione uma peça</option>
								{newPiece.map((pieceOption) => (
									<option key={pieceOption.id} value={pieceOption.id}>
										{pieceOption.name}
									</option>
								))}
							</select>

							<label htmlFor={`cavity${index}`}>Cavidade</label>
							<input
								type="number"
								name={`cavity${index}`}
								id={`cavity${index}`}
								value={piece.cavity}
								onChange={(event) =>
									handleCavityChange(index, Number(event.target.value))
								}
							/>
							<br />
						</div>
					))}

					<button type="submit" onClick={handleSubmit}>
						Salvar
					</button>
				</>
			)}
			<button className="backButton" onClick={() => navigate("/moldPiece")}>
				Voltar
			</button>
		</div>
	);
}

export default EditMoldPiece;
