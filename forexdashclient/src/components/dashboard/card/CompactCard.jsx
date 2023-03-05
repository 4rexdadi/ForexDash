/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Pagination } from "swiper";

// // Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import {
	UilMoneyBill,
	UilMoneybag,
	UilBill,
	UilAnalytics,
} from "@iconscout/react-unicons";

const CompactCard = ({ setIsExpanded }) => {
	const [accountInfo, setAccountInfo] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [isLessThen, setIsLessThen] = useState(false);
	const accInfo = useSelector((state) => state.accInfoSlice);
	const accNumber = accInfo.accInfoSlice.accNumber;
	const accDataInfo = accInfo.accInfoSlice.accDataInfo;

	useEffect(() => {
		if (accDataInfo) {
			const res = accDataInfo.accounts[accNumber];

			// Dashboard User Data
			const chartInfo = {
				accountName: res.name,
				accountId: res.id,
				demo: res.demo,
				dailyProfit: res.daily,
				balance: res.balance,
				equity: res.equity,
				profit: res.profit,
				withdrawal: res.withdrawals,
				deposit: res.deposits,
				totalGains: "67",
			};

			setAccountInfo(chartInfo);
			setIsPending(false);
		}
	}, [accDataInfo, accNumber]);

	let width = window.innerWidth;

	useEffect(() => {
		if (width < 768) {
			setIsLessThen(true);
		} else {
			setIsLessThen(false);
		}

		window.addEventListener("resize", () => {
			let width = window.innerWidth;
			if (width < 768) {
				setIsLessThen(true);
			} else {
				setIsLessThen(false);
			}
		});
	}, [width]);

	return (
		<motion.div className="compactCard" layout layoutId="expandableCard">
			{!isPending && (
				<div className="center">
					<div className="center__tittle">
						<h2>{accountInfo.accountName}</h2>
						<UilAnalytics
							className="Analytics"
							onClick={() => setIsExpanded(true)}
						/>
						<div>
							<h3>{accountInfo.accountId}</h3>
							<p>{accountInfo.demo ? "Demo" : "Real"}</p>
						</div>
					</div>
					{!isLessThen && (
						<div className="center__info">
							<div className="stats cardColor-1">
								<p>
									Profits(24hrs) <UilMoneyBill />
								</p>
								<hr />
								<h3>{accountInfo.dailyProfit}%</h3>
							</div>
							<div className="stats cardColor-2">
								<p>
									Balance <UilMoneybag />
								</p>
								<hr />
								<h3>${accountInfo.balance}</h3>
							</div>
							<div className="stats cardColor-3">
								<p>
									Equity <UilBill />
								</p>
								<hr />
								<h3>${accountInfo.equity}</h3>
							</div>
						</div>
					)}
					{isLessThen && (
						<div className="swiperContainer">
							<div className="swiperContainer__swipe">
								<Swiper
									pagination={{
										dynamicBullets: true,
									}}
									modules={[Pagination]}
								>
									<SwiperSlide>
										<div className="stats cardColor-1">
											<p>
												Profits(24hrs) <UilMoneyBill />
											</p>
											<hr />
											<h3>{accountInfo.dailyProfit}%</h3>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="stats cardColor-2">
											<p>
												Balance <UilMoneybag />
											</p>
											<hr />
											<h3>${accountInfo.balance}</h3>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="stats cardColor-3">
											<p>
												Equity <UilBill />
											</p>
											<hr />
											<h3>${accountInfo.equity}</h3>
										</div>
									</SwiperSlide>
								</Swiper>
							</div>
						</div>
					)}
				</div>
			)}
		</motion.div>
	);
};

export default CompactCard;
