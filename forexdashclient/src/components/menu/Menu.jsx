import { useDispatch, useSelector } from "react-redux";
import { UilBars, UilTimes } from "@iconscout/react-unicons";
import { setIsSideBarOpen } from "../../store/menuSlice";
import { motion } from "framer-motion";

function Menu() {
	const dispatch = useDispatch();

	const openSideBar = () => {
		dispatch(setIsSideBarOpen(true));
	};

	const closeSideBar = () => {
		dispatch(setIsSideBarOpen(false));
	};

	const isSideBarOpen = useSelector(
		(state) => state.menuSlice.menuSlice.isSideBarOpen
	);

	return (
		<motion.div className="menu">
			{!isSideBarOpen && (
				<motion.div className="menu__icon" onClick={() => openSideBar()}>
					<UilBars />
				</motion.div>
			)}
			{isSideBarOpen && (
				<motion.div className="menu__icon" onClick={() => closeSideBar()}>
					<UilTimes />
				</motion.div>
			)}
		</motion.div>
	);
}

export default Menu;
