import React from "react";
import "./Header.css";

import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	return (
		<div className="main-header">
			<div className="logo">
				<img src="../images/logo.png" alt="Logo" />
			</div>
			<nav>
				<button
					className="header-button"
					onClick={() => {
						navigate("/login");
					}}>
					Administrativo
				</button>
				<button
					className="header-button"
					onClick={() => {
						navigate("/login");
					}}>
					Moldagem
				</button>
				<button
					className="header-button"
					onClick={() => {
						navigate("/login");
					}}>
					Corte/Canal
				</button>
				<button
					className="header-button"
					onClick={() => {
						navigate("/login");
					}}>
					Finanças
				</button>
				<button
					className="header-button"
					onClick={() => {
						navigate("/login");
					}}>
					Embalagem
				</button>
			</nav>
		</div>
	);
};

export default Header;
