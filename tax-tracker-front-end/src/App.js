// src/App.js
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import ExpenseForm from "./components/ExpenseForm";
import MapSelector from './components/MapSelector';


function App() {
  const [jwtToken, setJwtToken] = useState(localStorage.getItem("jwtToken"));

  const handleLogin = (credentials) => {
    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        setJwtToken(data.access); // Save the JWT token in state
        localStorage.setItem("jwtToken", data.access); // Save the JWT token in local storage
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleExpenseSubmit = (expenseData) => {
    fetch("http://127.0.0.1:8000/api/expenses/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(expenseData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  // Add this function in App.js
  const handleLogout = () => {
    setJwtToken(null);
    localStorage.removeItem("jwtToken");
  };

  const handleLocationsSelected = (departure, arrival) => {
    // Prepare data for the API request
    const requestData = { departure_location: departure, arrival_location: arrival };

    // Make an API request to your 'mileage/' endpoint
    fetch('http://127.0.0.1:8000/api/mileage/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include auth token if necessary
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};

  return (
    <div className="App">
      {!jwtToken ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          <ExpenseForm onSubmit={handleExpenseSubmit} />
          <button onClick={handleLogout}>Logout</button>
          <div className="App">
            <MapSelector onLocationsSelected={handleLocationsSelected} />
        </div>
        </>
      )}
    </div>
  );
}

export default App;
