import React from "react";
import AluminiumLoss from "../../../components/TotalAluminumLossPerMold/AluminiumLoss";
import Menu from "../../../components/Menu/Menu";
import MoldQuantityPerProductionOrder from "../../../components/MoldesPerProductionOrder/MoldQuantityPerProductionOrder";
import "./ReportsDashboardStyle.css";
import ProductionByOperator from "../../../components/ProductionPer Operator/ProductionOrderByOperator";

function ReportsDashboard() {
	return (
		<>
			<div className="dashboard">
				<Menu />
				<AluminiumLoss />
				<MoldQuantityPerProductionOrder />
				<ProductionByOperator />
			</div>
		</>
	);
}

export default ReportsDashboard;
