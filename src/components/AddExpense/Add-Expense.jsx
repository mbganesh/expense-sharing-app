import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { USER_KEY } from "config";
import { PAYMENT_KEY } from "config";
import { getLocal, setLocal } from "hooks/localStorage";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NumberFormatBase } from "react-number-format";
import { useNavigate } from "react-router-dom";
import useSplitType from "store/expenseTypeStore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const splitId = `EXPENSE_${Math.floor(Math.random() * 10000)}`;

const defaultValues = {
  splitId,
  title: "",
  description: "",
  paidBy: "",
  amount: "",
  type: "EQUAL",
  sharedWith: [],
};
const AddExpense = () => {
  const navigate = useNavigate();
  const userList = getLocal(USER_KEY);
  const { splitType } = useSplitType();
  const { control, handleSubmit, setError, reset, getValues } = useForm({
    reValidateMode: "onChange",
    defaultValues,
  });

  const handleOnSubmit = ({
    splitId,
    title,
    description,
    paidBy,
    amount,
    type,
    sharedWith,
  }) => {
    console.log({
      splitId,
      title,
      description,
      paidBy,
      amount,
      type,
      sharedWith,
    });
    if (!title) {
      setError("title", {
        type: "custom",
        message: "Please enter title",
      });
      return;
    }
    if (!description) {
      setError("description", {
        type: "custom",
        message: "Please enter description",
      });
      return;
    }
    if (!paidBy) {
      setError("paidBy", {
        type: "custom",
        message: "Please select a user",
      });
      return;
    }
    if (!amount) {
      setError("amount", {
        type: "custom",
        message: "Please enter amount",
      });
      return;
    }
    if (sharedWith.length === 0) {
      toast.error("Please select at least one user to contribute");
      return;
    }

    let sharedAmount = (Number(amount) / sharedWith.length).toFixed(2);
    let obj = {
      splitId,
      title,
      description,
      paidBy,
      amount,
      type,
      sharedWith,
      sharedAmount,
    };
    let restData = getLocal(PAYMENT_KEY);
    restData.push(obj);
    setLocal(PAYMENT_KEY, restData);
    toast.success("Expense Added Successfully");
    setTimeout(() => {
      navigate(-1);
    }, 800);
    reset(defaultValues);
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
            Add Expense
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", margin: "auto" }}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Controller
              name={"title"}
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
                  label={"Title"}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name={"description"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  fullWidth
                  helperText={error ? error.message : null}
                  size="small"
                  multiline
                  rows={3}
                  sx={{ margin: "5px" }}
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  label={"Description"}
                  variant="outlined"
                />
              )}
            />

            <Controller
              name={"paidBy"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  select
                  fullWidth
                  value={value}
                  onChange={onChange}
                  label="Paid By"
                  helperText={error ? error.message : null}
                  sx={{ margin: "5px" }}
                  error={!!error}
                  size="small"
                >
                  {userList.map((user) => (
                    <MenuItem key={user.userName} value={user.userName}>
                      {user.userName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name={"amount"}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <NumberFormatBase
                  fullWidth
                  customInput={TextField}
                  thousandSeparator={true}
                  value={value}
                  name="amount"
                  label="Amount"
                  helperText={error ? error.message : null}
                  sx={{ margin: "5px" }}
                  error={!!error}
                  size="small"
                  onChange={onChange}
                />
              )}
            />
            <Paper
              sx={{
                padding: 2,
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <FormControl>
                <FormLabel>Split Type</FormLabel>
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      {splitType.map((type) => (
                        <FormControlLabel
                          value={type}
                          control={<Radio />}
                          label={type}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Shared With</FormLabel>
                <Controller
                  name="sharedWith"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) =>
                    userList.map(({ userId, userName }) => (
                      <FormControlLabel
                        id={userId}
                        key={userName}
                        control={
                          <Checkbox
                            {...field}
                            value={userName}
                            checked={field.value.includes(userName)}
                            onChange={(e) => {
                              const selectedTags = field.value.slice();
                              if (e.target.checked) {
                                selectedTags.push(userName);
                              } else {
                                const index = selectedTags.indexOf(userName);
                                if (index !== -1) {
                                  selectedTags.splice(index, 1);
                                }
                              }
                              field.onChange(selectedTags);
                            }}
                            color="primary"
                          />
                        }
                        label={userName}
                      />
                    ))
                  }
                />
              </FormControl>
            </Paper>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                margin: "5px",
              }}
            >
              {/* <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ textTransform: "none" }}
                onClick={() => handleCancelBtn()}
              >
                Cancel
              </Button> */}

              <Button
                variant="contained"
                color="success"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ textTransform: "none", marginTop: "5px" }}
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

export default AddExpense;
