import React, { useState } from "react";
import { createMold } from "../../../requests/MoldRequests";
import "./MoldEnrollmentStyle.css";
import Menu from "../../../components/Menu/Menu";

const MoldEnrollment: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [totalWeight, setTotalWeight] = useState<number | null>(null);
	const [channelReturnWeight, setChannelReturnWeight] = useState<number | null>(
		null
	);
	const [channel_lost_percentage, setChannelLostPercentage] = useState<
		number | null
	>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			if (name.trim() == "" || !totalWeight || !channelReturnWeight) {
				return alert("Preencha todos os campos!");
			} else {
				const mold = {
					name: name,
					total_weight: totalWeight,
					channel_return_weight: channelReturnWeight,
					channel_lost_percentage: channel_lost_percentage / 100,
				};
				await createMold(mold);
				alert("Molde criado com sucesso!");
				setChannelReturnWeight(0);
				setTotalWeight(0);
				setName("");
			}
		} catch (error: any) {
			alert("Error submitting form ");
		}
	};

	return (
		<>
			<Menu />

			<h1>Cadastro Molde</h1>
			<br />

			<div className="formBox">
				<div>
					<label>
						Nome do Molde:
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</label>

					<label>
						Peso Total:
						<input
							type="number"
							value={totalWeight}
							onChange={(e) => setTotalWeight(Number(e.target.value))}
							step={0.001}
						/>
					</label>

					<label>
						Peso do Retorno de Canal:
						<input
							type="number"
							value={channelReturnWeight}
							onChange={(e) => setChannelReturnWeight(Number(e.target.value))}
							step={0.001}
						/>
					</label>

					<label>
						Perda de Canal (%):
						<input
							type="number"
							value={channel_lost_percentage}
							onChange={(e) => setChannelLostPercentage(Number(e.target.value))}
						/>
					</label>

					<label>
						Perda de alumínio no canal (Kg):
						<input
							type="number"
							value={(
								(channel_lost_percentage / 100) *
								channelReturnWeight
							).toFixed(3)}
							disabled={true}
						/>
					</label>
					<button onClick={handleSubmit}>Criar Molde</button>
					<br />
				</div>
			</div>
		</>
	);
};

export default MoldEnrollment;
