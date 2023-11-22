const updateMarker = (setMarkers, location, isDeparture) => {
  setMarkers((prevMarkers) => ({
    ...prevMarkers,
    [isDeparture ? "departure" : "arrival"]: location,
  }));
};

export const handlePlacesChanged = (
  searchBoxRef,
  isDeparture,
  mapRef,
  setDeparture,
  setArrival
) => {
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
