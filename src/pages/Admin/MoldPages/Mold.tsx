import React from "react";
import ListDeleteMolds from "../../../components/MoldComponents/MoldActions/ListDeleteMolds/ListDeleteMolds";
import MoldEnrollment from "../../../components/MoldComponents/MoldEnrollment/MoldEnrollment";
import Menu from "../../../components/Menu/Menu";
import "./MoldStyle.css";

function Mold() {
	return (
		<>
			<Menu />
			<div className="moldContainer">
				<MoldEnrollment />
				<ListDeleteMolds />
			</div>
		</>
	);
}

export default Mold;
