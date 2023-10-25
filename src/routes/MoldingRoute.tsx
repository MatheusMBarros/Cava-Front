import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../pages/LoginPage/AuthContext";

interface AdminRouteProps {
	element: React.ReactNode;
	path: string;
}

function MoldingRoute({ element, path }: AdminRouteProps) {
	const { user } = useAuth();

	if (user && user.sector === "Moldagem") {
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
