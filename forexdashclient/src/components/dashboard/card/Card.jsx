// import React, { useState } from "react";
import ExpandedCard from "./ExpandedCard.jsx";
import CompactCard from "./CompactCard.jsx";

function Card(props) {
	const isExpanded = props.isExpanded;
	const setIsExpanded = props.setIsExpanded;

	return (
		<div>
			{isExpanded ? (
				<ExpandedCard setIsExpanded={setIsExpanded} props={props} />
			) : (
				<CompactCard setIsExpanded={setIsExpanded} props={props} />
			)}
		</div>
	);
}

export default Card;
