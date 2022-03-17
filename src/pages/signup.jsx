import { useState, useEffect } from "react";
import BasicDetails from "../components/Signup/BasicDetail";
import Address from "../components/Signup/Address";
import Final from "../components/Signup/Final";
import { Typography } from "@mui/material";

const SignUp = () => {
  const [current, setCurrent] = useState(0);
  const [userDetails, setUserDetails] = useState(() => {
    if (localStorage.getItem("formdata")) {
      return JSON.parse(localStorage.getItem("formdata"));
    } else
      return {
        name: "",
        email: "",
        phone: "",
        age: "",
        state: "",
        city: "",
        pincode: "",
      };
  });
  const handleCurrent = (type) => {
    if (type === "increment") {
      if (current < 2) setCurrent(current + 1);
    } else {
      if (current > 0) setCurrent(current - 1);
    }
  };
  useEffect(() => {
    localStorage.setItem("formdata", JSON.stringify(userDetails));
  }, [userDetails]);
  const updateInfos = (data) => {
    setUserDetails({ ...userDetails, ...data });
  };
  const steps = [
    <BasicDetails
      {...userDetails}
      updateInfos={updateInfos}
      handleCurrent={handleCurrent}
    />,
    <Address
      {...userDetails}
      updateInfos={updateInfos}
      handleCurrent={handleCurrent}
    />,
    <Final
      userDetails={userDetails}
      updateInfos={updateInfos}
      handleCurrent={handleCurrent}
    />,
  ];
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "15vh",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background:
              current === 0 ? "#6ccaff" : current > 0 ? "#b8ff6c" : "#fff",
            flex: 1,
            cursor: "pointer",
            transition: "background .5s",
            borderRadius: "9px",
          }}
          onClick={() => setCurrent(0)}
        >
          <Typography align="center">Basic Details</Typography>
        </div>
        <div style={{ height: "3px", background: "grey", flex: 3 }}></div>
        <div
          style={{
            background:
              current === 1 ? "#6ccaff" : current > 1 ? "#b8ff6c" : "#fff",
            flex: 1,
            cursor: "pointer",
            transition: "background .5s",
            borderRadius: "9px",
          }}
          onClick={() => setCurrent(1)}
        >
          <Typography align="center">Address</Typography>
        </div>
        <div style={{ height: "3px", background: "grey", flex: 3 }}></div>
        <div
          style={{
            background:
              current === 2 ? "#6ccaff" : current > 2 ? "#b8ff6c" : "#fff",
            flex: 1,
            cursor: "pointer",
            transition: "background .5s",
            borderRadius: "9px",
          }}
          onClick={() => setCurrent(2)}
        >
          <Typography align="center">Final</Typography>
        </div>
      </div>
      {steps[current]}
    </div>
  );
};

export default SignUp;
