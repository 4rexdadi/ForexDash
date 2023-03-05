import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

function Analytics() {
	const [value, setValue] = React.useState("liveChart");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://s3.tradingview.com/tv.js";
		script.type = "text/javascript";
		script.async = true;

		document.body.appendChild(script);
	}, []);

	const widget = window.TradingView;

	useEffect(() => {
		if (widget && value === "liveChart") {
			new widget.widget({
				autosize: true,
				symbol: "OANDA:EURUSD",
				interval: "60",
				timezone: "Africa/Lagos",
				theme: "light",
				style: "1",
				locale: "en",
				toolbar_bg: "#f1f3f6",
				enable_publishing: false,
				hide_side_toolbar: false,
				allow_symbol_change: true,
				watchlist: ["OANDA:GBPUSD"],
				container_id: "liveChart__chart",
			});
		}
	}, [value, widget]);

	const isSideBarOpen = useSelector(
		(state) => state.menuSlice.menuSlice.isSideBarOpen
	);

	return (
		!isSideBarOpen && (
			<Box className="liveAnalytics" sx={{ width: "100%" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor="secondary"
					indicatorColor="secondary"
					aria-label="secondary tabs"
					variant="scrollable"
					scrollButtons="auto"
				>
					<Tab
						className="liveAnalytics__tab"
						value="liveChart"
						label="liveChart"
					/>
					<Tab
						className="liveAnalytics__tab"
						value="currencyCrosses"
						label="currencyCrosses"
					/>
					<Tab
						className="liveAnalytics__tab"
						value="topCryptocurrencies"
						label="topCryptocurrencies"
					/>
				</Tabs>
				{value === "liveChart" && (
					<div className="liveChart">
						{widget && (
							<div className="liveChart__chart" id="liveChart__chart"></div>
						)}
					</div>
				)}
				{value === "currencyCrosses" && (
					<div className="currencyCrosses">
						<iframe
							title="currencyCrosses"
							className="currencyCrosses__crosses"
							src="https://www.widgets.investing.com/single-currency-crosses?theme=lightTheme&hideTitle=true&roundedCorners=true&currency=12"
						></iframe>
					</div>
				)}
				{value === "topCryptocurrencies" && (
					<div className="topCryptocurrencies">
						<iframe
							title="topCryptocurrencies"
							className="topCryptocurrencies__crypto"
							src="https://www.widgets.investing.com/top-cryptocurrencies?theme=lightTheme&hideTitle=true&roundedCorners=true"
						></iframe>
					</div>
				)}
			</Box>
		)
	);
}

export default Analytics;
