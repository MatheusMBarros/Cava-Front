import React from "react";
import Menu from "../../../components/Menu/Menu";
import MoldQuantityPerProductionOrder from "../../../components/MoldesPerProductionOrder/MoldQuantityPerProductionOrder";
import "./ReportsDashboardStyle.css";
import ProductionByOperator from "../../../components/ProductionOrderComponents/ProductionPerOperator/ProductionOrderByOperator";
import AluminiumLoss from "../../../components/ProductionOrderComponents/TotalAluminumLossPerMold/AluminiumLoss";

function ReportsDashboard() {
	return (
		<>
			<Menu />

			<div className="dashboard">
				<AluminiumLoss />
				<MoldQuantityPerProductionOrder />
				<ProductionByOperator />
			</div>
		</>
	);
}

export default ReportsDashboard;
