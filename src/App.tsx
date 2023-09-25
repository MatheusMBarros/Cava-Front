import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/LoginPage/AuthContext";
import MoldingRoute from "./routes/MoldingRoute";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import ReportsDashboard from "./pages/Admin/Reports/ReportsDashboard";
import AdminRoute from "./routes/AdminRoutes";
import EmployeeEnrollment from "./pages/Admin/EmployeeEnrollment/EmployeeEnrollment";
import MoldEnrollment from "./pages/Admin/MoldEnrollment/MoldEnrollment";
import MoldPieceEnrollment from "./pages/Admin/MoldPieceEnrollment/MoldPieceEnrollment";
import PieceEnrollment from "./pages/Admin/PieceEnrollment/PieceEnrollment";
import ListDeleteEmployees from "./pages/Admin/EmployeeActions/ListDeleteEmployees/ListDeleteEmployees";
import ListDeleteMolds from "./pages/Admin/MoldActions/ListDeleteMolds/ListDeleteMolds";
import ListDeletePieces from "./pages/Admin/PieceActions/ListDeletePieces/ListDeletePieces";
import ListDeleteMoldPieces from "./pages/Admin/MoldPieceActions/ListDeleteMoldPiece/ListDeleteMoldPiece";
import ListDeleteProductionOrders from "./pages/Admin/ProductionOrderActions/ListDeleteProductionOrder/ListDeleteProductionOrders";
import EditEmployee from "./pages/Admin/EmployeeActions/EditEmployee/EditEmployee";
import EditMold from "./pages/Admin/MoldActions/EditMolds/EditMold";
import EditPiece from "./pages/Admin/PieceActions/EditPiece/EditPiece";
import EditMoldPiece from "./pages/Admin/MoldPieceActions/EditMoldPiece/EditMoldPiece";
import EmployeesPages from "./pages/EmployeesPages/EmployeesPages";
import ProductionOrder from "./pages/Molding/Molding";
import Error403 from "./err/403/Error403";
import EditProductionOrder from "./pages/Admin/ProductionOrderActions/EditProductionOrder/EdtiProductionOrder";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					{/* Non protected Routes */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/error403" element={<Error403 />} />
				</Routes>
				<AdminRoute
					path="/employeeEnrollment"
					element={<EmployeeEnrollment />}
				/>
				<AdminRoute path="/employee/:id" element={<EditEmployee />} />
				<AdminRoute path="/moldEnrollment" element={<MoldEnrollment />} />
				<AdminRoute path="/mold/:id" element={<EditMold />} />
				<AdminRoute path="/pieceEnrollment" element={<PieceEnrollment />} />
				<AdminRoute path="/piece/:id" element={<EditPiece />} />
				<AdminRoute
					path="/moldPieceEnrollment"
					element={<MoldPieceEnrollment />}
				/>
				<AdminRoute path="/moldPiece/:id" element={<EditMoldPiece />} />
				<AdminRoute
					path="/employeesActions"
					element={<ListDeleteEmployees />}
				/>
				<AdminRoute path="/moldActions" element={<ListDeleteMolds />} />
				<AdminRoute path="/pieceActions" element={<ListDeletePieces />} />
				<AdminRoute
					path="/moldPieceActions"
					element={<ListDeleteMoldPieces />}
				/>
				<AdminRoute
					path="/productionOrdersActions"
					element={<ListDeleteProductionOrders />}
				/>
				<AdminRoute path= "/productionOrder/:id" element={<EditProductionOrder />} />
				<AdminRoute path="/report" element={<ReportsDashboard />} />

				<MoldingRoute path="/productionOrder" element={<ProductionOrder />} />
			</Router>
		</AuthProvider>
	);
}

export default App;
