import React, { useState } from "react";
import loginImg from "../assets/login.png";
import { backend_url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Login.module.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backend_url + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.imageContainer}>
        <img src={loginImg} alt="Login Illustration" />
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={onSubmitHandler}>
          <h3>Admin Login</h3>

          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              id="password"
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
