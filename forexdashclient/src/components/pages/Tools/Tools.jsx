import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
	UilGraphBar,
	UilCalendarAlt,
	UilDollarAlt,
	UilCalculatorAlt,
} from "@iconscout/react-unicons";

import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";

const Fade = React.forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

Fade.propTypes = {
	children: PropTypes.element,
	in: PropTypes.bool.isRequired,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
};

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Calender() {
	const [technicalSummaryOpen, setTechnicalSummaryOpen] = React.useState(false);
	const [calenderOpen, setCalenderOpen] = React.useState(false);
	const [currencyConverterOpen, setCurrencyConverterOpen] =
		React.useState(false);
	const [pipCalculatorOpen, setPipCalculatorOpen] = React.useState(false);

	// const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setTechnicalSummaryOpen(false);
		setCalenderOpen(false);
		setCurrencyConverterOpen(false);
		setPipCalculatorOpen(false);
	};

	const isSideBarOpen = useSelector(
		(state) => state.menuSlice.menuSlice.isSideBarOpen
	);

	const width = window.innerWidth;
	const height = window.innerHeight;

	return (
		<>
			{(width < 800 || height < 800) && (
				<div
					style={{
						height: "100%",
						width: "100%",
						display: "grid",
						placeItems: "center",
					}}
				>
					<h3>Coming soon for smaller devices !!!</h3>
				</div>
			)}
			{!isSideBarOpen && width > 800 && height > 800 && (
				<div className="toolBox">
					<div className="toolBox__box">
						<Button onClick={() => setTechnicalSummaryOpen(true)}>
							<div
								style={{
									background:
										" linear-gradient(180deg, #bb67ff 0%, #e0b4ff 100%)",
								}}
								className="toolBox__content"
							>
								<div className="toolBox__content__icon">
									<UilGraphBar />
								</div>
								<p className="toolBox__content__tittle">Technical Summary</p>
							</div>
						</Button>
						<Modal
							aria-labelledby="spring-modal-title"
							aria-describedby="spring-modal-description"
							open={technicalSummaryOpen}
							onClose={handleClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							<Fade in={technicalSummaryOpen}>
								<Box sx={style}>
									<div className="toolBox__technicalSummary" component="div">
										<iframe
											title="technicalSummary"
											className="technicalSummary"
											src="https://ssltsw.investing.com?lang=1&forex=1,2,3,5,7,149,68&commodities=8830,8836,8831,8849,8833,8862,8832&indices=175,166,172,27,179,170,174&stocks=345,346,347,348,349,350,352&tabs=1,2,3,4"
										></iframe>
									</div>
								</Box>
							</Fade>
						</Modal>
					</div>
					<div className="toolBox__box">
						<Button onClick={() => setCalenderOpen(true)}>
							<div
								style={{
									background:
										"linear-gradient(180deg, #ff919d 0%, #fc929d 100%)",
								}}
								className="toolBox__content"
							>
								<div className="toolBox__content__icon">
									<UilCalendarAlt />
								</div>
								<p className="toolBox__content__tittle">Economy Calender</p>
							</div>
						</Button>
						<Modal
							aria-labelledby="spring-modal-title"
							aria-describedby="spring-modal-description"
							open={calenderOpen}
							onClose={handleClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							<Fade in={calenderOpen}>
								<Box sx={style}>
									<div className="toolBox__calender">
										<iframe
											src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&category=_employment,_economicActivity,_inflation,_credit,_centralBanks,_confidenceIndex,_balance,_Bonds&importance=3&features=datepicker,timezone,timeselector,filters&countries=25,6,37,72,35,43,12,4,5&calType=week&timeZone=8&lang=1"
											className="calender"
											title="calender"
										></iframe>
									</div>
								</Box>
							</Fade>
						</Modal>
					</div>
					<div className="toolBox__box">
						<Button onClick={() => setCurrencyConverterOpen(true)}>
							<div
								style={{
									background:
										"linear-gradient(180deg, #abff91 0%, #92fcd7 100%)",
								}}
								className="toolBox__content"
							>
								<div className="toolBox__content__icon">
									<UilDollarAlt />
								</div>
								<p className="toolBox__content__tittle">Currency Converter</p>
							</div>
						</Button>
						<Modal
							aria-labelledby="spring-modal-title"
							aria-describedby="spring-modal-description"
							open={currencyConverterOpen}
							onClose={handleClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							<Fade in={currencyConverterOpen}>
								<Box sx={style}>
									<div className="toolBox__currencyConverter">
										<iframe
											className="currencyConverter"
											title="currencyConverter"
											src="https://ssltools.investing.com/profit-calculator/index.php?force_lang=1&acc=12&pair=1"
										></iframe>
									</div>
								</Box>
							</Fade>
						</Modal>
					</div>
					<div className="toolBox__box">
						<Button onClick={() => setPipCalculatorOpen(true)}>
							<div
								style={{
									background:
										"linear-gradient(180deg, #ffca71 0%, #f8d49a 100%)",
								}}
								className="toolBox__content"
							>
								<div className="toolBox__content__icon">
									<UilCalculatorAlt />
								</div>
								<p className="toolBox__content__tittle">Pips Calculator</p>
							</div>
						</Button>
						<Modal
							aria-labelledby="spring-modal-title"
							aria-describedby="spring-modal-description"
							open={pipCalculatorOpen}
							onClose={handleClose}
							closeAfterTransition
							BackdropComponent={Backdrop}
							BackdropProps={{
								timeout: 500,
							}}
						>
							<Fade in={pipCalculatorOpen}>
								<Box sx={style}>
									<div className="toolBox__pipCalculator">
										<iframe
											title="pipCalculator"
											className="pipCalculator"
											src="https://ssltools.investing.com/pip-calculator/index.php?force_lang=1&acc=12"
										></iframe>
									</div>
								</Box>
							</Fade>
						</Modal>
					</div>
					<p>More Tools will be added soon !!!</p>
				</div>
			)}
		</>
	);
}

export default Calender;
