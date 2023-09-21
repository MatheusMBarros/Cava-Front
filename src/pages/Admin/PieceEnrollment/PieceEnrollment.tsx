import React, { useState } from "react";
import "./PieceEnrollmentStyle.css";
import { createPiece } from "../../../requests/PieceRequests";
import Menu from "../../../components/Menu/Menu";

const PieceEnrollment: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [size, setSize] = useState<number | null>(null);
	const [handle_type, setHandleType] = useState<string>("");
	const [gross_weight, setGrossWeight] = useState<number | null>(null);
	const [net_weight, setNetWeight] = useState<number | null>(null);
	const [splinter_lost_percentage, setSplinterLostPercentage] = useState<
		number | null
	>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (
				name.trim() === "" ||
				!size ||
				size < 0 ||
				!handle_type ||
				!gross_weight ||
				gross_weight < 0 ||
				!net_weight ||
				net_weight < 0
			) {
				return alert("Preencha todos os campos!");
			} else {
				const piece = {
					name,
					handle_type,
					size,
					gross_weight,
					net_weight,
					splinter_lost_percentage: splinter_lost_percentage / 100,
				};
				await createPiece(piece);
				alert("Peça criada com sucesso!");
				setSize(null);
				setName("");
				setHandleType("");
				setGrossWeight(null);
				setNetWeight(null);
				setSplinterLostPercentage(0);
			}
		} catch (error: any) {
			alert("Error submitting form ");
		}
	};

	return (
		<>
			<Menu />

			<h1>Cadastro Peça</h1>
			<div className="formBox">
				<form onSubmit={handleSubmit}>
					<label>
						Nome da peça:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>
					<label>
						Tipo de alça:
						<select
							value={handle_type === null ? " " : handle_type}
							onChange={(e) => setHandleType(e.target.value)}>
							<option value="">Selecione...</option>
							<option value="SA">Sem alça</option>
							<option value="AM">Alça de Madeira</option>
							<option value="FF">Alça de ferro fundido</option>
						</select>
					</label>

					<label>
						Tamanho:
						<input
							type="number"
							value={size === null ? " " : size}
							onChange={(e) => setSize(Number(e.target.value))}
						/>
					</label>

					<label>
						Peso Bruto:
						<input
							type="number"
							value={gross_weight === null ? " " : gross_weight}
							onChange={(e) => setGrossWeight(Number(e.target.value))}
							step={0.001}
						/>
					</label>

					<label>
						Peso Líquido:
						<input
							type="number"
							value={net_weight === null ? " " : net_weight}
							onChange={(e) => setNetWeight(Number(e.target.value))}
							step={0.001}
						/>
					</label>

					<label>
						Perda de cavaco (%):
						<input
							type="number"
							value={splinter_lost_percentage}
							onChange={(e) =>
								setSplinterLostPercentage(Number(e.target.value))
							}
							step={0.001}
						/>
					</label>

					<label>
						Cavaco
						<input
							type="number"
							value={(
								(splinter_lost_percentage / 100) *
								(gross_weight - net_weight)
							).toFixed(3)}
							step={0.001}
							disabled={true}
						/>
					</label>

					<button type="submit">Criar Peça</button>

					<br />
				</form>
			</div>
		</>
	);
};

export default PieceEnrollment;
