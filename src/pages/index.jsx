import { Box } from "@mui/material";
import Login from "../components/Login";

const Index = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login />
    </Box>
  );
};

export default Index;
