import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SidebarData } from "../Data/data";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { ReactComponent as Logo } from "../../img/logo.svg";
import { motion } from "framer-motion";
import { setIsSideBarOpen } from "../../store/menuSlice";
import { setTryDemoLogin } from "../../store/accInfoSlice";
const Sidebar = ({ setIsLoggedIn, setLogout }) => {
  const [active, setActive] = useState(0);
  const dispatch = useDispatch();

  const isSideBarOpen = useSelector(
    (state) => state.menuSlice.menuSlice.isSideBarOpen
  );

  const sideVariants = {
    closed: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.2,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
    },
    open: { opacity: 1 },
  };

  const switchUser = () => {
    dispatch(setTryDemoLogin(false));
    setLogout(false);
    setIsLoggedIn(false);
    setActive(0);
  };

  const handleClick = (index) => {
    setActive(index);

    dispatch(setIsSideBarOpen(false));
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      layout
      className={isSideBarOpen ? "" : "displayHide"}
    >
      <motion.div
        className="sidebar"
        initial="closed"
        animate="open"
        variants={sideVariants}
      >
        <motion.div
          className="sidebar__logo"
          style={{ width: "max-content", marginInline: "auto" }}
        >
          <Logo />
        </motion.div>
        <motion.nav
          className="sidebar__navbar"
          initial="closed"
          animate="open"
          variants={sideVariants}
        >
          {SidebarData.map((items, index) => {
            return (
              <motion.div
                className="sidebar__navbar__links"
                whileHover={{ scale: 1.1 }}
                variants={itemVariants}
                key={index}
              >
                <Link
                  className="sidebar__navbar__items"
                  onClick={() => handleClick(index)}
                  to={`/${items.heading === "Dashboard" ? "" : items.heading}`}
                >
                  <motion.div
                    className={active === index ? "icons active" : "icons"}
                  >
                    <items.icon />
                  </motion.div>
                  <motion.div className="heading">{items.heading}</motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
        <div className="sidebar__logout">
          <UilSignOutAlt onClick={() => switchUser()} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
