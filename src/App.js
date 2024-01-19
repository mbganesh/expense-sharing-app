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
import { getLocal } from "hooks/localStorage";
import { USER_KEY } from "config";
import toast from "react-hot-toast";
import AddExpense from "components/AddExpense/Add-Expense";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const createDarkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const handleExpenseBtn = () => {
    if(getLocal(USER_KEY).length === 0){
      toast.error('Please add user details');
      return
    }
    navigate("/add-expense")
  }

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
            {["/add-expense", "/add-user"].includes(location.pathname) ? (
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
                  onClick={() => handleExpenseBtn()}
                  startIcon={<AddBusinessIcon />}
                >
                  Add Expense
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-expense" element={<AddExpense />} />
      </Routes>
    </ThemeProvider>
  );
}

/**
 * Ref Link:
 * https://lldcoding.com/design-lld-splitwise-application-machine-coding
 * 
 * https://workat.tech/machine-coding/editorial/how-to-design-splitwise-machine-coding-ayvnfo1tfst6
 * 
 * 
 * https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2 (only qn)



*/

export default App;
