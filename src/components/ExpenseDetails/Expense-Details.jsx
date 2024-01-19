import { Box, Paper, Typography } from "@mui/material";
import { PAYMENT_KEY } from "config";
import { getLocal } from "hooks/localStorage";
import React from "react";

const ExpenseDetails = () => {
  const expenseList = getLocal(PAYMENT_KEY);
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper elevation={6} sx={{ p: 3, width: "70%" }}>
        <Typography variant="h5" sx={{ margin: 2 }}>
          Expenses
        </Typography>

        {expenseList.map(
          ({
            splitId,
            title,
            description,
            paidBy,
            amount,
            type,
            sharedWith,
            sharedAmount,
          }) => (
            <Paper
              key={splitId}
              elevation={3}
              sx={{
                p: 2,
                m: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <ExpenseTypography
                  variant="subtitle2"
                  heading="Title"
                  content={title}
                />
                <ExpenseTypography
                  variant="body2"
                  heading="Description"
                  content={description}
                />

                <Typography variant="body2">
                  Paid by <span style={{ fontWeight: "bold" }}>{paidBy}</span>
                  for {sharedWith.join(", ")}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <ExpenseTypography
                  variant="subtitle1"
                  heading="Share"
                  content={sharedAmount}
                  symbols="💲"
                />
                <ExpenseTypography
                  variant="body1"
                  heading="Total"
                  content={amount}
                  symbols="💲"
                />

                <ExpenseTypography
                  variant="subtitle1"
                  heading="Mode"
                  content={type}
                />
              </Box>
            </Paper>
          )
        )}
      </Paper>
    </Box>
  );
};

function ExpenseTypography({ variant, heading, content, symbols = "" }) {
  return (
    <Typography variant={variant}>
      <span style={{ fontWeight: "bold" }}> {heading} : </span> {symbols}{" "}
      {content}
    </Typography>
  );
}

export default ExpenseDetails;
