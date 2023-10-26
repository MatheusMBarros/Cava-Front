import React from "react";
import "./MenuStyle.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { PiCookingPotDuotone } from "react-icons/pi";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineWidgets } from "react-icons/md";
import { FaCog, FaUserCog } from "react-icons/fa";
import { TbDatabaseCog, TbReportSearch } from "react-icons/tb";
import { AiOutlineAreaChart } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import LogoutButton from "../LoggoutButton/LogoutButton";
import { useNavigate } from "react-router-dom";

const Menu = () => {
	const navigate = useNavigate();
	return (
		<div className="top-menu">
			<nav>
				<div className="buttons">
					<button className="menu-button" onClick={() => navigate("/employee")}>
						<AiOutlineUserAdd />
						<p>Funcionário</p>
					</button>

					<button className="menu-button" onClick={() => navigate("/mold")}>
						<PiCookingPotDuotone />
						<p>Criar molde</p>
					</button>

					<button className="menu-button" onClick={() => navigate("/piece")}>
						<GiCookingPot />
						<p>Criar peça</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/moldPiece")}>
						<MdOutlineWidgets />
						<p>Atribuir molde-peça</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/productionOrder")}>
						<TbDatabaseCog />
						<p>Listar/editar Ordens de produção</p>
					</button>

					<button className="menu-button" onClick={() => navigate("/report")}>
						<TbReportSearch />
						<p>Emitir Rematórios</p>
					</button>

					<LogoutButton />
				</div>
			</nav>
		</div>
	);
};

export default Menu;
