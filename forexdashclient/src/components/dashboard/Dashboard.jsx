import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./card/Card.jsx";
import DashboardTab from "./tab/DashboardTab.jsx";

function Dashboard() {
	const [isExpanded, setIsExpanded] = useState();

	const isSideBarOpen = useSelector(
		(state) => state.menuSlice.menuSlice.isSideBarOpen
	);

	return (
		!isSideBarOpen && (
			<div className="dashboard">
				<div className="dashboard__Chart">
					<div className="card">
						<Card isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
						<DashboardTab
							isExpanded={isExpanded}
							setIsExpanded={setIsExpanded}
						/>
					</div>
				</div>
			</div>
		)
	);
}

export default Dashboard;
