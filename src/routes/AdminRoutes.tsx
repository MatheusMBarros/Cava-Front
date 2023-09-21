import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../pages/LoginPage/AuthContext";

interface AdminRouteProps {
	element: React.ReactNode;
	path: string;
}

function AdminRoute({ element, path }: AdminRouteProps) {
	const { user } = useAuth();

	if (user && user.sector === "admin") {
		return (
			<>
				<Routes>
					<Route path={path} element={element} />
				</Routes>
			</>
		);
	}
}
export default AdminRoute;
