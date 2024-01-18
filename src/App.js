import { Routes } from "react-router-dom";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Card,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";

function App() {
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
          justifyContent:'space-between'
        }}
        // sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          <div>
            <Typography variant="h6" component='div'>Expense Sharing App</Typography>
          </div>

          <Box >
            <Button variant="outlined" sx={{textTransform:'none'}} >
                Add User
            </Button>

            <Button>
                Add Payment
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <Routes/>       */}
    </ThemeProvider>
  );
}

export default App;
