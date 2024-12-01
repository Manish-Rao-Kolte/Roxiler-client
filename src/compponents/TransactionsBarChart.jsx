// src/components/TransactionBarChart.jsx
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Box, Paper, Typography } from "@mui/material";
import { fetchBarChartData } from "../services/api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

const TransactionsBarChart = ({ month, months }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const { rangeCounts } = await fetchBarChartData(month);
                const formattedData = {
                    labels: rangeCounts?.map(({ range }) => range),
                    datasets: [
                        {
                            label: "Items Sold",
                            data: rangeCounts?.map(({ count }) => count),
                            borderRadius: 2,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                        },
                    ],
                };
                setChartData(formattedData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchChartData();
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
                Bar chart Stats - {months[month - 1]}
            </Typography>
            <Paper style={{ padding: "20px", marginTop: "20px" }}>
                {chartData.labels && (
                    <Bar
                        style={{ flex: 1 }}
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Sales by Price Range",
                                },
                            },
                        }}
                    />
                )}
            </Paper>
        </Box>
    );
};

export default TransactionsBarChart;

