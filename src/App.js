import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import AddUser from "components/AddUser/Add-User";

// Icons
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dashboard from "components/Dashboard";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const createDarkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={createDarkTheme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography variant="h6" component="div">
              Expense Sharing App
            </Typography>
          </div>

          <Box>
            {["/add-payment", "/add-user"].includes(location.pathname) ? (
              <Button
                sx={{ marginLeft: 2, marginRight: 2, textTransform: "none" }}
                variant="contained"
                color="secondary"
                onClick={() => navigate(-1)}
                startIcon={<ArrowBackIcon />}
              >
                Go Back
              </Button>
            ) : (
              <>
                <Button
                  sx={{ marginLeft: 2, marginRight: 2, textTransform: "none" }}
                  variant="outlined"
                  color="warning"
                  onClick={() => navigate("/add-user")}
                  startIcon={<PersonAddIcon />}
                >
                  Add User
                </Button>
                <Button
                  sx={{ marginLeft: 2, marginRight: 2, textTransform: "none" }}
                  variant="outlined"
                  color="success"
                  onClick={() => navigate("/add-payment")}
                  startIcon={<AddBusinessIcon />}
                >
                  Add Payment
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
