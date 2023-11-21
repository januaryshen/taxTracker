import React, { useState } from "react";
import AddMileage from "./AddMileage";
import ListMileage from "./ListMileage"
import "./Mileage.css"

const Mileage = () => {
    const [isAdd, setIsAdd] = useState(true);
    return (
        <>
          <div className="mileage-container">
            <button
              className={`button ${isAdd ? "active" : ""}`}
              onClick={() => setIsAdd(true)}
            >
              Add Mileage
            </button>
            <button
              className={`button ${!isAdd ? "active" : ""}`}
              onClick={() => setIsAdd(false)}
            >
              List Mileage
            </button>
          </div>
          {isAdd ? <AddMileage /> : <ListMileage />}
        </>
      );
}

export default Mileage;
