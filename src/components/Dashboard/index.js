import { Box, IconButton, Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getLocal } from "hooks/localStorage";
import { USER_KEY } from "config";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const userArray = getLocal(USER_KEY);

  const handleEditUser = (id) => {
    toast.error("Under Processing...");
  };

  const handleDeleteUser = (id) => {
    toast.success("User Deleted Successfully");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h5"
          textAlign={"center"}
          sx={{ padding: 2, fontWeight: "bolder" }}
        >
          User List
        </Typography>

        {userArray.length === 0 ? (
          <>
            <Typography textAlign={'center'}>Not yet user created</Typography>
          </>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>S.No</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>User ID</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    User Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    User Email
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    User Number
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userArray.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1 ?? "-"}</TableCell>
                    <TableCell>{user.userId ?? "-"}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.userEmail ?? "-"}</TableCell>
                    <TableCell>{user.userNumber ?? "-"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="success"
                        onClick={() => handleEditUser(user.userId)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteUser(user.userId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;
