/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Rightbar = () => {
	const [accountInfo, setAccountInfo] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const accInfo = useSelector((state) => state.accInfoSlice);
	const accNumber = accInfo.accInfoSlice.accNumber;
	const accDataInfo = accInfo.accInfoSlice.accDataInfo;

	useEffect(() => {
		if (accDataInfo) {
			const res = accDataInfo.accounts[accNumber];

			// to turn negative number to positive
			let newGains = res.gain;
			newGains = Math.abs(null) - res.gain;
			let newAbsGainGains = res.absGain;
			newAbsGainGains = Math.abs(null) - res.absGain;

			// Right bar User Data
			const chartInfo = {
				accountName: res.name,
				accountId: "561333356",
				real: true,
				dailyProfit: 34,
				balance: "900",
				equity: "400",
				profit: res.profit,
				withdrawal: res.withdrawals,
				deposit: res.deposits,
				totalGains: res.gain < 0 ? newGains.toFixed(2) : res.gain.toFixed(2),
				absGain:
					res.absGain < 0 ? newAbsGainGains.toFixed(2) : res.absGain.toFixed(2),
				defaultTotalGains: res.gain.toFixed(2),
				defaultAbsGain: res.absGain.toFixed(2),
				drawdown: res.drawdown,
				lastUpdateDate: res.lastUpdateDate,
			};

			setAccountInfo(chartInfo);
			setIsPending(false);
		}
	}, [accDataInfo, accNumber]);

	const colorStyle = {
		Deposit: {
			// background: "rgb(145 254 159 / 47%)",
			color: "green",
			padding: "5px",
			borderRadius: "7px",
		},
		Withdrawal: {
			// background: "rgb(145 254 159 / 47%)",
			color: "green",
			padding: "5px",
			borderRadius: "7px",
		},
		Profit: {
			color: !isPending ? (accountInfo.profit < 0 ? "red" : "green") : "",
			// background: !isPending
			// 	? accountInfo.drawdown < 0
			// 		? "rgb(145 254 159 / 47%)"
			// 		: "#ffadad8f"
			// 	: "",
			padding: "5px",
			borderRadius: "7px",
		},
		Drawdown: {
			color: !isPending ? (accountInfo.drawdown === 0 ? "green" : "red") : "",
			// background: !isPending
			// 	? accountInfo.drawdown < 0
			// 		? "rgb(145 254 159 / 47%)"
			// 		: "#ffadad8f"
			// 	: "",
			padding: "5px",
			borderRadius: "7px",
		},
	};

	return (
		<>
			{!isPending && (
				<div className="rightBar">
					<div className="rightBar__progressBar">
						<div>
							<p>Total Gain</p>
							<CircularProgressbar
								value={accountInfo.defaultTotalGains}
								text={`${accountInfo.defaultTotalGains}%`}
								styles={buildStyles({
									pathTransitionDuration: 0.5,
									pathColor:
										accountInfo.defaultTotalGains < 0 ? "#ff919d" : "#7bff7bae",
									textColor:
										accountInfo.defaultTotalGains < 0 ? "red" : "green",
								})}
							/>
						</div>
						<div>
							<p>Abs Gain</p>
							<CircularProgressbar
								value={accountInfo.defaultAbsGain}
								text={`${accountInfo.defaultAbsGain}%`}
								styles={buildStyles({
									pathTransitionDuration: 0.5,
									pathColor:
										accountInfo.defaultAbsGain < 0 ? "#ff919d" : "#7bff7bae",
									textColor: accountInfo.defaultAbsGain < 0 ? "red" : "green",
								})}
							/>
						</div>
					</div>
					<div className="rightBar__starts">
						<div className="deposit">
							<p>Deposit</p>
							<span style={colorStyle.Deposit}>${accountInfo.deposit}</span>
						</div>
						<div className="withdrawal">
							<p>Withdrawal</p>
							<span style={colorStyle.Withdrawal}>
								${accountInfo.withdrawal}
							</span>
						</div>
						<div className="profits">
							<p>Profit</p>
							<span style={colorStyle.Profit}>${accountInfo.profit}</span>
						</div>
						<div className="drawdown">
							<p>Drawdown</p>
							<span style={colorStyle.Drawdown}>{accountInfo.drawdown}%</span>
						</div>
						<div className="lastUpdate">
							<p>Last Update</p> <br />
							<p>{accountInfo.lastUpdateDate}</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Rightbar;
