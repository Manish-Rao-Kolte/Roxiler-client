import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { fetchPieChartData } from "../services/api";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const TransactionsPieChart = ({ month, months }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getPieChartData = async () => {
            const { categoryCounts } = await fetchPieChartData(month);
            setChartData(categoryCounts);
        };
        getPieChartData();
    }, [month]);

    const data = chartData
        ? {
              labels: chartData?.map(({ category }) => category),
              datasets: [
                  {
                      data: chartData?.map(({ count }) => count),
                      backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#F7464A",
                      ],
                      hoverBackgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#F7464A",
                      ],
                  },
              ],
          }
        : {};

    return (
        <Box
            style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                flexBasis: "30%",
                // maxHeight: "40vh",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Pie chart Stats - {months[month - 1]}
            </Typography>
            <Pie
                style={{ maxHeight: "40vh" }}
                data={data}
                options={{ responsive: true }}
            />
        </Box>
    );
};

export default TransactionsPieChart;

