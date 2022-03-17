import { Box, TextField, FormLabel, Typography, Button } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { findEmail, getUserDetails } from "../helpers/firebaseActions";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { email, password } = values;
      const res = await findEmail(email);
      if (await res) {
        const { passwordHash } = await getUserDetails(email);
        bcrypt.compare(password, await passwordHash, (err, result) => {
          if (result) {
            localStorage.setItem(
              "authState",
              JSON.stringify({
                auth: true,
                email: email,
              })
            );
            navigate("/dashboard");
          } else {
            setError("wrong password entered");
          }
        });
      } else {
        setError("User does not exists");
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "50vh",
        width: "30vw",
        alignItems: "center",
        borderRadius: "15px",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2);",
      }}
    >
      <form style={{ width: "90%" }} onSubmit={formik.handleSubmit}>
        <div
          style={{
            height: "40%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "2vh",
          }}
        >
          <div style={{ width: "90%", marginTop: "1vh" }}>
            <FormLabel>Email</FormLabel>
            <br />
            <TextField
              placeholder="Email"
              type="email"
              fullWidth
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
            />
          </div>
          <div style={{ width: "90%", marginTop: "1vh" }}>
            <FormLabel>Password</FormLabel>
            <br />
            <TextField
              placeholder="Password"
              type="password"
              fullWidth
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
            />
          </div>
          <NavLink
            to="/signup"
            style={{ width: "90%", textDecoration: "none" }}
          >
            <Typography sx={{ marginTop: "1vh" }}>
              New user? Sign up first !
            </Typography>
          </NavLink>
          <div style={{ width: "90%", marginTop: "1vh" }}>
            {error && <Typography color="red">{error}</Typography>}
          </div>
          <Button variant="contained" sx={{ marginTop: "1vh" }} type="submit">
            Login
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default Login;
