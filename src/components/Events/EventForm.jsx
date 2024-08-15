// ? If mobile then break into multiple steps, desktop allow all info to be seen and entered
// ? at once
// *BASIC
// photo
// name
// description
// *LOCATION
// street address
// city
// state
// *EVENT TIME
// date
// start time
// end time
// *CONTACT
// contact (prefilled with info set in user profile)
// - email
// -phone
// *EXTRA
// ticketed event (Bool)
// google maps address link (i will set this up with info given from location details)

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const states = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
  { code: "DC", name: "District of Columbia" },
  { code: "AS", name: "American Samoa" },
  { code: "GU", name: "Guam" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "PR", name: "Puerto Rico" },
  { code: "VI", name: "U.S. Virgin Islands" },
];
const initialFormData = {
  // Basic Info
  photo: null,
  eventName: "",
  eventDescription: "",

  // Location
  streetAddress: "",
  city: "",
  state: "",

  // Event Time
  date: "",
  startTimeHour: "",
  startTimeMinute: "",
  startTimeTod: "AM",
  endTimeHour: "",
  endTimeMinute: "",
  endTimeTod: "AM",

  // Contact
  contactEmail: "", // Prefill this from user profile if available
  contactPhone: "", // Prefill this from user profile if available

  // Extra
  ticketedEvent: false,
};
const timeOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const minuteOptions = Array.from({ length: 4 }, (_, i) => i * 15);
const todOptions = ["AM", "PM"];

export const EventForm = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const {
    photo,
    eventName,
    eventDescription,
    streetAddress,
    city,
    state,
    date,
    startTimeHour,
    startTimeMinute,
    startTimeTod,
    endTimeHour,
    endTimeMinute,
    endTimeTod,
    contactEmail,
    contactPhone,
    ticketedEvent,
  } = formData;

  const navigate = useNavigate();

  ///////////////////////////
  //   Navigate Form
  ///////////////////////////
  const handleNavigateForm = (e, direction) => {
    e.preventDefault();
    if (
      direction === "next" &&
      eventName &&
      eventDescription &&
      streetAddress &&
      city &&
      state
    ) {
      setFormStep(2);
    } else if (direction === "prev") {
      setFormStep(1);
    } else {
      alert("unable to navigate form. Check if all fields are entered");
    }
  };

  ///////////////////////////
  // Handle Change
  ///////////////////////////
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  ///////////////////////////
  //   Create New Event Post
  ///////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <h2 className="text-gray-100 text-4xl mb-12">{formStep}/2</h2>
      <form className="space-y-8 p-6 bg-gray-800 rounded-lg w-full md:w-1/2">
        {formStep === 1 ? (
          <>
            <div className="flex items-start justify-around gap-20">
              {/* General Info */}
              <div className="w-1/2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  General Info
                </h3>
                <div className="mb-4">
                  <label htmlFor="photo" className="block text-gray-100 mb-2">
                    Photo
                  </label>
                  <input
                    value={photo}
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-100 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="eventName"
                    className="block text-gray-100 mb-2"
                  >
                    Event Name
                  </label>
                  <input
                    required
                    type="text"
                    name="eventName"
                    id="eventName"
                    value={eventName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="eventDescription"
                    className="block text-gray-100 mb-2"
                  >
                    Event Description
                  </label>
                  <textarea
                    required
                    name="eventDescription"
                    id="eventDescription"
                    value={eventDescription}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  ></textarea>
                </div>
              </div>
              {/* Location */}
              <div className="w-1/2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  Location
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="streetAddress"
                    className="block text-gray-100 mb-2"
                  >
                    Street Address
                  </label>
                  <input
                    required
                    name="streetAddress"
                    id="streetAddress"
                    placeholder="123 Main St"
                    type="text"
                    value={streetAddress}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-100 mb-2">
                    City
                  </label>
                  <input
                    required
                    name="city"
                    id="city"
                    placeholder="Napa"
                    type="text"
                    value={city}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="state" className="block text-gray-100 mb-2">
                    State
                  </label>
                  <select
                    required
                    name="state"
                    id="state"
                    value={state}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  >
                    <option disabled value="">
                      Select a State
                    </option>
                    {states.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>{" "}
            <button
              onClick={(e) => handleNavigateForm(e, "next")}
              className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
            >
              Next
            </button>
          </>
        ) : (
          <>
            {/* Group 2 */}
            <div className="flex items-start justify-around gap-20">
              {/* Event Time */}
              <div className="w-1/2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  Event Time
                </h3>
                <div className="mb-4">
                  <label htmlFor="date" className="block text-gray-100 mb-2">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    id="date"
                    value={date}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="startTime"
                    className="block text-gray-100 mb-2"
                  >
                    Start Time
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="startTimeHour"
                      id="startTimeHour"
                      value={startTimeHour}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                    >
                      {timeOptions.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    :
                    <select
                      name="startTimeMinute"
                      id="startTimeMinute"
                      value={startTimeMinute}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                    >
                      {minuteOptions.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <select
                      name="startTimeTod"
                      id="startTimeTod"
                      value={startTimeTod}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                    >
                      {todOptions.map((tod) => (
                        <option key={tod} value={tod}>
                          {tod}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="endTime" className="block text-gray-100 mb-2">
                    End Time
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="endTimeHour"
                      id="endTimeHour"
                      value={endTimeHour}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                    >
                      {timeOptions.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                    :
                    <select
                      name="endTimeMinute"
                      id="endTimeMinute"
                      value={endTimeMinute}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                    >
                      {minuteOptions.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <select
                      name="endTimeTod"
                      id="endTimeTod"
                      value={endTimeTod}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                    >
                      {todOptions.map((tod) => (
                        <option key={tod} value={tod}>
                          {tod}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              {/* Contact */}
              <div className="w-1/2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  Contact
                </h3>
                <div className="mb-4">
                  <label
                    htmlFor="contactEmail"
                    className="block text-gray-100 mb-2"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="contactEmail"
                    id="contactEmail"
                    placeholder="youremail@example.com"
                    value={contactEmail}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="contactPhone"
                    className="block text-gray-100 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    name="contactPhone"
                    id="contactPhone"
                    placeholder="(555) 555-5555"
                    value={contactPhone}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
              </div>
            </div>
            {/* Ticketed */}
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Ticketed Event
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="ticketedEvent"
                  className="block text-gray-100 mb-2"
                >
                  Ticketed Event
                </label>
                <input
                  required
                  type="checkbox"
                  name="ticketedEvent"
                  id="ticketedEvent"
                  checked={ticketedEvent}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={(e) => handleNavigateForm(e, "prev")}
                className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
              >
                Create Event
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};
