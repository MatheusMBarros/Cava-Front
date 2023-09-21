import React from "react";
import "./Error403Style.css";

function Error403() {
	return (
		<div className="error-container">
			<div className="error-message">
				<h1>Você não tem permissao para acessar essa pagina</h1>
			</div>
		</div>
	);
}

export default Error403;
