import React, { useContext, useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { MileageContext } from "./MileageContext";
import { retroStyle, getCenter } from "./mapUtils";
import "./MapSelector.css";

const MapSelector = ({ selectedMileage }) => {
  const { locations, setArrival, setDeparture } = useContext(MileageContext);
  const [mapRef, setMapRef] = useState(null);
  const [markers, setMarkers] = useState({});
  const departureSearchBoxRef = useRef(null);
  const arrivalSearchBoxRef = useRef(null);

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

  const updateMarker = (location, isDeparture) => {
    setMarkers((prevMarkers) => ({
      ...prevMarkers,
      [isDeparture ? "departure" : "arrival"]: location,
    }));
  };

  const handlePlacesChanged = (searchBoxRef, isDeparture) => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      };

      mapRef.panTo(new window.google.maps.LatLng(location.lat, location.lng));
      updateMarker(location, isDeparture);

      if (isDeparture) {
        setDeparture({ ...location, updated: true });
      } else {
        setArrival({ ...location, updated: true });
      }
    }
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
