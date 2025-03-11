import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4"
    style={{color:'#ffffff', background: "radial-gradient(circle at top left,rgb(54, 28, 28), #000000)",}}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6 white">Page Not Found</p>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default NotFound;
