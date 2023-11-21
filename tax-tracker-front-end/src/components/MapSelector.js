import React, {
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { MileageContext } from "./MileageContext";

const libraries = ["places"];

const MapSelector = () => {
  const { setDeparture, setArrival } = useContext(MileageContext);
  const [mapRef, setMapRef] = useState(null);
  const departureSearchBoxRef = useRef(null); // Corrected to useRef
  const arrivalSearchBoxRef = useRef(null); // Corrected to useRef
  const [departureMarker, setDepartureMarker] = useState(null);
  const [arrivalMarker, setArrivalMarker] = useState(null);

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  const center = { lat: 47.6101, lng: -122.2015 }; // Default center (Bellevue, WA)

  const handlePlacesChanged = (searchBoxRef, isDeparture) => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address // Getting the address string
        };

        mapRef.panTo(new window.google.maps.LatLng(location.lat, location.lng));

        if (isDeparture) {
          setDeparture(location);
          setDepartureMarker(location);
        } else {
          setArrival(location);
          setArrivalMarker(location);
        }
      }
    }
  };

  const updateBounds = useCallback(() => {
    if (mapRef && (departureMarker || arrivalMarker)) {
      const bounds = new window.google.maps.LatLngBounds();
      if (departureMarker) {
        bounds.extend(
          new window.google.maps.LatLng(
            departureMarker.lat,
            departureMarker.lng
          )
        );
      }
      if (arrivalMarker) {
        bounds.extend(
          new window.google.maps.LatLng(arrivalMarker.lat, arrivalMarker.lng)
        );
      }
      mapRef.fitBounds(bounds);
    }
  }, [mapRef, departureMarker, arrivalMarker]);

  useEffect(() => {
    updateBounds();
  }, [updateBounds]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => setMapRef(map)}
      >
        {/* Departure Search Box */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (departureSearchBoxRef.current = ref)}
            onPlacesChanged={() =>
              handlePlacesChanged(departureSearchBoxRef, true)
            }
          >
            <input
              type="text"
              placeholder="Enter departure location"
              style={{ width: "240px", height: "32px" }}
            />
          </StandaloneSearchBox>
        </div>

        {/* Arrival Search Box */}
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (arrivalSearchBoxRef.current = ref)}
            onPlacesChanged={() =>
              handlePlacesChanged(arrivalSearchBoxRef, false)
            }
          >
            <input
              type="text"
              placeholder="Enter arrival location"
              style={{ width: "240px", height: "32px" }}
            />
          </StandaloneSearchBox>
        </div>

        {/* Departure Marker */}
        {departureMarker && (
          <Marker
            position={{ lat: departureMarker.lat, lng: departureMarker.lng }}
          />
        )}

        {/* Arrival Marker */}
        {arrivalMarker && (
          <Marker
            position={{ lat: arrivalMarker.lat, lng: arrivalMarker.lng }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapSelector;
