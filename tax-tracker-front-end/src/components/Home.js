import React, { useContext } from "react";
import MainPagePhoto from "../Images/Subject.png";
import { DateRangeContext } from "./Context/DateRangeContext";
import DateRangeSelector from "./Context/DateRangeSelector";
import "./Home.css";

const Home = () => {
  const { startDate, endDate } = useContext(DateRangeContext);

  const fetchMileageData = async () => {
    const mileageResponse = await fetch(
      `http://127.0.0.1:8000/api/mileage/?start_date=${startDate}&end_date=${endDate}`
    );
    const mileageData = await mileageResponse.json();
    return { mileageData };
  };

  const fetchExpenseData = async () => {
    const expensesResponse = await fetch(
      `http://127.0.0.1:8000/api/expenses/?start_date=${startDate}&end_date=${endDate}`
    );
    const expensesData = await expensesResponse.json();
    return { expensesData };
  };

  const convertToCSV = (data, headers) => {
    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += headers.map((header) => `"${header}"`).join(",") + "\n";

    // Add data rows
    data.forEach((row) => {
      const rowData = headers
        .map((header) => `"${row[header] || ""}"`)
        .join(",");
      csvContent += rowData + "\n";
    });

    return encodeURI(csvContent);
  };

  const handleDownloadMileage = async () => {
    const { mileageData } = await fetchMileageData();
    console.log(mileageData);
    const headers = [
      "id",
      "date",
      "departure_location",
      "arrival_location",
      "mileage",
    ];
    const csvContent = convertToCSV(mileageData, headers);
    downloadCSV(csvContent, "mileage_data.csv");
  };

  const handleDownloadExpenses = async () => {
    const { expensesData } = await fetchExpenseData();
    const headers = ["id", "date", "description", "amount"];
    const csvContent = convertToCSV(expensesData, headers);
    downloadCSV(csvContent, "expenses_data.csv");
  };

  const downloadCSV = (csvContent, filename) => {
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-container">
      <h1>紀錄工作的開支，省點稅</h1>
      <p>No tax is good tax.</p>
      <DateRangeSelector />
      <div>
        <button onClick={handleDownloadMileage}>Download Mileage CSV</button>
        <button onClick={handleDownloadExpenses}>Download Expenses CSV</button>
      </div>

      <img src={MainPagePhoto} alt=":)" />
    </div>
  );
};

export default Home;
