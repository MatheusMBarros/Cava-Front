import React, { useEffect, useState } from "react";
import {
	fetchProductionOrderById,
	fetchProductionsOrders,
} from "../../requests/ProductionOrderRequests";
import { ListProductionOrderType } from "../../types/ProductionOrderTypes";
import { FaFilter, FaFileCsv, FaFilePdf } from "react-icons/fa";
import "./MoldQuantityPerProductionOrderStyle.css";
import { fetchMoldPiece } from "../../requests/MoldPieceRequest";
import { findMoldName } from "../../requests/MoldRequests";
import { getPieceName } from "../../requests/PieceRequests";
import { ListMoldPieceType } from "../../types/MoldPieceType";
import Papa from "papaparse";

function MoldQuantityPerProductionOrder() {
	const [productionOrders, setProductionOrders] = useState<
		ListProductionOrderType[] | null
	>(null);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [selectedMold, setSelectedMold] = useState<string | null>(null);
	const [availableMolds, setAvailableMolds] = useState<string[]>([]);
	const [filtersVisible, setFiltersVisible] = useState(false);
	const [moldPieces, setMoldPieces] = useState<{
		[key: number]: ListMoldPieceType[];
	}>({});
	const [moldNames, setMoldNames] = useState<{ [key: number]: string }>({});
	const [pieceNames, setPieceNames] = useState<{ [key: number]: string }>({});

	useEffect(() => {
		populateProductionOrders().catch((error) => console.log(error));
		fetchData().catch((error) => console.log(error));
	}, []);

	function formatDate(date: Date | null) {
		if (!date) return "";
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	const populateProductionOrders = async () => {
		const productionOrdersIds = await fetchProductionsOrders();
		const productionOrdersDetails = await Promise.all(
			productionOrdersIds.map(async (productionOrderId) => {
				const productionOrderDetail = await fetchProductionOrderById(
					productionOrderId.id
				);
				return productionOrderDetail;
			})
		);
		setProductionOrders(productionOrdersDetails);

		const molds = productionOrdersDetails.map(
			(productionOrder) => productionOrder.mold_name
		);
		const uniqueMolds = [...new Set(molds)];
		setAvailableMolds(uniqueMolds);
	};

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

	const handleStartDateChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const date = event.target.value;
		setStartDate(date ? new Date(date) : null);
	};

	const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const date = event.target.value;
		setEndDate(date ? new Date(date) : null);
	};

	const handleMoldChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedMold(event.target.value);
	};

	const handleFilterButtonClick = () => {
		setFiltersVisible(!filtersVisible);
	};

	const handleExportCsvClick = () => {
		if (filteredProductionOrders && filteredProductionOrders.length > 0) {
			// Mapeie os dados no formato que o PapaParse espera (array de arrays)
			const csvData = filteredProductionOrders.map((productionOrder) => {
				return [
					formatDate(productionOrder.created_at),
					productionOrder.mold_name,
					productionOrder.quantity.toString(),
					productionOrder.pieces.toString(),
				];
			});

			// Adicione um cabeçalho ao CSV
			csvData.unshift([
				"Data",
				"Molde",
				"Quantidade de moldes",
				"Peças",
				"Total de Peças",
			]);

			// Use o PapaParse para converter os dados em uma string CSV
			const csv = Papa.unparse(csvData);

			// Crie um Blob com os dados CSV
			const csvBlob = new Blob([csv], { type: "text/csv" });

			// Crie uma data formatada para adicionar ao nome do arquivo
			const formattedDate = formatDate(new Date());

			// Crie o nome do arquivo com a data
			const filename = `molds_production_order_${formattedDate}.csv`;

			// Crie uma URL para o Blob
			const csvUrl = URL.createObjectURL(csvBlob);

			// Crie um elemento <a> para o download do arquivo
			const downloadLink = document.createElement("a");
			downloadLink.href = csvUrl;
			downloadLink.download = filename;
			downloadLink.click();

			// Revogue a URL quando não for mais necessária
			URL.revokeObjectURL(csvUrl);
		} else {
			console.error("filteredProductionOrders está indefinido ou vazio.");
		}
	};

	const handleExportPdfClick = () => {};

	const filteredProductionOrders = productionOrders
		?.map((productionOrder) => {
			// Função para calcular o total de peças
			const calculateTotalPieces = () => {
				const moldPieceData = moldPieces[productionOrder.mold_fk];
				if (moldPieceData && moldPieceData.length > 0) {
					// Verificar se todas as cavidades têm a mesma peça
					const isAllCavitiesSamePiece = moldPieceData.every(
						(piece, index, array) => piece.piece_fk === array[0].piece_fk
					);

					if (isAllCavitiesSamePiece) {
						// Todas as cavidades têm a mesma peça, multiplicar pela quantidade de cavidades
						return productionOrder.quantity * moldPieceData.length;
					} else {
						// As cavidades têm peças diferentes, calcular quantas peças foram produzidas
						return moldPieceData.reduce(
							(total, piece) => total + productionOrder.quantity,
							0
						);
					}
				}
				return 0;
			};

			return {
				...productionOrder,
				pieces: calculateTotalPieces(),
			};
		})
		.filter((productionOrder) => {
			if (
				(startDate && productionOrder.created_at < startDate) ||
				(endDate && productionOrder.created_at > endDate)
			) {
				return false;
			}
			if (selectedMold && productionOrder.mold_name !== selectedMold) {
				return false;
			}
			return true;
		});

	return (
		<div className="mold-quantity-container">
			<h2 className="mold-quantity-title">
				Quantidade de Moldes e Peças por Ordem de Produção
			</h2>

			<div className="buttonsClass">
				<button className="filter" onClick={handleFilterButtonClick}>
					<FaFilter />
				</button>

				<button className="export-csv" onClick={handleExportCsvClick}>
					<FaFileCsv /> Exportar para CSV
				</button>

				<button className="export-pdf" onClick={handleExportPdfClick}>
					<FaFilePdf /> Exportar para PDF
				</button>
			</div>

			{filtersVisible && (
				<div>
					<div className="date-filter">
						<label htmlFor="startDate">Data Inicial: </label>
						<input
							type="date"
							id="startDate"
							value={startDate ? formatDate(startDate) : ""}
							onChange={handleStartDateChange}
						/>
					</div>

					<div className="date-filter">
						<label htmlFor="endDate">Data Final: </label>
						<input
							type="date"
							id="endDate"
							value={endDate ? formatDate(endDate) : ""}
							onChange={handleEndDateChange}
						/>
					</div>

					<div className="mold-filter">
						<label htmlFor="moldFilter">Filtrar por Molde: </label>
						<select
							id="moldFilter"
							value={selectedMold || ""}
							onChange={handleMoldChange}>
							<option value="">Todos</option>
							{availableMolds.map((mold, index) => (
								<option key={index} value={mold}>
									{mold}
								</option>
							))}
						</select>
					</div>
				</div>
			)}

			<table className="mold-quantity-table">
				<thead>
					<tr>
						<th className="mold-quantity-header">Id</th>
						<th className="mold-quantity-header">Data</th>
						<th className="mold-quantity-header">Molde</th>
						<th className="mold-quantity-header">Quantidade de Moldes</th>
						<th className="mold-quantity-header">Peças</th>
						<th className="mold-quantity-header">Total de Peças</th>
					</tr>
				</thead>
				<tbody>
					{filteredProductionOrders?.map((productionOrder, index) => (
						<tr key={index}>
							<td className="mold-quantity-id">{productionOrder.id}</td>
							<td className="mold-quantity-date">
								{formatDate(productionOrder.created_at)}
							</td>
							<td className="mold-quantity-quantity">
								{productionOrder.mold_name}
							</td>

							<td>{productionOrder.quantity}</td>
							<td>
								{moldPieces[productionOrder.mold_fk]?.map(
									(moldPiece, pieceIndex) => (
										<div key={pieceIndex}>
											{pieceNames[moldPiece.piece_fk]} -{" "}
											{productionOrder.quantity}{" "}
										</div>
									)
								)}
							</td>
							<td>{productionOrder.pieces}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MoldQuantityPerProductionOrder;
