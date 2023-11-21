import React, { createContext, useState } from 'react';

export const MileageContext = createContext();

export const MileageProvider = ({ children }) => {
    const [locations, setLocations] = useState({
        departure: null,
        arrival: null
    });

    const setDeparture = (location) => {
        setLocations(prev => ({ ...prev, departure: location }));
    };

    const setArrival = (location) => {
        setLocations(prev => ({ ...prev, arrival: location }));
    };

    return (
        <MileageContext.Provider value={{ locations, setDeparture, setArrival }}>
            {children}
        </MileageContext.Provider>
    );
};
