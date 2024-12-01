// src/components/TransactionStatistics.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { fetchStatistics } from "../services/api";

const TransactionsStatistics = ({ month, months }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalUnsoldItems: 0,
    });

    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                const { totalSoldItems, totalSaleAmount, totalUnsoldItems } =
                    await fetchStatistics(month);
                setStatistics({
                    totalSaleAmount,
                    totalSoldItems,
                    totalUnsoldItems,
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchStatisticsData();
    }, [month]);

    return (
        <Box
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flexBasis: "30%",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Statistics - {months[month - 1]}
            </Typography>
            <Paper
                style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Typography>
                    Total Sales: ${statistics.totalSaleAmount}
                </Typography>
                <Typography>
                    Total Sold Items: {statistics.totalSoldItems}
                </Typography>
                <Typography>
                    Total Unsold Items: {statistics.totalUnsoldItems}
                </Typography>
            </Paper>
        </Box>
    );
};

export default TransactionsStatistics;

