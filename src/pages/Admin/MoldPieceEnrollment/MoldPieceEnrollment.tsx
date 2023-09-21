import React, { useEffect, useState } from "react";
import { createMoldPiece } from "../../../requests/MoldPieceRequest";
import BackButton from "../../../components/BackButton/BackButton";
import { fetchMold } from "../../../requests/MoldRequests";
import { fetchPiece } from "../../../requests/PieceRequests";
import Menu from "../../../components/Menu/Menu";

const MoldPieceEnrollment: React.FC = () => {
	const [moldFk, setMoldFk] = useState<number>(0);
	const [pieceFk, setPieceFk] = useState<number>(0);
	const [cavity, setCavity] = useState<number>(0);
	const [molds, setMolds] = useState([]);
	const [pieces, setPieces] = useState([]);

	useEffect(() => {
		populateSelectors().catch((error) => console.log(error));
	}, []);
	const populateSelectors = async () => {
		const molds = await fetchMold();
		setMolds(molds);
		const pieces = await fetchPiece();
		setPieces(pieces);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		try {
			event.preventDefault();
			const moldPiece = {
				mold_fk: moldFk,
				piece_fk: pieceFk,
				cavity: cavity,
			};
			await createMoldPiece(moldPiece);
			alert(`Peça atribuida ao molde com sucesso!`);
		} catch (error) {
			console.log(error);
			alert(`A cavidade ${cavity} já está ocupada!`);
		}
	};

	return (
		<>
			<Menu />

			<h1>Cadastro Peça ao Molde</h1>
			<div className="formBox">
				<form>
					<br />
					<label htmlFor="moldFk">Molde</label>
					<select
						name="moldFk"
						id="moldFk"
						onChange={(event) => setMoldFk(Number(event.target.value))}>
						<option>Selecione um molde</option>
						{molds.map((mold) => (
							<option key={mold.id} value={mold.id}>
								{mold.name}
							</option>
						))}
					</select>
					<br />
					<label htmlFor="pieceFk">Peça</label>
					<select
						name="pieceFk"
						id="pieceFk"
						onChange={(event) => setPieceFk(Number(event.target.value))}>
						<option>Selecione uma peça</option>
						{pieces.map((piece) => (
							<option key={piece.id} value={piece.id}>
								{piece.name}
							</option>
						))}
					</select>
					<br />

					<label htmlFor="cavity">
						<input
							type="number"
							id="cavity"
							placeholder="Cavidade"
							onChange={(e) => setCavity(Number(e.target.value))}
						/>
					</label>

					<button type="submit" onClick={handleSubmit}>
						Atribuir peça ao molde
					</button>
					<br />
				</form>
			</div>
		</>
	);
};

export default MoldPieceEnrollment;
