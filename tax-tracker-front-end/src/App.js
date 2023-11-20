import React from 'react';
import MapSelector from './components/MapSelector';
import ExpenseForm from './components/ExpenseForm';

function App() {
    const handleLocationsSelected = (departure, arrival) => {
        // Your existing logic here, for example:
        console.log("Departure:", departure, "Arrival:", arrival);
    };

    return (
        <div className="App">
            <h1>Expense Tracker</h1>
            <MapSelector onLocationsSelected={handleLocationsSelected} />
            <ExpenseForm /* ...props */ />
        </div>
    );
}

export default App;
