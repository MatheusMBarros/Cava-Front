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
					<button
						className="menu-button"
						onClick={() => navigate("/employeeEnrollment")}>
						<AiOutlineUserAdd />
						<p>Criar funcionário</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/moldEnrollment")}>
						<PiCookingPotDuotone />
						<p>Criar molde</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/pieceEnrollment")}>
						<GiCookingPot />
						<p>Criar peça</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/moldPieceEnrollment")}>
						<MdOutlineWidgets />
						<p>Atribuir molde-peça</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/employeesActions")}>
						<FaUserCog />
						<p>Listar/Editar Funcionario</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/moldActions")}>
						<div className="mold">
							<PiCookingPotDuotone />
						</div>
						<div className="cog">
							<FaCog />
						</div>
						<p>Listar/Editar Molde</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/pieceActions")}>
						<div className="mold">
							<GiCookingPot />
						</div>
						<div className="cog">
							<FaCog />
						</div>
						<p>Listar/Editar Peças</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/moldPieceActions")}>
						<div className="mold">
							<MdOutlineWidgets />
						</div>
						<div className="cog">
							<FaCog />
						</div>
						<p>Listar/Editar Molde/Peça</p>
					</button>

					<button
						className="menu-button"
						onClick={() => navigate("/productionOrdersActions")}>
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
