import React from "react";
import Menu from "../../../components/Menu/Menu";
import PieceEnrollment from "../../../components/PieceComponents/PieceEnrollment/PieceEnrollment";
import ListDeletePieces from "../../../components/PieceComponents/PieceActions/ListDeletePieces/ListDeletePieces";

function Piece() {
	return (
		<>
			<Menu />

			<div className="moldContainer">
				<PieceEnrollment />
				<ListDeletePieces />
			</div>
		</>
	);
}

export default Piece;
