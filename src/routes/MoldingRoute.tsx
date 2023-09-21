import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../pages/LoginPage/AuthContext";
import ProductionOrder from "../pages/Molding/Molding";

interface AdminRouteProps {
	element: React.ReactNode;
	path: string;
}

function MoldingRoute({ element, path }: AdminRouteProps) {
	const { user } = useAuth();

	if (user && user.sector === "molding") {
		return (
			<>
				<Routes>
					<Route path={path} element={element} />
				</Routes>
			</>
		);
	}
}

export default MoldingRoute;
