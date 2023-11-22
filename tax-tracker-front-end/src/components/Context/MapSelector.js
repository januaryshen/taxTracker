import React, { useContext, useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { MileageContext } from "./MileageContext";
import { calculateMidpoint, retroStyle, getCenter } from "./mapUtils";
import { handlePlacesChanged } from "./markerHandlers";
import "./MapSelector.css";

const MapSelector = ({ selectedMileage }) => {
  const { locations, setDeparture, setArrival } = useContext(MileageContext);
  const [mapRef, setMapRef] = useState(null);
  const [markers, setMarkers] = useState({});
  const departureSearchBoxRef = useRef(null);
  const arrivalSearchBoxRef = useRef(null);

  console.log("MapSelector", locations, markers, selectedMileage, mapRef);

  useEffect(() => {
    if (locations.departure && locations.departure.updated) {
      setMarkers((prev) => ({ ...prev, departure: locations.departure }));
    }
    if (locations.arrival && locations.arrival.updated) {
      setMarkers((prev) => ({ ...prev, arrival: locations.arrival }));
    }
  }, [locations]);

  useEffect(() => {
    // Set initial markers based on selected mileage entry
    if (selectedMileage) {
      setMarkers({
        departure: {
          lat: selectedMileage.departure_lat,
          lng: selectedMileage.departure_lng,
          address: selectedMileage.departure_location,
        },
        arrival: {
          lat: selectedMileage.arrival_lat,
          lng: selectedMileage.arrival_lng,
          address: selectedMileage.arrival_location,
        },
      });
    }
  }, [selectedMileage]);

  useEffect(() => {
    if (mapRef && markers.departure && markers.arrival) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          markers.departure.lat,
          markers.departure.lng
        )
      );
      bounds.extend(
        new window.google.maps.LatLng(markers.arrival.lat, markers.arrival.lng)
      );
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, markers]);

  const renderSearchBox = (ref, placeholder, onPlacesChanged) => (
    <StandaloneSearchBox
      onLoad={(searchBox) => (ref.current = searchBox)}
      onPlacesChanged={onPlacesChanged}
    >
      <input
        type="text"
        placeholder={placeholder}
        style={{ width: "240px", height: "32px" }}
      />
    </StandaloneSearchBox>
  );

  const mapOptions = {
    styles: retroStyle, 
    mapTypeControl: false, // Add this line to hide map type control buttons
    streetViewControl: false, // Hide Street View control
    fullscreenControl: false, // Hide fullscreen control
    keyboardShortcuts: false,    
  };

  const mapContainerStyle = {
    height: "40vh",
    width: "80vw",
  };

  const center = getCenter(selectedMileage);

  return (
    <div className="map-selector-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        options={mapOptions}
        center={center}
        zoom={12}
        onLoad={(map) => setMapRef(map)}
      >
        <div className="search-box" style={{ top: "10px" }}>
          {renderSearchBox(
            departureSearchBoxRef,
            "Enter departure location",
            () => handlePlacesChanged(departureSearchBoxRef, true)
          )}
        </div>
        <div className="search-box" style={{ top: "50px" }}>
          {renderSearchBox(arrivalSearchBoxRef, "Enter arrival location", () =>
            handlePlacesChanged(arrivalSearchBoxRef, false)
          )}
        </div>
        {markers.departure && <Marker position={markers.departure} />}
        {markers.arrival && <Marker position={markers.arrival} />}
      </GoogleMap>
    </div>
  );
};

export default MapSelector;
