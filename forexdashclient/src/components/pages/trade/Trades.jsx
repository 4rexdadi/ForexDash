/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Trades() {
	const [isPending, setIsPending] = useState(true);
	const [rowsData, setRowsData] = useState(null);
	const accInfo = useSelector((state) => state.accInfoSlice);
	const accDataHistory = accInfo.accInfoSlice.accDataHistory;

	useEffect(() => {
		if (accDataHistory) {
			const res = accDataHistory.history;
			setRowsData(res);
			setIsPending(false);
		}
	}, [accDataHistory]);

	const ProfitStyle = (row) => {
		return {
			color: row.profit < 0 ? "red" : "green",
			background: row.profit < 0 ? "#ffadad8f" : "rgb(145 254 159 / 47%)",
			padding: "5px",
			borderRadius: "7px",
		};
	};

	const isSideBarOpen = useSelector(
		(state) => state.menuSlice.menuSlice.isSideBarOpen
	);

	return (
		!isSideBarOpen && (
			<div className="dashboardTable">
				{!isPending && (
					<div>
						<div className="dashboardTable__tittle">
							<h3>Account History</h3>
						</div>
						<div>
							<Paper className="dashboardTable__body" sx={{ minWidth: "100%" }}>
								<TableContainer
									component={Paper}
									style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
									sx={{ maxHeight: "83.42vh" }}
								>
									<Table
										sx={{ minWidth: "100%" }}
										stickyHeader
										aria-label="sticky table"
									>
										<TableHead>
											<TableRow>
												<TableCell
													className="dashboardTable__head"
													align="center"
												>
													Symbol
												</TableCell>
												<TableCell
													className="dashboardTable__head"
													align="center"
												>
													Action
												</TableCell>
												<TableCell
													className="dashboardTable__head"
													align="center"
												>
													Sizing(Lots)
												</TableCell>
												<TableCell
													className="dashboardTable__head"
													align="center"
												>
													OpenTime
												</TableCell>
												<TableCell
													className="dashboardTable__head"
													align="center"
												>
													CloseTime
												</TableCell>
												<TableCell
													className="dashboardTable__head"
													align="center"
												>
													Profit
												</TableCell>
											</TableRow>
										</TableHead>
										<TableBody style={{ color: "white" }}>
											{rowsData.map((row, index) => (
												<TableRow
													key={index}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
														background: index % 2 === 0 ? "#fbfafa" : "",
													}}
												>
													<TableCell align="center" component="th" scope="row">
														{row.symbol}
													</TableCell>
													<TableCell align="center">{row.action}</TableCell>
													<TableCell align="center">
														{row.sizing.value}
													</TableCell>
													<TableCell align="center">{row.openTime}</TableCell>
													<TableCell align="center">{row.closeTime}</TableCell>
													<TableCell align="center">
														<span style={ProfitStyle(row)} className="profits">
															{row.profit}
														</span>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Paper>
						</div>
					</div>
				)}
			</div>
		)
	);
}

export default Trades;
