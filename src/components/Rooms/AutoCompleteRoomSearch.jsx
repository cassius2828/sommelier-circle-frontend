import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const AutoCompleteRoomSearch = () => {
    const [input,setInput] = useState(null)
  const handleSelect = (place) => {
    console.log(place); // The selected place object
  };
  const countryCode = sessionStorage.getItem("countryCode");

  return (
    <GooglePlacesAutocomplete
      apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
      selectProps={{
        onChange: handleSelect,
        inputValue:input,
        placeholder: "Search for wine places...",
        types: ["establishment"],
        componentRestrictions: { country: countryCode },
        additionalOptions: {
          keyword: "wine",
        },
      }}
    />

  );
};

export default AutoCompleteRoomSearch;
