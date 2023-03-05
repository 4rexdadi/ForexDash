/* eslint-disable no-unused-vars */
import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UilMultiply } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";
import ExpandedExtra from "./ExpandedExtra";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ExpandedCard = ({ setIsExpanded }) => {
	const [chartData, setChartData] = useState(null);
	const [optionsData, setOptionsData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [showExtra, setShowExtra] = useState(false);
	const [watchListAcc, setWatchListAcc] = useState(null);

	const accInfo = useSelector((state) => state.accInfoSlice);
	const accDataDaily = accInfo.accInfoSlice.accDataDaily;
	const accDataInfo = accInfo.accInfoSlice.accDataInfo;
	const accNumber = accInfo.accInfoSlice.accNumber;

	useEffect(() => {
		let watchList = accDataInfo.accounts;

		let removeAcc = [watchList[accNumber]];

		watchList = watchList.filter((element) => !removeAcc.includes(element));

		if (watchList.length > 0) {
			setWatchListAcc(watchList);
		}
	}, [accDataInfo, accNumber]);

	useEffect(() => {
		if (accDataDaily) {
			let width = window.innerWidth < 1011;
			setShowExtra(width);

			let newData = { balance: [], date: [], lotSize: [] };
			const res = accDataDaily.dataDaily;

			for (let i = 0; i < res.length; i++) {
				let balance = res[i][0].balance;
				let date = res[i][0].date;
				let lotSize = res[i][0].lots;
				newData.balance.push(balance);
				newData.date.push(date);
				newData.lotSize.push(lotSize);
			}

			// Analytics Cards Data
			const chartInfo = {
				series: [
					{
						type: "area",
						name: "Balance($)",
						data: [...newData.balance],
					},

					{
						type: "column",
						name: "lots Size",
						data: [...newData.lotSize],
					},
				],
			};

			const optionsInfo = {
				options: {
					chart: {
						type: "area",
						height: "auto",
					},

					fill: {
						colors: ["#fff"],
						type: "gradient",
						opacity: [0.01, 0.25, 1],
						gradient: {
							inverseColors: true,
							shade: "light",
							type: "vertical",
							opacityFrom: 0.85,
							opacityTo: 0.55,
							stops: [0, 100, 100, 100],
						},
					},
					dataLabels: {
						enabled: window.innerWidth < 800 ? false : true,
					},
					stroke: {
						curve: "smooth",
						colors: ["#f799a354"],
					},
					labels: [...newData.date],
					markers: {
						size: 4,
					},
					tooltip: {
						x: {
							format: "dd/MM/yy",
						},
					},
					grid: {
						show: true,
					},
					xaxis: {
						type: "date",
					},
					yaxis: {
						min: 0,
					},
				},
			};

			setChartData(chartInfo);
			setOptionsData(optionsInfo);
			setIsPending(false);
			// setTimeout(() => {

			// }, 500);
		}
	}, [accDataDaily]);

	const colorStyle = (value) => {
		return { color: value < 0 ? "red" : "green" };
	};

	return (
		!isPending && (
			<motion.div
				className="expandableCard card__child "
				layout
				layoutId="expandableCard"
			>
				<UilMultiply
					className="CloseIcon"
					onClick={() => setIsExpanded(false)}
				/>

				<Chart
					className="ApexCharts"
					options={optionsData.options}
					series={chartData.series}
				/>

				{showExtra && <ExpandedExtra />}
				{watchListAcc && (
					<div className="watchList">
						<p>WatchList Accounts</p>

						<Paper className="watchList__table" sx={{ width: "100%" }}>
							<TableContainer
								component={Paper}
								style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
								sx={{ height: "100%" }}
							>
								<Table stickyHeader aria-label="sticky table">
									<TableHead>
										<TableRow>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												Name
											</TableCell>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												Balance
											</TableCell>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												Profit
											</TableCell>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												Daily
											</TableCell>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												Monthly
											</TableCell>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												Gain
											</TableCell>
											<TableCell
												className="watchList__table__head"
												align="center"
											>
												last Update
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody style={{ color: "white" }}>
										{watchListAcc.map((ListAcc, index) => (
											<TableRow
												key={index}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
													background: index % 2 === 0 ? "#fbfafa" : "",
												}}
											>
												<TableCell align="center">
													<u>{ListAcc.name}</u>
												</TableCell>
												<TableCell align="center">${ListAcc.balance}</TableCell>
												<TableCell
													align="center"
													style={colorStyle(ListAcc.profit)}
												>
													${ListAcc.profit.toFixed(2)}
												</TableCell>
												<TableCell
													align="center"
													style={colorStyle(ListAcc.daily)}
												>
													{ListAcc.daily.toFixed(2)}%
												</TableCell>
												<TableCell
													align="center"
													style={colorStyle(ListAcc.monthly)}
												>
													{ListAcc.monthly.toFixed(2)}%
												</TableCell>
												<TableCell
													align="center"
													style={colorStyle(ListAcc.gain)}
												>
													{ListAcc.gain.toFixed(2)}%
												</TableCell>
												<TableCell align="center">
													{ListAcc.lastUpdateDate}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Paper>
					</div>
				)}
			</motion.div>
		)
	);
};

export default ExpandedCard;
