// src/components/TransactionsTable.jsx
import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
} from "@mui/material";
import { fetchTransactions } from "../services/api";

const initialPaginationData = {
    currentPage: 1,
    totalPages: 1,
    perPage: 10,
    totalRecords: 0,
};
const TransactionsTable = ({ month, setMonth, months }) => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(initialPaginationData);

    useEffect(() => {
        // Fetch transactions when the component mounts or when month/page changes
        const fetchTransactionData = async () => {
            try {
                const { transactions, pagination } = await fetchTransactions(
                    month,
                    search,
                    page,
                );
                setPagination(pagination);
                setTransactions(transactions);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTransactionData();
    }, [month, page, search]);

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < pagination.totalPages) setPage(page + 1);
    };

    return (
        <div
            style={{
                maxWidth: "100%",
            }}
        >
            <FormControl fullWidth style={{ width: "100%" }}>
                <InputLabel
                    style={{ backgroundColor: "#f5f5f5", padding: "0 3px" }}
                >
                    Month
                </InputLabel>
                <Select value={month} onChange={handleMonthChange}>
                    {months.map((month, index) => (
                        <MenuItem key={month} value={index + 1}>
                            {month}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={search}
                onChange={handleSearchChange}
                style={{ width: "100%", marginTop: "10px" }}
            />

            <TableContainer
                component={Paper}
                style={{
                    width: "100%",
                    marginTop: "30px",
                }}
            >
                <Table
                    style={{
                        maxWidth: "100vw",
                        overflowX: "scroll",
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Sold</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length ? (
                            transactions.map((transaction, index) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell
                                        style={{
                                            maxWidth: "150px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {transaction.title}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            maxWidth: "400px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {transaction.description}
                                    </TableCell>
                                    <TableCell>{transaction.price}</TableCell>
                                    <TableCell>
                                        {transaction.category}
                                    </TableCell>
                                    <TableCell>{`${
                                        transaction.sold ? "Yes" : "No"
                                    }`}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    No transactions found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ marginTop: "20px" }}>
                <Button onClick={handlePrevPage} disabled={page === 1}>
                    Previous
                </Button>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
        </div>
    );
};

export default TransactionsTable;

