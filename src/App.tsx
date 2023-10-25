import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/LoginPage/AuthContext";
import MoldingRoute from "./routes/MoldingRoute";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import ReportsDashboard from "./pages/Admin/Reports/ReportsDashboard";
import AdminRoute from "./routes/AdminRoutes";
import ProductionOrder from "./pages/Molding/Molding";
import EditEmployee from "./components/EmployeesComponents/EmployeeActions/EditEmployee/EditEmployee";
import EditMold from "./components/MoldComponents/MoldActions/EditMolds/EditMold";
import EditMoldPiece from "./components/MoldPieceComponents/MoldPieceActions/EditMoldPiece/EditMoldPiece";
import EditPiece from "./components/PieceComponents/PieceActions/EditPiece/EditPiece";
import EditProductionOrder from "./components/ProductionOrderComponents/ProductionOrderActions/EditProductionOrder/EdtiProductionOrder";
import Employee from "./pages/Admin/EmployeePage/Employee";
import Mold from "./pages/Admin/MoldPages/Mold";
import MoldPiece from "./pages/Admin/MoldPiecePage/MoldPiece";
import Piece from "./pages/Admin/PiecePage/Piece";
import ProductionOrderPage from "./pages/Admin/ProductionOrderPage/ProductionOrderPage";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>

				<AdminRoute path="/employee" element={<Employee />} />
				<AdminRoute path="/employee/:id" element={<EditEmployee />} />

				<AdminRoute path="/mold" element={<Mold />} />
				<AdminRoute path="/mold/:id" element={<EditMold />} />

				<AdminRoute path="/moldPiece" element={<MoldPiece />} />
				<AdminRoute path="/moldPiece/:id" element={<EditMoldPiece />} />

				<AdminRoute path="/piece" element={<Piece />} />
				<AdminRoute path="/piece/:id" element={<EditPiece />} />

				<AdminRoute path="/productionOrder" element={<ProductionOrderPage />} />
				<AdminRoute
					path="/productionOrder/:id"
					element={<EditProductionOrder />}
				/>
				<AdminRoute path="/report" element={<ReportsDashboard />} />

				<MoldingRoute
					path="/createProductionOrder"
					element={<ProductionOrder />}
				/>
			</Router>
		</AuthProvider>
	);
}

export default App;
