import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// context
import useAuthContext from "../../context/auth/useAuthContext";
import useEventsContext from "../../context/events/useEventsContext";
// service
import {
  getEventDetails,
  postCreateEvent,
  putEditEvent,
} from "../../services/eventService";

const initialFormData = {
  // Basic Info
  photo: "",
  eventName: "",
  eventDescription: "",
  owner: null,

  // Location
  streetAddress: "",
  city: "",
  state: "",

  // Event Time
  date: "",
  startTimeHour: "1",
  startTimeMinute: "00",
  startTimeTod: "AM",
  endTimeHour: "1",
  endTimeMinute: "00",
  endTimeTod: "AM",

  // Contact
  email: "",
  phone: "",

  // Extra
  ticketedEvent: false,
  ticketsAvailable: 0,
  ticketPrice: 0,
};
const timeOptions = Array.from({ length: 12 }, (_, i) => i + 1);
const minuteOptions = Array.from({ length: 4 }, (_, i) => i * 15);
const todOptions = ["AM", "PM"];

export const EventForm = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  // context
  const { states } = useEventsContext();
  const { user } = useAuthContext();
  // hooks
  const navigate = useNavigate();
  const { eventId } = useParams();
  // destructured formData
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
    email,
    phone,
    ticketedEvent,
    ticketPrice,
    ticketsAvailable,
    owner,
  } = formData;

  const dataToSendToServer = new FormData();

  dataToSendToServer.append("photo", photo);
  dataToSendToServer.append("eventName", eventName);
  dataToSendToServer.append("eventDescription", eventDescription);
  dataToSendToServer.append("streetAddress", streetAddress);
  dataToSendToServer.append("city", city);
  dataToSendToServer.append("state", state);
  dataToSendToServer.append("date", date);
  dataToSendToServer.append("startTimeHour", startTimeHour);
  dataToSendToServer.append("startTimeMinute", startTimeMinute);
  dataToSendToServer.append("startTimeTod", startTimeTod);
  dataToSendToServer.append("endTimeHour", endTimeHour);
  dataToSendToServer.append("endTimeMinute", endTimeMinute);
  dataToSendToServer.append("endTimeTod", endTimeTod);
  dataToSendToServer.append("email", email);
  dataToSendToServer.append("phone", phone);
  dataToSendToServer.append("ticketedEvent", ticketedEvent);

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
    const { name, value, type, checked, files } = e.target;
    console.log(type);
    console.log(photo);
    setFormData({
      ...formData,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  ///////////////////////////
  //   Create or Edit Event Post
  ///////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if the event already exists and the current user is the owner | edit the event
      if (owner?.toString() === user._id?.toString()) {
        // Edit Event Post
        if (user._id) {
          await putEditEvent(formData, eventId, user._id);
          setFormData(initialFormData);
          navigate("/events/my-events");
        }
      } else {
        // Create New Event Post
        if (user._id) {
          await postCreateEvent(formData, user._id);
          setFormData(initialFormData);
          navigate("/events/my-events");
        }
      }
    } catch (err) {
      console.error(err);
      const message =
        owner?.toString() === user._id?.toString()
          ? "Unable to edit event posting"
          : "Unable to create new event posting";
      console.log(`Unable to complete service to ${message.toLowerCase()}`);
      setMessage(message);
    }
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      console.log(owner, " <-- owner");

      try {
        const data = await getEventDetails(eventId);
        // loads previous data if the owner is the current user and formats the date so the input can use the value
        if (data.owner?.toString() === user._id?.toString()) {
          setFormData({
            ...data,
            date: new Date(data.date).toISOString().split("T")[0],
          });
        }
      } catch (err) {
        console.error(err);
        console.log(`Could not fetch event details from service function`);
      }
    };
    fetchEventDetails();
  }, [message]);
  return (
    <>
      <h2 className="text-gray-100 text-4xl mb-12">{formStep}/2</h2>
      <form className="space-y-8 p-6 bg-gray-800 rounded-lg w-full md:w-1/2">
        {formStep === 1 ? (
          <>
            <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-20">
              {/* General Info */}
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  General Info
                </h3>
                <div className="mb-4">
                  <label htmlFor="photo" className="block text-gray-100 mb-2">
                    Photo
                  </label>
                  <input
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
                <div className="md:mb-4">
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
              <div className="w-full md:w-1/2">
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
            <div className="flex items-center gap-12">
              <button
                onClick={() => navigate("/events/my-events")}
                className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={(e) => handleNavigateForm(e, "next")}
                className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Group 2 */}
            <div className="flex flex-col md:flex-row items-center md:items-start justify-around gap-20">
              {/* Event Time */}
              <div className="w-full md:w-1/2">
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
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold text-gray-100 mb-4">
                  Contact
                </h3>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-100 mb-2">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="youremail@example.com"
                    value={email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-100 mb-2">
                    Phone
                  </label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="(555) 555-5555"
                    value={phone}
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
              {ticketedEvent && (
                <div className="flex items-center gap-12">
                  <div className="flex flex-col items-center justify-start">
                    <label className="block text-gray-100 mb-2" htmlFor="">
                      Ticket Price
                    </label>
                    <input
                      value={ticketPrice}
                      onChange={handleChange}
                      className="p-2 w-20 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                      type="number"
                      name="ticketPrice"
                      id="ticketPrice"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <label className="block text-gray-100 mb-2" htmlFor="">
                      Tickets Available
                    </label>
                    <input
                      value={ticketsAvailable}
                      onChange={handleChange}
                      className="p-2 border w-20 border-gray-300 text-gray-800 rounded-md focus:outline-none focus:border-[#e8d1ae]"
                      type="number"
                      name="ticketsAvailable"
                      id="ticketsAvailable"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={(e) => handleNavigateForm(e, "prev")}
                className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-stone-500 px-4 py-2 rounded-md text-gray-100 focus:outline-none hover:bg-stone-600 transition-colors duration-200 cursor-pointer"
              >
                {owner?.toString() === user._id?.toString()
                  ? "Update Event"
                  : "Create Event"}
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};
