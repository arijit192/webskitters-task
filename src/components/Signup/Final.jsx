import { TextField, FormLabel, Button } from "@mui/material";
import { findEmail, createUser } from "../../helpers/firebaseActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Final = ({ userDetails, handleCurrent }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const submitHandler = async () => {
    await createUser(userDetails, password);
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    findEmail("tukaiari@gmail.com");
  }, []);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ margin: "2vw" }}>
        <FormLabel>Password</FormLabel>
        <br />
        <TextField
          placeholder="Enter password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            handleCurrent("");
          }}
        >
          Back
        </Button>
        <Button
          onClick={submitHandler}
          variant="contained"
          sx={{ marginLeft: 5 }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Final;
