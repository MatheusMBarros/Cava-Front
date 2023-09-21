// LoginPage.tsx
import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { findEmployee } from "../../requests/EmployeeRequests";
import { useNavigate } from "react-router-dom";
import "./LoginStyle.css"; // Importe o arquivo CSS

function LoginPage() {
	const { login } = useAuth();
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		const authenticatedUser = await findEmployee(Number(id));

		if (
			authenticatedUser &&
			authenticatedUser.password === password &&
			authenticatedUser.id === Number(id)
		) {
			login(authenticatedUser);
			if (authenticatedUser.sector === "admin") {
				navigate("/report");
			} else if (authenticatedUser.sector === "molding") {
				navigate("/productionOrder");
			}

			alert("Welcome back, " + authenticatedUser.name + "!");
		} else {
			alert("Invalid credentials. Please try again.");
		}
	};

	return (
		<div className="container">
			<h2 className="title">Faça seu login:</h2>
			<div className="formContainer">
				<div className="inputGroup">
					<label htmlFor="id">Id:</label>
					<input
						type="text"
						id="id"
						value={id}
						onChange={(e) => setId(e.target.value)}
						required
					/>
				</div>
				<div className="inputGroup">
					{" "}
					{/* Adicione a classe CSS 'inputGroup' */}
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button className="loginButton" onClick={handleLogin}>
					Login
				</button>
			</div>
		</div>
	);
}

export default LoginPage;
