import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function HistoryTab() {
	const [isPending, setIsPending] = useState(true);
	const [resData, setResData] = useState(null);
	const [chartData, setChartData] = useState(null);
	const [optionsData, setOptionsData] = useState(null);

	const accInfo = useSelector((state) => state.accInfoSlice);
	const accDataDaily = accInfo.accInfoSlice.accDataDaily;
	const accDataInfo = accInfo.accInfoSlice.accDataInfo;
	const accNumber = accInfo.accInfoSlice.accNumber;

	useEffect(() => {
		if (accDataDaily) {
			let newData = {
				balance: [],
				date: [],
				lotSize: [],
				winners: [],
				losers: [],
				pips: [],
				bestPips: [],
				worstPips: [],
				profit: [],
				growthEquity: [],
				days: [],
			};
			const res = accDataDaily.dataDaily;

			for (let i = 0; i < res.length; i++) {
				let balance = res[i][0].balance;
				let date = res[i][0].date;
				let lotSize = res[i][0].lots;
				let pips = res[i][0].pips;
				if (pips > 0) {
					newData.bestPips.push(pips);
				} else {
					newData.worstPips.push(pips);
				}
				let profit = res[i][0].profit;
				if (profit > 0) {
					newData.winners.push(profit);
				} else {
					newData.losers.push(profit);
				}
				let growthEquity = res[i][0].growthEquity;
				if (lotSize !== 0 || pips !== 0 || profit !== 0) {
					newData.days.push("days");
				}
				newData.balance.push(balance);
				newData.date.push(date);
				newData.lotSize.push(lotSize);
				newData.pips.push(pips);
				newData.profit.push(profit);
				newData.growthEquity.push(growthEquity);
			}

			const totalDays = newData.days.length;
			let totalPips = [...newData.pips].reduce((a, b) => a + b, 0).toFixed(1);
			let aveWinTrades = (
				[...newData.winners].reduce((a, b) => a + b, 0) / newData.winners.length
			).toFixed(2);
			let aveLossTrades = (
				[...newData.losers].reduce((a, b) => a + b, 0) / newData.losers.length
			).toFixed(2);
			let totalLots = [...newData.lotSize]
				.reduce((a, b) => a + b, 0)
				.toFixed(2);

			let totalDaysWon = newData.winners.length;
			let aveDaysWon = ((totalDaysWon / totalDays) * 100).toFixed(1);
			let bestDay = Math.max(...newData.winners);
			let worstDay = Math.min(...newData.losers);
			let bestPips = Math.max(...newData.bestPips);
			let worstPips = Math.min(...newData.worstPips);
			let oddsOfWinning = newData.winners.length / totalDays;
			let oddsOfLosing = newData.losers.length / totalDays;
			let expectancyPerTrade = (
				aveWinTrades * oddsOfWinning +
				aveLossTrades * oddsOfLosing
			).toFixed(2);

			let Profitability = oddsOfWinning * 100;
			let notProfitable = 100 - Profitability;

			//turn all negative number positive and add the dollar($) in front
			if (expectancyPerTrade < 0) {
				expectancyPerTrade *= -1;
				expectancyPerTrade = "-$" + expectancyPerTrade;
			} else {
				expectancyPerTrade = "$" + expectancyPerTrade;
			}
			if (worstDay < 0) {
				worstDay *= -1;
				worstDay = "-$" + worstDay;
			} else {
				worstDay = "$" + worstDay;
			}
			if (aveLossTrades < 0) {
				aveLossTrades *= -1;
				aveLossTrades = "-$" + aveLossTrades;
			} else {
				aveLossTrades = "$" + aveLossTrades;
			}

			// Tabs Data
			const tabData = {
				leftTab: [
					{ header: "Days:", value: totalDays },
					{ header: "Pips:", value: totalPips },
					{ header: "Average Daily Profits:", value: "$" + aveWinTrades },
					{
						header: "Average Daily loss:",
						value: aveLossTrades,
					},
					{ header: "Lots:", value: totalLots },
				],
				rightTab: [
					{
						header: "Days Won:",
						value: `(${totalDaysWon}/${totalDays})${aveDaysWon}%`,
					},
					{
						header: "Best Day:",
						value: "$" + bestDay,
					},
					{
						header: "Worst Day:",
						value: worstDay,
					},
					{
						header: "Best / Worst Day (Pips):",
						value: `${bestPips} / ${worstPips}`,
					},
					{
						header: "Expectancy:",
						value: `${expectancyPerTrade}`,
					},
				],
			};

			const series = [Profitability, notProfitable];
			const options = {
				chart: {
					type: "pie",
				},
				colors: ["#00ff00", "#E91E63"],
				labels: ["Winners", "Losers"],
			};

			setOptionsData(options);
			setChartData(series);

			setResData(tabData);
			setIsPending(false);
		}
	}, [accDataDaily]);

	return (
		!isPending && (
			<motion.div className="history">
				<div className="history__table">
					<Paper
						className="history__table1"
						sx={{ width: "100%", overflow: "hidden" }}
					>
						<TableContainer
							component={Paper}
							style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
						>
							<Table>
								<TableBody>
									{resData.leftTab.map((leftTab, index) => {
										return (
											<TableRow
												key={index}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
													background: index % 2 === 0 ? "#fbfafa" : "",
												}}
											>
												<TableCell
													className="history__table1__header"
													align="left"
													component="th"
													scope="row"
												>
													{leftTab.header}
												</TableCell>
												<TableCell align="center">
													{leftTab.header === "Profitability(%):" ? (
														<div style={{}}>
															<div style={{}}>{leftTab.value}</div>
															<div style={{}}>{100 - leftTab.value}</div>
														</div>
													) : (
														leftTab.value
													)}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
					<Paper
						className="history__table2"
						sx={{ width: "100%", overflow: "hidden" }}
					>
						<TableContainer
							component={Paper}
							style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
						>
							<Table>
								<TableBody>
									{resData.rightTab.map((rightTab, index) => {
										return (
											<TableRow
												key={index}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
													background: index % 2 === 0 ? "#fbfafa" : "",
												}}
											>
												<TableCell
													className="history__table2__header"
													align="left"
													component="th"
													scope="row"
												>
													{rightTab.header}
												</TableCell>
												<TableCell align="center">{rightTab.value}</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</div>
				<div className="history__progressbar">
					<div>
						<p>Monthly: {accDataInfo.accounts[accNumber].monthly}%</p>
					</div>

					<Chart
						className="pieChart"
						options={optionsData}
						series={chartData}
						type="pie"
						width="100%"
						height="100%"
					/>
				</div>
			</motion.div>
		)
	);
}

export default HistoryTab;
