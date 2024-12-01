import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const fetchTransactions = async (month, search = '', page = 1) => {
 try {
   const response = await axios.get(`${BASE_URL}?month=${month}&search=${search}&page=${page}`, {
     headers: {
       'Content-Type': 'application/json',
     },
   });
  //  console.log(response?.data);
   return response.data;
 } catch (error) {
   console.error("Error fetching transactions:", error?.message);
 }
};

export const fetchStatistics = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/statistics?month=${month}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};


export const fetchBarChartData = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/bar-chart?month=${month}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
  }
};

export const fetchPieChartData = async (month) => {
  try {
    const response = await axios.get(`${BASE_URL}/pie-chart?month=${month}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response?.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
  }
};


