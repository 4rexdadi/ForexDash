import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ExpandedExtra() {
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
				real: true,
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
			color: "green",
			padding: "5px",
			borderRadius: "7px",
		},
		Withdrawal: {
			color: "green",
			padding: "5px",
			borderRadius: "7px",
		},
		Profit: {
			color: !isPending ? (accountInfo.profit < 0 ? "red" : "green") : "",
			padding: "5px",
			borderRadius: "7px",
		},
		Drawdown: {
			color: !isPending ? (accountInfo.drawdown === 0 ? "green" : "red") : "",
			padding: "5px",
			borderRadius: "7px",
		},
	};

	return (
		!isPending &&
		accountInfo && (
			<div className="extraBox">
				<div className="extraBox__gains">
					<div className="extraBox__gains__total">
						<p>Total Gain</p>
						<CircularProgressbar
							value={accountInfo.defaultTotalGains}
							text={`${accountInfo.defaultTotalGains}%`}
							styles={buildStyles({
								pathTransitionDuration: 0.5,
								pathColor:
									accountInfo.defaultTotalGains < 0 ? "#ff919d" : "#7bff7bae",
								textColor: accountInfo.defaultTotalGains < 0 ? "red" : "green",
							})}
						/>
					</div>
					<div className="extraBox__gains__abs">
						<p>Abs Gain</p>
						<CircularProgressbar
							value={accountInfo.defaultTotalGains}
							text={`${accountInfo.defaultTotalGains}%`}
							styles={buildStyles({
								pathTransitionDuration: 0.5,
								pathColor:
									accountInfo.defaultTotalGains < 0 ? "#ff919d" : "#7bff7bae",
								textColor: accountInfo.defaultTotalGains < 0 ? "red" : "green",
							})}
						/>
					</div>
				</div>
				<div className="extraBox__info">
					<div className="deposit">
						<p>Deposit</p>
						<span style={colorStyle.Deposit}>${accountInfo.deposit}</span>
					</div>
					<div className="withdrawal">
						<p>Withdrawal</p>
						<span style={colorStyle.Withdrawal}>${accountInfo.withdrawal}</span>
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
						Last Update <br />
						{accountInfo.lastUpdateDate}
					</div>
				</div>
			</div>
		)
	);
}

export default ExpandedExtra;
