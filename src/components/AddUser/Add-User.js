import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";
import { getLocal, setLocal } from "hooks/localStorage";
import { USER_KEY } from "config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const userId = `USER_${Math.floor(Math.random() * 10000)}`;

const defaultValues = {
  userId,
  userName: "",
  userEmail: "",
  userNumber: "",
};
const AddUser = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setError, reset } = useForm({
    reValidateMode: "onChange",
    defaultValues,
  });

  const handleOnSubmit = ({ userName, userNumber, userId, userEmail }) => {
    if (!userName) {
      setError("userName", {
        type: "custom",
        message: "Please enter user name",
      });
      return;
    }

    if (!userEmail) {
      setError("userEmail", {
        type: "custom",
        message: "Please enter user email",
      });
      return;
    }

    if (!userNumber) {
      setError("userNumber", {
        type: "custom",
        message: "Please enter user phone number",
      });
      return;
    }

    let obj = { userName, userNumber, userId, userEmail };

    let restData = getLocal(USER_KEY);
    restData.push(obj);
    let res = setLocal(USER_KEY, restData);
    console.log(res, "storedRes");
    toast.success("User Added Successfully");
    reset(defaultValues);
  };

  const handleCancelBtn = () => {
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          width: "70%",
          padding: "5px",
          margin: "5px",
          border: "1px solid grey",
          borderRadius: "5px",
        }}
        elevation={3}
      >
        <Box>
          <Typography
            sx={{ textAlign: "center", fontWeight: "bolder" }}
            variant="subtitle1"
          >
            {" "}
            Add User{" "}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Controller
              name={"userName"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  helperText={error ? error.message : null}
                  size="small"
                  sx={{ margin: "5px" }}
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  label={"User Name"}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name={"userEmail"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  helperText={error ? error.message : null}
                  size="small"
                  sx={{ margin: "5px" }}
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  label={"User Email ID"}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name={"userNumber"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <NumberFormatBase
                  type="tel"
                  fullWidth
                  prefix="+91"
                  customInput={TextField}
                  thousandSeparator={true}
                  value={value}
                  name="userNumber"
                  label="User Number"
                  helperText={error ? error.message : null}
                  sx={{ margin: "5px" }}
                  error={!!error}
                  size="small"
                  maxLength={10}
                  max={10}
                  onChange={onChange}
                />
              )}
            />

            <Box
              sx={{
                display: "flex",
                gap: 5,
                margin: "5px",
              }}
            >
              <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={() => handleCancelBtn()}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="success"
                fullWidth
                sx={{ textTransform: "none" }}
                type="submit"
              >
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUser;
