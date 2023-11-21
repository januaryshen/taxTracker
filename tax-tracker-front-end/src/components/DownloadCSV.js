import React, { useContext } from "react";
import DateRangeSelector from "./Context/DateRangeSelector";
import ParticlesComponent from "./ParticlesComponent";
import { DateRangeContext } from "./Context/DateRangeContext";
import "./DownloadCSV.css";

const DownloadCSV = () => {
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
    const headers = [
      "id",
      "user",
      "date",
      "departure_location",
      "arrival_location",
      "mileage",
      "departure_lat",
      "departure_lng",
      "arrival_lat",
      "arrival_lng"
    ];
    const csvContent = convertToCSV(mileageData, headers);
    downloadCSV(csvContent, "mileage_data.csv");
  };

  const handleDownloadExpenses = async () => {
    const { expensesData } = await fetchExpenseData();
    const headers = ["id","user", "date", "description", "amount"];
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
    <div className="background">
      <ParticlesComponent />
      <div className="csv-container">
        <h1>新の工作相關支出</h1>
        <p>No tax is good tax.</p>
        <DateRangeSelector />
        <div>
          <button onClick={handleDownloadMileage}>Download Mileage CSV</button>
          <button onClick={handleDownloadExpenses}>
            Download Expenses CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadCSV;
