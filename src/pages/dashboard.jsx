import { Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getUserDetails } from "../helpers/firebaseActions";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    state: "",
    pincode: "",
  });
  useEffect(() => {
    if (localStorage.getItem("authState")) {
      if (!JSON.parse(localStorage.getItem("authState"))) navigate("/");
      else {
        (async () => {
          const { email } = JSON.parse(localStorage.getItem("authState"));
          const res = await getUserDetails(email);
          setDetails(await res);
        })();
      }
    } else navigate("/");
  }, []);

  //   useEffect(() => {
  //     (async () => {
  //       const res = await getUserDetails();
  //       setDetails(await res);
  //     })();
  //   }, []);

  return (
    <div>
      <div
        style={{
          height: "12vh",
          width: "100vw",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 28 }}>Dashboard</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/");
            localStorage.clear();
          }}
        >
          Log Out
        </Button>
      </div>
      <div style={{ margin: "2vw" }}>
        Your Name: {details.name}
        <br />
        <br />
        Your Email: {details.email}
        <br />
        <br />
        Your Phone: {details.phone}
        <br />
        <br />
        Your Age: {details.age}
        <br />
        <br />
        State: {details.state}
        <br />
        <br />
        City: {details.city}
        <br />
        <br />
        Pincode: {details.pincode}
      </div>
    </div>
  );
};

export default Dashboard;
