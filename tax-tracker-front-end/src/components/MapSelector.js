// src/components/MapSelector.js
import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const MapSelector = ({ onLocationsSelected }) => {
    const [markers, setMarkers] = useState([]);
    const searchBoxRef = useRef();

    const mapContainerStyle = {
        height: "400px",
        width: "800px"
    };

    const center = { lat: 47.6101, lng: -122.2015 }; // Bellevue, WA

    const onMapClick = useCallback((event) => {
        const newMarkers = [
            { lat: event.latLng.lat(), lng: event.latLng.lng() }
        ];
        setMarkers(newMarkers);
        onLocationsSelected(newMarkers[0]);
    }, [onLocationsSelected]);

    const onLoad = useCallback((ref) => {
        searchBoxRef.current = ref;
    }, []);

    const onPlacesChanged = () => {
        const places = searchBoxRef.current.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();

        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        const nextMarkers = places.map(place => ({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }));

        if (nextMarkers.length > 0) {
            setMarkers(nextMarkers);
            onLocationsSelected(nextMarkers[0]);
        }
    };

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                onClick={onMapClick}
            >
                <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search Google Maps"
                        style={{ boxSizing: `border-box`, border: `1px solid transparent`, width: `240px`, height: `32px`, padding: `0 12px`, borderRadius: `3px`, boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`, fontSize: `14px`, outline: `none`, textOverflow: `ellipses`, position: "absolute", top: "10px", left: "50%", marginLeft: "-120px" }}
                    />
                </StandaloneSearchBox>
                {markers.map((marker, idx) => (
                    <Marker key={idx} position={{ lat: marker.lat, lng: marker.lng }} />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapSelector;
