import React from "react";
import "./BackButtonStyle.css";
import { useNavigate } from "react-router-dom";

function BackButton({ path }) {
	const navigate = useNavigate();
	const handleBackClick = () => {
		navigate(path);
	};

	return (
		<button className="backButton" onClick={handleBackClick}>
			Voltar
		</button>
	);
}

export default BackButton;
