import React from "react";

import "./EmployeeStyle.css";
import Menu from "../../../components/Menu/Menu";
import ListDeleteEmployees from "../../../components/EmployeesComponents/EmployeeActions/ListDeleteEmployees/ListDeleteEmployees";
import EmployeeEnrollment from "../../../components/EmployeesComponents/EmployeeEnrollment/EmployeeEnrollment";

function Employee() {
	return (
		<>
			<Menu />
			<div className="employeesContainer">
				<EmployeeEnrollment />
				<ListDeleteEmployees />
			</div>
		</>
	);
}

export default Employee;
