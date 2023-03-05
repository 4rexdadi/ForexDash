/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setAccDataDaily,
  setAccDataHistory,
  setAccDataInfo,
  setAccNumber,
  setSession,
  setTryDemoLogin,
} from "../../store/accInfoSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ReactComponent as Icon } from "../../img/dashboard.svg";
import { axiosInstance } from "./config";

function Login({ isLoggedIn, setIsLoggedIn, logout, setLogout }) {
  const [showInputPage, setShowInputPage] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAcc, setSelectedAcc] = useState("");
  const [userAcc, setUserAcc] = useState(null);
  const [allowLogin, setAllowLogin] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState(null);
  const [isLessThen, setIsLessThen] = useState(false);

  const [accSessionId, setAccSessionId] = useState(null);
  const [accId, setAccId] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const accInfo = useSelector((state) => state.accInfoSlice);
  const getSession = accInfo.accInfoSlice.getSession;
  const tryDemoLogin = accInfo.accInfoSlice.tryDemoLogin;

  const axios = require("axios");

  // for demo log in purposes
  const tryDemoAcc = () => {
    setPassword("demo12345");
    setEmail("beauspecial06@gmail.com");
    dispatch(setTryDemoLogin(false));
  };

  async function getData() {
    setIsPending(true);

    try {
      const res = await axiosInstance.post(`/getSession`, {
        email: email,
        password: password,
      });
      if (res && !res.data.error) {
        setAccSessionId(res.data.session);
        dispatch(setSession(res.data.session));
        setErrors(null);
        setIsPending(false);
      } else {
        setErrors([{ header: "logIn", value: res.data.message }]);
      }
    } catch (error) {
      console.error(error);
      setErrors([{ header: "logIn", value: error.message }]);
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  }

  async function getAccDataInfo() {
    setIsPending(true);

    try {
      const res = await axios.get(
        `https://www.myfxbook.com/api/get-my-accounts.json?session=${accSessionId}`
      );
      if (res && !res.data.error) {
        setErrors(null);
        setUserAcc(res.data.accounts);
        dispatch(setAccDataInfo(res.data));
      } else {
        setErrors((prev) => [{ header: "Session", value: res.data.message }]);
      }
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  }

  async function getAccDataDaily() {
    setIsPending(true);

    try {
      const res = await axios.get(
        `https://www.myfxbook.com/api/get-data-daily.json?session=${accSessionId}&id=${accId}&start=2000-01-01&end=2025-06-01`
      );
      if (res && !res.data.error) {
        dispatch(setAccDataDaily(res.data));
        setErrors(null);
      } else {
        setErrors((prev) => [
          { header: "Daily Data Info", value: res.data.message },
        ]);
      }
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  }

  async function getAccDataHistory() {
    setIsPending(true);

    try {
      const res = await axios.get(
        `https://www.myfxbook.com/api/get-history.json?session=${accSessionId}&id=${accId}`
      );
      if (res && !res.data.error) {
        dispatch(setAccDataHistory(res.data));
        setErrors(null);
      } else {
        setErrors((prev) => [
          { header: "Data History", value: res.data.message },
        ]);
      }
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      setIsPending(false);
    }, 1000);
  }

  async function LogoutAcc() {
    try {
      const res = await axiosInstance.delete(`/deleteSession/${getSession}`);
      if (res && !res.data.error) {
        setErrors(null);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const res = await axios.get(
        `https://www.myfxbook.com/api/logout.json?session=${getSession}`
      );
      if (res && !res.data.error) {
        setErrors(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getUserAcc = (acc, index) => {
    setAccId(acc.id);
    dispatch(setAccNumber(index));
    setAllowLogin(true);
  };

  const switchUser = () => {
    setIsLoggedIn(true);
  };

  const doNothing = () => {};

  const checkUser = () => {
    if (!allowLogin && accSessionId) {
      alert("Account : Please Select an Account");
    }

    if (!logout) {
      LogoutAcc();
      setLogout(true);
      setPassword("");
      setEmail("");
      dispatch(setTryDemoLogin(true));
    }

    if (logout && !accSessionId) {
      if (email === "" || password === "") {
        setErrors([{ header: "logIn", value: "Required Field Missing" }]);
      } else {
        getData();
      }
    }

    if (allowLogin) {
      getAccDataDaily();
      getAccDataHistory();

      setTimeout(() => {
        navigate("/");
        setIsLoggedIn(true);
      }, 1000);
    }
  };

  useEffect(() => {
    if (accSessionId) {
      getAccDataInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accSessionId]);

  let height = window.innerHeight;

  useEffect(() => {
    if (height < 1000 && userAcc) {
      setIsLessThen(true);
    } else {
      setIsLessThen(false);
    }

    window.addEventListener("resize", () => {
      let height = window.innerHeight;
      if ((height < 1000) & userAcc) {
        setIsLessThen(true);
      } else {
        setIsLessThen(false);
      }
    });
  }, [height, userAcc]);

  return (
    <motion.div layout className="loginPage">
      {tryDemoLogin && (
        <>
          <motion.div layout>
            <div
              className="btn"
              onClick={() => dispatch(setTryDemoLogin(false))}
            >
              <p>Log in</p>
            </div>
          </motion.div>
          <motion.div layout>
            <div className="btn" onClick={() => tryDemoAcc()}>
              <p>Try a demo account</p>
            </div>
          </motion.div>
        </>
      )}

      {!tryDemoLogin && (
        <>
          {!logout && (
            <motion.div layout>
              <Link to="/" className="btn" onClick={switchUser}>
                <p>Back !!!</p>
              </Link>
            </motion.div>
          )}

          <motion.div layout className="loginPage__input">
            {logout && (
              <div className="input">
                <p className="input__title">Log in</p>
                <div className="login-box">
                  <form className="login-box__form">
                    <div className="user-box">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={
                          userAcc ? doNothing : (e) => setEmail(e.target.value)
                        }
                        value={email}
                        required
                        placeholder="..."
                      />
                    </div>
                    <div className="user-box">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={
                          userAcc
                            ? doNothing
                            : (e) => setPassword(e.target.value)
                        }
                        value={password}
                        required
                        placeholder="..."
                      />
                    </div>
                  </form>
                </div>
                <div>
                  {userAcc && (
                    <div>
                      <FormControl>
                        <FormLabel id="radio-buttons">
                          Selected Your Account
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="radio-button"
                          name="radio-button"
                          value={selectedAcc}
                          onChange={(e) => setSelectedAcc(e.target.value)}
                        >
                          {userAcc.map((acc, index) => {
                            return (
                              <FormControlLabel
                                key={index}
                                value={acc.name}
                                control={<Radio />}
                                label={acc.name}
                                onChange={() => getUserAcc(acc, index)}
                              />
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div
              style={{ pointerEvents: isPending ? "none" : "visible" }}
              onClick={() => checkUser()}
              className="btn"
            >
              <p>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {!logout ? "Logout" : "Get Accounts"}
              </p>
            </div>
          </motion.div>

          {showInputPage && logout && (
            <motion.div
              layout
              className={
                !isLessThen ? "loginPage__info" : "loginPage__info displayNone"
              }
            >
              <div className="loginPage__info__icon">
                <Icon />
              </div>
              {!isPending && (
                <div className="loginPage__info__instruction">
                  <h3>Instruction</h3>
                  <motion.div layout className="details">
                    <motion.p layout>
                      Create an account with{" "}
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.myfxbook.com/"
                      >
                        MyFxBook
                      </a>{" "}
                      and connect your MT5 or MT4 following the instructions on
                      MyFxBook website. Put in same email and password you have
                      on MyFxBook account as log in details.
                    </motion.p>
                    {userAcc ? (
                      <motion.p layout>
                        <span>OK GOOD!!!</span> <br /> Now select your
                        preferable account to be displayed on your dashboard
                      </motion.p>
                    ) : (
                      <motion.p layout></motion.p>
                    )}
                  </motion.div>
                </div>
              )}

              <motion.div layout className="loading_error">
                {isPending && (
                  <div className="bouncer">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                )}
                {!isPending && errors && (
                  <div>
                    {errors.map((error, index) => {
                      return (
                        <div className="error__message" key={index}>
                          <span style={{ borderBottom: "1px solid red" }}>
                            <p>{error.header}:</p>
                          </span>
                          <span>
                            <p>{error.value}</p>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
}

export default Login;
