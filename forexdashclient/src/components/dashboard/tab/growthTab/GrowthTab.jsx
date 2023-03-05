import React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { motion } from "framer-motion";

function GrowthTab() {
	const [chartData, setChartData] = useState(null);
	const [optionsData, setOptionsData] = useState(null);
	const [isPending, setIsPending] = useState(true);

	const accInfo = useSelector((state) => state.accInfoSlice);
	const accDataDaily = accInfo.accInfoSlice.accDataDaily;

	useEffect(() => {
		if (accDataDaily) {
			let newData = {
				balance: [],
				date: [],
				lotSize: [],
				pips: [],
				profit: [],
				growthEquity: [],
			};
			const res = accDataDaily.dataDaily;

			for (let i = 0; i < res.length; i++) {
				let balance = res[i][0].balance;
				let date = res[i][0].date;
				let lotSize = res[i][0].lots;
				let pips = res[i][0].pips;
				let profit = res[i][0].profit;
				let growthEquity = res[i][0].growthEquity;
				newData.balance.push(balance);
				newData.date.push(date);
				newData.lotSize.push(lotSize);
				newData.pips.push(pips);
				newData.profit.push(profit);
				newData.growthEquity.push(growthEquity);
			}

			// Analytics Cards Data
			const chartInfo = {
				series: [
					{
						type: "area",
						name: "Daily profits",
						data: [...newData.profit],
					},
				],
			};

			const optionsInfo = {
				options: {
					chart: {
						type: "line",
						height: "auto",
					},
					colors: ["#242d49"],
					dataLabels: {
						enabled: window.innerWidth < 800 ? false : true,
						style: {
							colors: ["#242d49"],
						},
					},
					fill: {
						colors: ["#Fff"],
						type: "pattern",
						pattern: {
							style: "verticalLines",
							width: 6,
							height: 6,
							strokeWidth: 2,
						},
					},
					stroke: {
						curve: "smooth",
						colors: ["#242d49"],
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
				},
			};

			setChartData(chartInfo);
			setOptionsData(optionsInfo);
			setIsPending(false);
		}
	}, [accDataDaily]);

	return (
		<motion.div className="growth" layout>
			{!isPending && optionsData && chartData && (
				<Chart
					className="ApexCharts"
					options={optionsData.options}
					series={chartData.series}
					type="line"
				/>
			)}
		</motion.div>
	);
}

export default GrowthTab;
