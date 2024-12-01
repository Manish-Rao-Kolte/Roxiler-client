import React, { useState } from "react";
import TransactionsStatistics from "../compponents/TransactionsStatistics";
import TransactionsBarChart from "../compponents/TransactionsBarChart";
import TransactionsTable from "../compponents/TransactionsTable";
import { Container, Grid2 } from "@mui/material";
import TransactionsPieChart from "../compponents/TransactionsPieChart";

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Dashboard = () => {
    const [month, setMonth] = useState(3);

    return (
        <Container
            style={{
                backgroundColor: "#f5f5f5",
                padding: "8vh 3vw",
                width: "100%",
                flex: 1,
                maxWidth: "100%",
            }}
        >
            <Grid2
                // container
                // spacing={4}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <Grid2 style={{ width: "100%" }}>
                    <TransactionsTable
                        month={month}
                        setMonth={setMonth}
                        months={months}
                    />
                </Grid2>
                <Grid2
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        flex: 1,
                        gap: "2rem",
                    }}
                >
                    <TransactionsStatistics month={month} months={months} />
                    <TransactionsBarChart month={month} months={months} />
                    <TransactionsPieChart month={month} months={months} />
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default Dashboard;

