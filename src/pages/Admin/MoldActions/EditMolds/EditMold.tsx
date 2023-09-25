import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findMold, updateMold } from "../../../../requests/MoldRequests";

function EditMold() {
	const { id } = useParams();
	const [mold, setMold] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		fetchMold();
	}, []);

	const fetchMold = async () => {
		const mold = await findMold(Number(id));
		setMold(mold);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const updatedMold = {
				id: Number(id),
				name: mold.name,
				total_weight: Number(mold.total_weight),
				channel_return_weight: Number(mold.channel_return_weight),
				channel_lost_percentage: Number(mold.channel_lost_percentage),
			};
			await updateMold(updatedMold);
			alert("Mold editado com sucesso!");
			navigate("/moldActions");
		} catch (error) {
			console.log(error);
			alert("Erro ao editar mold!");
		}
	};

	return (
		<>
			<h1>Editar Molde</h1>
			<br />
			<div className="formBox">
				<div>
					<div>
						<label htmlFor="name">Nome:</label>
						<input
							type="text"
							id="name"
							name="name"
							value={mold ? mold.name : ""}
							onChange={(e) => setMold({ ...mold, name: e.target.value })}
						/>
					</div>
					<div>
						<label htmlFor="total_weight">Peso Total:</label>
						<input
							type="number"
							id="total_weight"
							name="total_weight"
							value={mold ? mold.total_weight : ""}
							onChange={(e) =>
								setMold({ ...mold, total_weight: e.target.value })
							}
						/>
					</div>
					<div>
						<label htmlFor="channel_return_weight">
							Retorno de Canal (Kg):
						</label>
						<input
							type="number"
							id="channel_return_weight"
							name="channel_return_weight"
							value={mold ? mold.channel_return_weight : ""}
							onChange={(e) =>
								setMold({ ...mold, channel_return_weight: e.target.value })
							}
						/>
					</div>

					<div>
						<label htmlFor="channel_lost_percentage">Perda de Canal:</label>
						<input
							type="number"
							id="channel_lost_percentage"
							name="channel_lost_percentage"
							value={mold ? mold.channel_lost_percentage : ""}
							onChange={(e) =>
								setMold({
									...mold,
									channel_lost_percentage: Number(e.target.value),
								})
							}
						/>
					</div>

					<div className="buttonBox">
						<button onClick={handleSubmit}>Salvar</button>
					</div>

					<button
						className="backButton"
						onClick={() => navigate("/moldActions")}>
						Voltar
					</button>
				</div>
			</div>
		</>
	);
}

export default EditMold;
