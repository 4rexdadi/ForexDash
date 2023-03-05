import React from "react";
import { useSelector } from "react-redux";

function Products() {
	const isSideBarOpen = useSelector(
		(state) => state.menuSlice.menuSlice.isSideBarOpen
	);
	return (
		!isSideBarOpen && (
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "grid",
					placeItems: "center",
				}}
			>
				<h3>Pls check back later !!!</h3>
			</div>
		)
	);
}

export default Products;
