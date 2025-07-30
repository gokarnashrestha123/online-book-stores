import React, { useContext, useEffect, useState } from "react";
import styles from "./Login.module.css";
import loginImg from "../assets/login.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        // console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  return (
    <section className={styles.loginSection}>
      <div className={styles.container}>
        {/* image side */}
        <div className={styles.imageSide}>
          <img src={loginImg} alt="login visual" className={styles.loginImg} />
        </div>

        {/* form side */}
        <div className={styles.formSide}>
          <form onSubmit={onSubmitHandler} className={styles.form}>
            <h3 className={styles.formTitle}>{currState}</h3>

            {currState === "Sign Up" && (
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              {currState === "Sign Up" ? "Sign Up" : "Login"}
            </button>

            <div className={styles.bottomText}>
              <p className={styles.linkText}>Forgot your password?</p>
              {currState === "Login" ? (
                <p>
                  Don't have an account?
                  <span
                    className={styles.switchLink}
                    onClick={() => setCurrState("Sign Up")}
                  >
                    {" "}
                    Create account
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?
                  <span
                    className={styles.switchLink}
                    onClick={() => setCurrState("Login")}
                  >
                    {" "}
                    Login
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
