import Dashboard from "./components/dashboard/Dashboard.jsx";
import Rightbar from "./components/rightbar/Rightbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Trades from "./components/pages/trade/Trades.jsx";
import Products from "./components/pages/Products/Products.jsx";
import Tools from "./components/pages/Tools/Tools.jsx";
import Analytics from "./components/pages/Analytics/Analytics.jsx";
import { useEffect, useState } from "react";
import Login from "./components/login/Login.jsx";
import Menu from "./components/menu/Menu.jsx";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [logout, setLogout] = useState(true);

	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://s3.tradingview.com/tv.js";
		script.type = "text/javascript";
		script.async = true;

		document.body.appendChild(script);
	}, []);

	return (
		<div className="App">
			{!isLoggedIn && (
				<Login
					setIsLoggedIn={setIsLoggedIn}
					isLoggedIn={isLoggedIn}
					logout={logout}
					setLogout={setLogout}
				/>
			)}
			{isLoggedIn && (
				<>
					<Menu />
					<div className="container">
						<Sidebar setIsLoggedIn={setIsLoggedIn} setLogout={setLogout} />

						<Routes>
							<Route index path="/" element={<Dashboard />} exact />
							<Route path="/Trades" element={<Trades />} />
							<Route path="/Analytics" element={<Analytics />} />
							<Route path="/Tools" element={<Tools />} />
							<Route path="/Products" element={<Products />} />
						</Routes>

						<Rightbar />
					</div>
				</>
			)}
		</div>
	);
}

export default App;
