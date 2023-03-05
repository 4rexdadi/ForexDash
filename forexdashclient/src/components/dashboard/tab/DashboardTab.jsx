/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StatisticTab from "./statisticTab/StatisticTab";
import HistoryTab from "./historyTab/HistoryTab";
import { UilConfused } from "@iconscout/react-unicons";
import GrowthTab from "./growthTab/GrowthTab";
import { motion } from "framer-motion";

function DashboardTab(props) {
	const [value, setValue] = useState("StatisticsTab");
	const [totalTrade, setTotalTrade] = useState();
	const [totalDays, setTotalDays] = useState();
	const isExpanded = props.isExpanded;
	const [isPending, setIsPending] = useState(true);

	const accInfo = useSelector((state) => state.accInfoSlice);
	const accDataHistory = accInfo.accInfoSlice.accDataHistory;
	const accDataDaily = accInfo.accInfoSlice.accDataDaily;

	useEffect(() => {
		if (accDataHistory && accDataDaily) {
			let newData = {
				trades: [],
				days: [],
			};
			const tradeRes = accDataHistory.history;
			const dayRes = accDataDaily.dataDaily;

			for (let i = 0; i < tradeRes.length; i++) {
				let trades = tradeRes[i].action;
				if (trades === "Buy" || trades === "Sell") {
					newData.trades.push(trades);
				}
			}
			for (let i = 0; i < dayRes.length; i++) {
				let days = dayRes[i][0].date;
				let lots = dayRes[i][0].lots;
				let pips = dayRes[i][0].pips;
				let profit = dayRes[i][0].profit;
				if (lots !== 0 || pips !== 0 || profit !== 0) {
					newData.days.push(days);
				}
			}

			setTotalTrade(newData.trades.length);
			setTotalDays(newData.days.length);
			setIsPending(false);
		}
	}, [accDataHistory, accDataDaily]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const NoEnoughData = () => {
		return (
			<div className="noData">
				<div className="noData__icon">
					<UilConfused />
				</div>
				<p>No enough data. Please check back when you have enough trades</p>
				<p>
					You have {`${totalTrade}`} trade and {`${totalDays}`} active trading
					days{" "}
				</p>
			</div>
		);
	};

	return (
		<motion.div className="dashboardTab">
			{!isExpanded && !isPending && (
				<Box sx={{ width: "100%" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="secondary"
						indicatorColor="secondary"
						aria-label="secondary tabs"
						variant="fullWidth"
						scrollButtons="auto"
					>
						<Tab
							className="dashboardTab__tab"
							value="StatisticsTab"
							label={`${
								totalTrade < 2 ? `Trades` : `Last ${totalTrade} Trades`
							}`}
						/>
						<Tab
							className="dashboardTab__tab"
							value="HistoryTab"
							label={`${
								totalDays < 2
									? `Trading Days`
									: `Last ${totalDays} Trading Days`
							}`}
						/>
						<Tab
							className="dashboardTab__tab"
							value="DailyTab"
							label="Daily Growth"
						/>
					</Tabs>
					{value === "StatisticsTab" &&
						(totalTrade <= 2 ? <NoEnoughData /> : <StatisticTab />)}
					{value === "HistoryTab" &&
						(totalDays < 2 ? <NoEnoughData /> : <HistoryTab />)}
					{value === "DailyTab" &&
						(totalDays < 2 ? <NoEnoughData /> : <GrowthTab />)}
				</Box>
			)}
		</motion.div>
	);
}

export default DashboardTab;
