import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import "./LogoutButtonStyle.css";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
	const navigate = useNavigate();
	const logout = () => {
		localStorage.clear();
		alert("Você foi deslogado");
		navigate("/login");
	};
	return (
		<button className="logout-button" onClick={logout}>
			<RiLogoutBoxLine />
			<p>Logout</p>
		</button>
	);
}

export default LogoutButton;
