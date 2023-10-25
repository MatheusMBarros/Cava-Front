import React from "react";
import MoldPieceEnrollment from "../../../components/MoldPieceComponents/MoldPieceEnrollment/MoldPieceEnrollment";
import ListDeleteMoldPieces from "../../../components/MoldPieceComponents/MoldPieceActions/ListDeleteMoldPiece/ListDeleteMoldPiece";
import Menu from "../../../components/Menu/Menu";
import "./MoldPieceStyle.css";

function MoldPiece() {
	return (
		<>
			<Menu />
			<div className="moldPieceContainer">
				<MoldPieceEnrollment />
				<ListDeleteMoldPieces />
			</div>
		</>
	);
}

export default MoldPiece;
