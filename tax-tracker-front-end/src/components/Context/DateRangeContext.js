import React, { createContext, useState } from "react";

export const DateRangeContext = createContext();

export const DateRangeProvider = ({ children }) => {
  const today = new Date();
  const twoMonthsAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate()
  );

  const [startDate, setStartDate] = useState(
    twoMonthsAgo.toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(today.toISOString().split("T")[0]);

  return (
    <DateRangeContext.Provider
      value={{ startDate, setStartDate, endDate, setEndDate }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};
