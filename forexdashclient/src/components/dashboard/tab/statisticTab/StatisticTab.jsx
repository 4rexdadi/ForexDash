import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function StatisticTab() {
	const [isPending, setIsPending] = useState(true);
	const [resData, setResData] = useState(null);

	const accInfo = useSelector((state) => state.accInfoSlice);
	const accDataHistory = accInfo.accInfoSlice.accDataHistory;

	useEffect(() => {
		if (accDataHistory) {
			const res = accDataHistory.history;

			let newData = {
				win: [0],
				loss: [0],
				longs: [0],
				shorts: [0],
				wonLongs: [0],
				wonShorts: [0],
				pips: [0],
				bestPips: [0],
				worstPips: [0],
				lots: [0],
				commissions: [0],
				time: [0],
			};

			if (res.length >= 2) {
				newData.win.length = 0;
				newData.loss.length = 0;
				newData.longs.length = 0;
				newData.shorts.length = 0;
				newData.wonLongs.length = 0;
				newData.wonShorts.length = 0;
				newData.pips.length = 0;
				newData.bestPips.length = 0;
				newData.worstPips.length = 0;
				newData.lots.length = 0;
				newData.commissions.length = 0;
				newData.time.length = 0;
			}

			for (let i = 0; i < res.length; i++) {
				let action = res[i].action;
				if (action !== "Deposit" && action !== "Withdrawal") {
					let win = res[i].profit;
					if (win > 0) {
						newData.win.push(win);
					}
					let loss = res[i].profit;
					if (loss < 0) {
						newData.loss.push(loss);
					}
					let longs = res[i].action;
					if (longs === "Buy") {
						newData.longs.push(longs);
					}
					let shorts = res[i].action;
					if (shorts === "Sell") {
						newData.shorts.push(shorts);
					}
					if (longs === "Buy" && win > 0) {
						newData.wonLongs.push("wonLongs");
					}
					if (shorts === "Sell" && win > 0) {
						newData.wonShorts.push("wonShorts");
					}
					let pips = res[i].pips;
					newData.pips.push(pips);
					if (pips > 0) {
						newData.bestPips.push(pips);
					}
					if (pips < 0) {
						newData.worstPips.push(pips);
					}
					let lots = Number(res[i].sizing.value);
					if (res[i].sizing.type === "lots") {
						newData.lots.push(lots);
					}
					let commissions = res[i].commission;
					newData.commissions.push(commissions);

					let openTime = res[i].openTime;
					let closeTime = res[i].closeTime;
					var date1 = new Date(openTime);
					var date2 = new Date(closeTime);
					var Difference_In_Time = date2.getTime() - date1.getTime();
					var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
					newData.time.push(Difference_In_Days);
				}
			}

			// basic calculation
			let longWon = newData.wonLongs.length.toString();
			let shortWon = newData.wonShorts.length.toString();
			let totalLong = newData.longs.length;
			let totalShort = newData.shorts.length;
			let aveLongWin = ((longWon / totalLong) * 100).toFixed(1).toString();
			let aveShortWin = ((shortWon / totalShort) * 100).toFixed(1).toString();
			let bestTrade = Math.max(...newData.win);
			if (bestTrade === -Infinity || bestTrade === Infinity) bestTrade = 0;
			let worstTrade = Math.min(...newData.loss);
			if (worstTrade === -Infinity || worstTrade === Infinity) worstTrade = 0;
			if (worstTrade < 0) worstTrade *= -1;
			let bestPips = Math.max(...newData.bestPips);
			if (bestPips === -Infinity) bestPips = 0;
			let worstPips = Math.min(...newData.worstPips);
			if (worstPips === -Infinity || worstPips === Infinity) worstPips = 0;
			let totalTrades = totalLong + totalShort;
			let totalPips = [...newData.pips].reduce((a, b) => a + b, 0).toFixed(2);
			let totalLots = [...newData.lots].reduce((a, b) => a + b, 0).toFixed(2);
			let commission = [...newData.commissions]
				.reduce((a, b) => a + b, 0)
				.toFixed(2);
			if (commission < 0) (commission *= -1).toString();

			let aveWinTrades = (
				[...newData.win].reduce((a, b) => a + b, 0) / newData.win.length
			).toFixed(2);
			if (aveWinTrades === "NaN") aveWinTrades = 0;
			let aveLossTrades = (
				[...newData.loss].reduce((a, b) => a + b, 0) / newData.loss.length
			).toFixed(2);
			if (aveLossTrades === "NaN") aveLossTrades = 0;
			if (aveLossTrades < 0) aveLossTrades *= -1;
			let Profitability = ((newData.win.length / totalTrades) * 100).toFixed(2);

			let totalTime = (
				[...newData.time].reduce((a, b) => a + b, 0) / newData.time.length
			)
				.toFixed()
				.toString();
			if (totalTime === "NaN") totalTime = 0;

			let totalProfits = [...newData.win].reduce((a, b) => a + b, 0);
			let totalLosses = [...newData.loss].reduce((a, b) => a + b, 0);
			let winner = newData.win.length;
			let losers = newData.loss.length;
			let oddsOfWinning = winner / totalTrades;
			let oddsOfLosing = losers / totalTrades;
			let aveWin = (totalProfits / winner).toFixed(2);
			if (aveWin === "NaN") aveWin = 0;

			let aveLoss = (totalLosses / losers).toFixed(2);
			let expectancyPerTrade = (
				aveWin * oddsOfWinning +
				aveLoss * oddsOfLosing
			).toFixed(2);

			if (aveLoss < 0) aveLoss *= -1;
			if (expectancyPerTrade < 0) {
				expectancyPerTrade *= -1;
				expectancyPerTrade = "-$" + expectancyPerTrade;
			}
			if (expectancyPerTrade >= 0) {
				expectancyPerTrade = "$" + expectancyPerTrade;
			}

			let rewardRatio =
				[...newData.win].reduce((a, b) => a + b, 0) /
				[...newData.loss].reduce((a, b) => a + b, 0).toString();

			let expectancy = (rewardRatio * oddsOfWinning - oddsOfLosing)
				.toFixed(2)
				.toString();

			// Tabs Data
			const tabData = {
				leftTab: [
					{ header: "Trades:", value: `${res.length < 2 ? 0 : totalTrades}` },
					{
						header: "Profitability(%):",
						value: `${res.length <= 2 ? 0 : Profitability}`,
					},

					{ header: "Pips:", value: `${totalPips}` },
					{ header: "Average Win:", value: `${"$" + aveWinTrades}` },
					{
						header: "Average Loss:",
						value: `${aveLossTrades === 0 ? "$0" : "-$" + aveLossTrades}`,
					},
					{ header: "Lots:", value: `${totalLots}` },
					{
						header: "Commissions:",
						value: `${commission === "0.00" ? "$0" : "-$" + commission}`,
					},
				],
				rightTab: [
					{
						header: "Longs Won:",
						value: `(${res.length < 2 ? 0 : longWon}/${
							res.length < 2 ? 0 : totalLong
						})${aveLongWin === "NaN" ? 0 : aveLongWin}%`,
					},
					{
						header: "Shorts Won:",
						value: `(${res.length < 2 ? 0 : shortWon}/${
							res.length < 2 ? 0 : totalShort
						})${aveShortWin === "NaN" ? 0 : aveShortWin}%`,
					},
					{
						header: "Best Trade:",
						value: `${"$" + bestTrade}`,
					},
					{
						header: "Worst Trade:",
						value: `${worstTrade === 0 ? "$" + worstTrade : "-$" + worstTrade}`,
					},
					{
						header: "Best / Worst Trade (Pips):",
						value: `${bestPips} / ${worstPips}`,
					},
					{
						header: "Expectancy:",
						value: `${
							expectancyPerTrade === "NaN" ? 0 : expectancyPerTrade
						} / ${res.length <= 2 ? 0 : expectancy}`,
					},
					{ header: "Avg. Trade Length:", value: `${totalTime}d` },
				],
			};

			setResData(tabData);
			setIsPending(false);
		}
	}, [accDataHistory]);

	const ProfitabilityStyle = {
		width: "100%",
		height: "13px",
		display: "flex",
		color: "#fbfafa",
		overflow: "hidden",
	};
	const ProfitabilityStyleWin = {
		background: "green",
		height: "100%",
		fontSize: "12px",
		width: resData !== null ? `${resData.leftTab[1].value}%` : "",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
	const ProfitabilityStyleLoss = {
		background: "red",
		height: "100%",
		fontSize: "12px",
		width:
			resData !== null
				? `${
						resData.leftTab[1].value === "0"
							? 0
							: 100 - resData.leftTab[1].value
				  }%`
				: "",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	return (
		!isPending && (
			<motion.div layout className="statistics">
				<Paper
					className="statistics__table1"
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
												className="statistics__table1__header"
												align="left"
												component="th"
												scope="row"
											>
												{leftTab.header}
											</TableCell>
											<TableCell align="center">
												{leftTab.header === "Profitability(%):" ? (
													<div style={ProfitabilityStyle}>
														<div style={ProfitabilityStyleWin}>
															{leftTab.value}
														</div>
														<div style={ProfitabilityStyleLoss}>
															{100 - leftTab.value}
														</div>
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
					className="statistics__table2"
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
												className="statistics__table2__header"
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
			</motion.div>
		)
	);
}

export default StatisticTab;
