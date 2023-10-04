import React, { useEffect, useState } from "react";
import {
	fetchProductionOrderById,
	fetchProductionsOrders,
} from "../../requests/ProductionOrderRequests";
import { ListProductionOrderType } from "../../types/ProductionOrderTypes";
import { FaFilter, FaFileCsv, FaFilePdf } from "react-icons/fa";
import "./MoldQuantityPerProductionOrderStyle.css";
import {
	fetchMoldPiece,
	totalAluminiumLossPerMold,
} from "../../requests/MoldPieceRequest";
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
	const [filteredStartDate, setFilteredStartDate] = useState<Date | null>(null); // <-- Add this line
	const [filteredEndDate, setFilteredEndDate] = useState<Date | null>(null); // <-- Add this line

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

				// Calculate the total aluminum loss for the mold of this production order
				const totalAluminiumLoss = await totalAluminiumLossPerMold(
					productionOrderDetail.mold_fk
				);

				// Add the total aluminum loss to the production order details object
				productionOrderDetail.total_aluminium_loss = totalAluminiumLoss;

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
			console.error("Error fetching Mold-Piece relations:", error);
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

	const calculatePieceNames = (productionOrder) => {
		const moldPieceData = moldPieces[productionOrder.mold_fk];
		if (moldPieceData && moldPieceData.length > 0) {
			return moldPieceData
				.map((moldPiece) => pieceNames[moldPiece.piece_fk])
				.join(", ");
		}
		return "";
	};

	const handleExportCsvClick = () => {
		if (filteredProductionOrders && filteredProductionOrders.length > 0) {
			// Map the data in the format PapaParse expects (array of arrays)
			const csvData = filteredProductionOrders.map((productionOrder) => {
				return [
					formatDate(productionOrder.created_at),
					productionOrder.mold_name,
					productionOrder.quantity.toString(),
					calculatePieceNames(productionOrder), // Add piece names here
					productionOrder.pieces.toString(),
					(
						productionOrder.total_aluminium_loss * productionOrder.quantity
					).toFixed(3),
				];
			});

			// Add a header to the CSV
			csvData.unshift([
				"Data",
				"Molde",
				"Quantidade de moldes",
				"Peças",
				"Total de Peças",
				"Total de alumínio perdido",
			]);

			// Use PapaParse to convert the data into a CSV string
			const csv = Papa.unparse(csvData);

			// Create a Blob with the CSV data
			const csvBlob = new Blob([csv], { type: "text/csv" });

			// Create a formatted date to add to the file name
			const formattedDate = formatDate(new Date());

			// Create the file name with the date
			const filename = `molds_production_order_${formattedDate}.csv`;

			// Create a URL for the Blob
			const csvUrl = URL.createObjectURL(csvBlob);

			// Create an <a> element for downloading the file
			const downloadLink = document.createElement("a");
			downloadLink.href = csvUrl;
			downloadLink.download = filename;
			downloadLink.click();

			// Revoke the URL when no longer needed
			URL.revokeObjectURL(csvUrl);
		} else {
			console.error("filteredProductionOrders is undefined or empty.");
		}
	};

	// ...

	// const handleExportPdfClick = () => {};

	const filteredProductionOrders: any = productionOrders
		?.map((productionOrder) => {
			// Function to calculate the total pieces
			const calculateTotalPieces = () => {
				const moldPieceData = moldPieces[productionOrder.mold_fk];
				if (moldPieceData && moldPieceData.length > 0) {
					// Check if all cavities have the same piece
					const isAllCavitiesSamePiece = moldPieceData.every(
						(piece, index, array) => piece.piece_fk === array[0].piece_fk
					);

					if (isAllCavitiesSamePiece) {
						// All cavities have the same piece, multiply by the number of cavities
						return productionOrder.quantity * moldPieceData.length;
					} else {
						// Cavities have different pieces, calculate how many pieces were produced
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
			</div>

			{filtersVisible && (
				<div>
					<div className="date-filter">
						<label htmlFor="startDate">Data Inicial: </label>
						<input
							type="date"
							id="startDate"
							value={filteredStartDate ? formatDate(filteredStartDate) : ""}
							onChange={handleStartDateChange}
						/>
					</div>

					<div className="date-filter">
						<label htmlFor="endDate">Data Final: </label>
						<input
							type="date"
							id="endDate"
							value={filteredEndDate ? formatDate(filteredEndDate) : ""}
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
						<th className="mold-quantity-header">Total de alumínio perdido</th>
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
							<td>
								{(
									productionOrder.total_aluminium_loss *
									productionOrder.quantity
								).toFixed(3)}
								{" Kg"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default MoldQuantityPerProductionOrder;
