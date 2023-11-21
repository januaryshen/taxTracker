import React, { useContext, useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { MileageContext } from "./MileageContext";
import "./MapSelector.css";

const MapSelector = ({ selectedMileage }) => {
  const { setDeparture, setArrival } = useContext(MileageContext);
  const [mapRef, setMapRef] = useState(null);
  const [markers, setMarkers] = useState({});
  const departureSearchBoxRef = useRef(null);
  const arrivalSearchBoxRef = useRef(null);

  const calculateMidpoint = (lat1, lng1, lat2, lng2) => {
    return {
      lat: (lat1 + lat2) / 2,
      lng: (lng1 + lng2) / 2,
    };
  };

  useEffect(() => {
    // Set initial markers based on selected mileage entry
    if (selectedMileage) {
      setMarkers({
        departure: {
          lat: selectedMileage.departure_lat,
          lng: selectedMileage.departure_lng,
          address: selectedMileage.departure_location
        },
        arrival: {
          lat: selectedMileage.arrival_lat,
          lng: selectedMileage.arrival_lng,
          address: selectedMileage.arrival_location
        }
      });
    }
  }, [selectedMileage]);

  useEffect(() => {
    if (mapRef && markers.departure && markers.arrival) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(markers.departure.lat, markers.departure.lng));
      bounds.extend(new window.google.maps.LatLng(markers.arrival.lat, markers.arrival.lng));
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, markers]);

  const mapContainerStyle = {
    height: "40vh",
    width: "90vw",
  };

  let center = { lat: 47.6101, lng: -122.2015 }; // Default center (Bellevue, WA)
  if (selectedMileage && selectedMileage.departure_lat && selectedMileage.arrival_lat) {
    center = calculateMidpoint(
      selectedMileage.departure_lat, 
      selectedMileage.departure_lng, 
      selectedMileage.arrival_lat, 
      selectedMileage.arrival_lng
    );
  }

  const handlePlacesChanged = (searchBoxRef, isDeparture) => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address
      };

      mapRef.panTo(new window.google.maps.LatLng(location.lat, location.lng));
      updateMarker(location, isDeparture);
      
      // Update context with new location data
      if (isDeparture) {
        setDeparture(location);
      } else {
        setArrival(location);
      }
    }
  };

  const updateMarker = (location, isDeparture) => {
    setMarkers(prevMarkers => ({
      ...prevMarkers,
      [isDeparture ? 'departure' : 'arrival']: location
    }));
  };

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

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={map => setMapRef(map)}
      >
        <div className="search-box" style={{ top: "10px" }}>
          {renderSearchBox(
            departureSearchBoxRef,
            "Enter departure location",
            () => handlePlacesChanged(departureSearchBoxRef, true)
          )}
        </div>
        <div className="search-box" style={{ top: "50px" }}>
          {renderSearchBox(
            arrivalSearchBoxRef,
            "Enter arrival location",
            () => handlePlacesChanged(arrivalSearchBoxRef, false)
          )}
        </div>
        {markers.departure && <Marker position={markers.departure} />}
        {markers.arrival && <Marker position={markers.arrival} />}
      </GoogleMap>
    </div>
  );
};

export default MapSelector;
