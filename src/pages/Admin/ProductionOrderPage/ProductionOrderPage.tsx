import React from "react";
import ListDeleteProductionOrders from "../../../components/ProductionOrderComponents/ProductionOrderActions/ListDeleteProductionOrder/ListDeleteProductionOrders";
import Menu from "../../../components/Menu/Menu";

function ProductionOrderPage() {
	return (
		<>
			<Menu />

			<div className="productionOrderContainer">
				<ListDeleteProductionOrders />
			</div>
		</>
	);
}

export default ProductionOrderPage;
